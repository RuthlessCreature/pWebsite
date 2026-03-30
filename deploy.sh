#!/usr/bin/env bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
DEFAULT_APP_DIR="$SCRIPT_DIR"

APP_NAME="${APP_NAME:-pwebsite}"
APP_DIR="${APP_DIR:-$DEFAULT_APP_DIR}"
BRANCH="${BRANCH:-main}"
PORT="${PORT:-3000}"
REPO_URL="${REPO_URL:-}"
DOMAIN="${DOMAIN:-}"
WWW_DOMAIN="${WWW_DOMAIN:-}"
LETSENCRYPT_EMAIL="${LETSENCRYPT_EMAIL:-}"
SETUP_NGINX="${SETUP_NGINX:-0}"
SETUP_SSL="${SETUP_SSL:-0}"
SKIP_GIT_PULL="${SKIP_GIT_PULL:-0}"
NODE_MAJOR="${NODE_MAJOR:-20}"

log() {
  printf '\n==> %s\n' "$*"
}

die() {
  printf '\nERROR: %s\n' "$*" >&2
  exit 1
}

run_root() {
  if [[ "$(id -u)" -eq 0 ]]; then
    "$@"
  else
    sudo "$@"
  fi
}

command_exists() {
  command -v "$1" >/dev/null 2>&1
}

require_domain_when_needed() {
  if [[ "$SETUP_SSL" == "1" ]]; then
    SETUP_NGINX=1
  fi

  if [[ "$SETUP_NGINX" == "1" && -z "$DOMAIN" ]]; then
    die "DOMAIN is required when SETUP_NGINX=1 or SETUP_SSL=1"
  fi
}

install_system_packages() {
  local packages=("git" "curl" "ca-certificates" "build-essential")

  if [[ "$SETUP_NGINX" == "1" ]]; then
    packages+=("nginx")
  fi

  if [[ "$SETUP_SSL" == "1" ]]; then
    packages+=("certbot" "python3-certbot-nginx")
  fi

  log "Installing Ubuntu packages"
  run_root apt update
  run_root apt install -y "${packages[@]}"
}

install_node() {
  local should_install_node="1"

  if command_exists node; then
    local current_major
    current_major="$(node -p 'process.versions.node.split(".")[0]')"

    if [[ "$current_major" == "$NODE_MAJOR" ]]; then
      should_install_node="0"
    fi
  fi

  if [[ "$should_install_node" == "1" ]]; then
    log "Installing Node.js ${NODE_MAJOR}.x"
    curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | run_root -E bash -
    run_root apt install -y nodejs
  fi
}

install_pm2() {
  if ! command_exists pm2; then
    log "Installing PM2"
    run_root npm install -g pm2
  fi
}

prepare_repository() {
  log "Preparing application directory"
  local owner_user owner_group
  owner_user="${SUDO_USER:-$(id -un)}"
  owner_group="$(id -gn "$owner_user")"

  if [[ -f "$APP_DIR/package.json" ]]; then
    cd "$APP_DIR"

    if [[ -d .git && "$SKIP_GIT_PULL" != "1" ]]; then
      log "Pulling latest code from git"
      git fetch --all --prune
      git checkout "$BRANCH"
      git pull --ff-only origin "$BRANCH"
    else
      log "Using existing working tree at $APP_DIR"
    fi

    return
  fi

  [[ -n "$REPO_URL" ]] || die "REPO_URL is required when APP_DIR does not already contain the project"

  if [[ ! -d "$APP_DIR" ]]; then
    run_root mkdir -p "$APP_DIR"
  fi

  run_root chown "$owner_user":"$owner_group" "$APP_DIR"

  if [[ -n "$(find "$APP_DIR" -mindepth 1 -maxdepth 1 2>/dev/null | head -n 1)" ]]; then
    die "APP_DIR exists but is not a valid project directory: $APP_DIR"
  fi

  log "Cloning repository into $APP_DIR"
  git clone --branch "$BRANCH" "$REPO_URL" "$APP_DIR"
  cd "$APP_DIR"
}

install_dependencies_and_build() {
  cd "$APP_DIR"

  log "Installing Node dependencies"
  if [[ -f package-lock.json ]]; then
    npm ci
  else
    npm install
  fi

  log "Building Next.js app"
  npm run build
}

configure_pm2() {
  cd "$APP_DIR"

  log "Starting application with PM2"
  if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
    pm2 restart "$APP_NAME" --update-env
  else
    pm2 start npm --name "$APP_NAME" -- run start -- --port "$PORT"
  fi

  pm2 save

  local owner_user owner_home
  owner_user="${SUDO_USER:-$(id -un)}"
  owner_home="$(getent passwd "$owner_user" | cut -d: -f6)"
  owner_home="${owner_home:-$HOME}"

  log "Configuring PM2 startup"
  run_root env "PATH=$PATH" pm2 startup systemd -u "$owner_user" --hp "$owner_home" >/dev/null || true
}

configure_nginx() {
  [[ "$SETUP_NGINX" == "1" ]] || return

  local nginx_domains="$DOMAIN"
  if [[ -n "$WWW_DOMAIN" ]]; then
    nginx_domains="$nginx_domains $WWW_DOMAIN"
  fi

  log "Writing Nginx site config"
  run_root tee "/etc/nginx/sites-available/${APP_NAME}" > /dev/null <<EOF
server {
    listen 80;
    server_name ${nginx_domains};

    location / {
        proxy_pass http://127.0.0.1:${PORT};
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
EOF

  run_root ln -sf "/etc/nginx/sites-available/${APP_NAME}" "/etc/nginx/sites-enabled/${APP_NAME}"
  run_root nginx -t
  run_root systemctl reload nginx
}

configure_ssl() {
  [[ "$SETUP_SSL" == "1" ]] || return

  local certbot_args=("--nginx" "-d" "$DOMAIN")
  if [[ -n "$WWW_DOMAIN" ]]; then
    certbot_args+=("-d" "$WWW_DOMAIN")
  fi

  if [[ -n "$LETSENCRYPT_EMAIL" ]]; then
    certbot_args=("--non-interactive" "--agree-tos" "-m" "$LETSENCRYPT_EMAIL" "${certbot_args[@]}")
  fi

  log "Requesting HTTPS certificate"
  run_root certbot "${certbot_args[@]}"
}

print_summary() {
  printf '\nDone.\n'
  printf '\nApp directory: %s\n' "$APP_DIR"
  printf 'PM2 process: %s\n' "$APP_NAME"
  printf 'App port: %s\n' "$PORT"

  if [[ -n "$DOMAIN" ]]; then
    printf 'Domain: %s\n' "$DOMAIN"
  fi

  if [[ -n "$WWW_DOMAIN" ]]; then
    printf 'WWW domain: %s\n' "$WWW_DOMAIN"
  fi

  printf '\nUseful commands:\n'
  printf '  pm2 status\n'
  printf '  pm2 logs %s\n' "$APP_NAME"
  printf '  pm2 restart %s\n' "$APP_NAME"
}

require_domain_when_needed
install_system_packages
install_node
install_pm2
prepare_repository
install_dependencies_and_build
configure_pm2
configure_nginx
configure_ssl
print_summary
