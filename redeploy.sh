#!/usr/bin/env bash
set -Eeuo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
APP_NAME="${APP_NAME:-pwebsite}"
BRANCH="${BRANCH:-main}"
PORT="${PORT:-3000}"
LOG_DIR="${LOG_DIR:-$ROOT_DIR/.runtime}"
PID_FILE="${PID_FILE:-$LOG_DIR/${APP_NAME}.pid}"
LOG_FILE="${LOG_FILE:-$LOG_DIR/${APP_NAME}.log}"
SKIP_PULL="${SKIP_PULL:-0}"

log() {
  printf '\n==> %s\n' "$*"
}

has_command() {
  command -v "$1" >/dev/null 2>&1
}

kill_pid_if_running() {
  local pid="$1"

  if [[ -z "$pid" ]]; then
    return
  fi

  if kill -0 "$pid" >/dev/null 2>&1; then
    kill "$pid" >/dev/null 2>&1 || true

    for _ in {1..20}; do
      if ! kill -0 "$pid" >/dev/null 2>&1; then
        break
      fi
      sleep 1
    done

    if kill -0 "$pid" >/dev/null 2>&1; then
      kill -9 "$pid" >/dev/null 2>&1 || true
    fi
  fi
}

stop_existing_process() {
  log "Stopping previous process"

  if has_command pm2 && pm2 describe "$APP_NAME" >/dev/null 2>&1; then
    pm2 delete "$APP_NAME" >/dev/null 2>&1 || true
  fi

  if [[ -f "$PID_FILE" ]]; then
    kill_pid_if_running "$(cat "$PID_FILE" 2>/dev/null || true)"
    rm -f "$PID_FILE"
  fi

  if has_command lsof; then
    local port_pid
    port_pid="$(lsof -ti tcp:"$PORT" -sTCP:LISTEN 2>/dev/null | head -n 1 || true)"
    kill_pid_if_running "$port_pid"
  elif has_command fuser; then
    fuser -k "${PORT}/tcp" >/dev/null 2>&1 || true
  fi
}

pull_latest_code() {
  [[ "$SKIP_PULL" == "1" ]] && return

  if [[ -d "$ROOT_DIR/.git" ]]; then
    log "Pulling latest code"
    git -C "$ROOT_DIR" fetch --all --prune
    git -C "$ROOT_DIR" checkout "$BRANCH"
    git -C "$ROOT_DIR" pull --ff-only origin "$BRANCH"
  fi
}

install_dependencies() {
  log "Installing dependencies"
  cd "$ROOT_DIR"

  if [[ -f package-lock.json ]]; then
    npm ci
  else
    npm install
  fi
}

build_app() {
  log "Building app"
  cd "$ROOT_DIR"
  npm run build
}

start_with_pm2() {
  if ! has_command pm2; then
    return 1
  fi

  log "Starting app with PM2"
  cd "$ROOT_DIR"
  pm2 start npm --name "$APP_NAME" -- run start -- --port "$PORT"
  pm2 save >/dev/null 2>&1 || true
}

start_with_nohup() {
  log "Starting app with nohup"
  mkdir -p "$LOG_DIR"
  cd "$ROOT_DIR"
  nohup npm run start -- --port "$PORT" >> "$LOG_FILE" 2>&1 &
  echo $! > "$PID_FILE"
}

print_summary() {
  printf '\nDone.\n'
  printf 'App: %s\n' "$APP_NAME"
  printf 'Port: %s\n' "$PORT"

  if has_command pm2 && pm2 describe "$APP_NAME" >/dev/null 2>&1; then
    printf 'Mode: pm2\n'
    printf 'Check: pm2 status\n'
    printf 'Logs: pm2 logs %s\n' "$APP_NAME"
  else
    printf 'Mode: nohup\n'
    printf 'PID file: %s\n' "$PID_FILE"
    printf 'Log file: %s\n' "$LOG_FILE"
    printf 'Logs: tail -f %s\n' "$LOG_FILE"
  fi
}

pull_latest_code
install_dependencies
build_app
stop_existing_process

if ! start_with_pm2; then
  start_with_nohup
fi

print_summary
