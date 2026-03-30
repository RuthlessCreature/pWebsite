# Deployment Guide

This project can run on Vercel or on a self-hosted Linux server.

If you want to pull the repo onto your own server and run it directly, use the Ubuntu flow below.

## One-Command Deploy Script

This repository now includes:

- `deploy.sh`
- `redeploy.sh`

It supports two deployment modes:

1. Run inside the repo directory already on the server
2. Clone or pull the repo into a target directory and deploy from there

### Example A: Repo already exists on the server

```bash
cd /var/www/pWebsite
chmod +x deploy.sh
./deploy.sh
```

### Example B: Pull the repo to a target directory and deploy

```bash
chmod +x deploy.sh
APP_DIR=/var/www/pWebsite \
REPO_URL=your-repo-url.git \
BRANCH=main \
./deploy.sh
```

### Example C: Deploy app + Nginx + HTTPS

```bash
chmod +x deploy.sh
APP_DIR=/var/www/pWebsite \
REPO_URL=your-repo-url.git \
BRANCH=main \
DOMAIN=staychina.org \
WWW_DOMAIN=www.staychina.org \
LETSENCRYPT_EMAIL=you@example.com \
SETUP_NGINX=1 \
SETUP_SSL=1 \
./deploy.sh
```

### Environment Variables Supported by `deploy.sh`

- `APP_NAME` default: `pwebsite`
- `APP_DIR` default: current repo directory
- `REPO_URL` required only when the target directory does not already contain the project
- `BRANCH` default: `main`
- `PORT` default: `3000`
- `DOMAIN` required for Nginx or SSL setup
- `WWW_DOMAIN` optional
- `LETSENCRYPT_EMAIL` optional but recommended when enabling SSL
- `SETUP_NGINX=1` to write Nginx config
- `SETUP_SSL=1` to request HTTPS via Certbot
- `SKIP_GIT_PULL=1` to skip `git fetch/pull` when deploying from an existing git checkout
- `NODE_MAJOR` default: `20`

## In-Place Pull and Restart Script

If your normal server workflow is:

1. SSH into the server
2. `cd` into the repo
3. pull latest code
4. stop the old process
5. start the latest version

then use:

- `redeploy.sh`

### Simplest usage

```bash
cd /var/www/pWebsite
chmod +x redeploy.sh
./redeploy.sh
```

This script will:

1. pull latest code
2. install dependencies
3. run a fresh build
4. stop the previous process
5. start the latest version again

### If you already pulled manually

```bash
cd /var/www/pWebsite
SKIP_PULL=1 ./redeploy.sh
```

### Change branch or port

```bash
cd /var/www/pWebsite
BRANCH=main PORT=3000 ./redeploy.sh
```

### Startup mode

- If `pm2` exists, `redeploy.sh` starts the app with `pm2`
- If `pm2` does not exist, it falls back to `nohup`

### Log files without PM2

- PID file: `.runtime/pwebsite.pid`
- Log file: `.runtime/pwebsite.log`

### Recommended update flow

```bash
ssh your-server
cd /var/www/pWebsite
./redeploy.sh
```

## Before You Deploy

1. Confirm the production domain in `lib/company.ts`
2. Make sure DNS already points your domain to the server
3. Open ports `80` and `443` in your firewall or cloud security group
4. You do **not** need Google/Bing/Baidu verification tokens before launch

If the final domain is not `https://www.staychina.org`, update `website` in `lib/company.ts` first, then deploy. Canonical URLs, sitemap links, and robots host values all use that field.

## Option A: Vercel

1. Push repository to your Git provider
2. Import the repo in Vercel
3. Framework preset: `Next.js`
4. Build command: `npm run build`
5. Output: default Next.js output
6. Deploy

## Option B: Ubuntu Server + PM2 + Nginx

This is the recommended self-hosted flow.

### 1. Install System Packages

```bash
sudo apt update
sudo apt install -y git curl build-essential nginx
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

Verify:

```bash
node -v
npm -v
pm2 -v
```

### 2. Pull the Repository

```bash
sudo mkdir -p /var/www
cd /var/www
sudo git clone your-repo-url.git pWebsite
sudo chown -R $USER:$USER /var/www/pWebsite
cd /var/www/pWebsite
```

If the repository is already on the server:

```bash
cd /var/www/pWebsite
git pull origin main
```

If your branch is not `main`, replace it with the real branch name.

### 3. Install Dependencies and Build

```bash
cd /var/www/pWebsite
npm install
npm run build
```

### 4. Start the App with PM2

```bash
cd /var/www/pWebsite
pm2 start npm --name pwebsite -- run start -- --port 3000
pm2 save
pm2 startup
```

After `pm2 startup`, the server will print one extra command. Copy and run that command once so PM2 can auto-start after reboot.

Useful PM2 commands:

```bash
pm2 status
pm2 logs pwebsite
pm2 restart pwebsite
pm2 stop pwebsite
```

### 5. Configure Nginx Reverse Proxy

Create the site config:

```bash
sudo tee /etc/nginx/sites-available/pwebsite > /dev/null <<'EOF'
server {
    listen 80;
    server_name staychina.org www.staychina.org;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
EOF
```

Enable it:

```bash
sudo ln -sf /etc/nginx/sites-available/pwebsite /etc/nginx/sites-enabled/pwebsite
sudo nginx -t
sudo systemctl reload nginx
```

If you do not use `staychina.org`, replace both domain values with your real domain.

### 6. Enable HTTPS with Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d staychina.org -d www.staychina.org
```

Then test:

```bash
sudo systemctl status nginx
curl -I https://staychina.org
```

### 7. Check the Site After Launch

Open these URLs:

- `https://your-domain/`
- `https://your-domain/en`
- `https://your-domain/robots.txt`
- `https://your-domain/sitemap.xml`

Also confirm:

- the site loads normally
- language-prefixed pages work
- `robots.txt` is public
- `sitemap.xml` is public
- no redirect loop exists

### 8. Future Update Flow

Each time you update the website:

```bash
cd /var/www/pWebsite
git pull origin main
npm install
npm run build
pm2 restart pwebsite
```

If dependencies did not change, `npm install` is still safe to run.

### 9. Optional Environment Variables

You can launch the site without search engine verification tokens.

These are optional and can be added later:

- `GOOGLE_SITE_VERIFICATION`
- `BING_SITE_VERIFICATION`
- `BAIDU_SITE_VERIFICATION`
- `YANDEX_SITE_VERIFICATION`
- `NAVER_SITE_VERIFICATION`
- `YAHOO_SITE_VERIFICATION`

Reference template:

- `.env.example`

If you add env vars later, rebuild and restart:

```bash
npm run build
pm2 restart pwebsite
```

## Quick Start Summary

If you only want the shortest path:

```bash
sudo apt update
sudo apt install -y git curl build-essential nginx
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2

sudo mkdir -p /var/www
cd /var/www
sudo git clone your-repo-url.git pWebsite
sudo chown -R $USER:$USER /var/www/pWebsite

cd /var/www/pWebsite
npm install
npm run build
pm2 start npm --name pwebsite -- run start -- --port 3000
pm2 save
```

Then put Nginx in front of `127.0.0.1:3000`.

If the app is already on the server and you only want to update it:

```bash
cd /var/www/pWebsite
./redeploy.sh
```

## Pre-Launch Checklist

- Verify contact details in `lib/company.ts`
- Confirm the production domain in `lib/company.ts`
- Check mobile and desktop layouts
- Verify metadata on key routes
- Confirm `robots.txt` and `sitemap.xml` are accessible
- Submit `/sitemap.xml` after launch
