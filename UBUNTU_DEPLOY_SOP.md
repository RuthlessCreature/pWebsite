# Ubuntu Deployment SOP (staychina.org, root)

This SOP deploys the Next.js site on a single Ubuntu server with Nginx + PM2.

## 0) Preconditions

- Server OS: Ubuntu 22.04 or 24.04
- You are logged in as `root`
- DNS already points to this server:
  - `staychina.org` -> server public IP
  - `www.staychina.org` -> server public IP
- You have the git repository URL

## 1) One-time server bootstrap

```bash
apt update && apt upgrade -y
apt install -y curl git nginx certbot python3-certbot-nginx

curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

npm install -g pm2
node -v
npm -v
```

## 2) Deploy application code

```bash
mkdir -p /var/www
cd /var/www

git clone <REPO_URL> pwebsite
cd /var/www/pwebsite

npm ci
cp .env.example .env.local
```

Edit env file if you use Google Search Console verification:

```bash
nano /var/www/pwebsite/.env.local
```

Example values:

```env
GOOGLE_SITE_VERIFICATION=your_token_here
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_token_here
```

## 3) Set production domain in project

Make sure canonical site URL is `https://staychina.org` in `lib/company.ts`.

```bash
sed -i 's|https://www.staychina.org|https://staychina.org|g' /var/www/pwebsite/lib/company.ts
```

If your file already has the correct URL, this command is harmless.

## 4) Build and run with PM2

```bash
cd /var/www/pwebsite
npm run build
PORT=80 pm2 start npm --name pwebsite -- start
pm2 save
pm2 startup systemd -u root --hp /root
```

Verify process:

```bash
pm2 status
pm2 logs pwebsite --lines 100
```

## 5) Configure Nginx reverse proxy

Create site config:

```bash
cat > /etc/nginx/sites-available/staychina.org <<'NGINX'
server {
    listen 80;
    listen [::]:80;
    server_name www.staychina.org;
    return 301 http://staychina.org$request_uri;
}

server {
    listen 80;
    listen [::]:80;
    server_name staychina.org;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
NGINX
```

Enable config and reload Nginx:

```bash
rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/staychina.org /etc/nginx/sites-enabled/staychina.org
nginx -t
systemctl reload nginx
```

## 6) Enable HTTPS with Certbot

```bash
certbot --nginx -d staychina.org -d www.staychina.org
```

Choose redirect to HTTPS when prompted.

Check auto-renewal:

```bash
systemctl status certbot.timer
certbot renew --dry-run
```

## 7) Post-deploy checks

```bash
curl -I http://127.0.0.1:3000
curl -I https://staychina.org
pm2 status
```

Open in browser:

- `https://staychina.org`
- `https://www.staychina.org` (should redirect)
- `https://staychina.org/sitemap.xml`

## 8) Routine update SOP (new code release)

```bash
cd /var/www/pwebsite
git pull origin main
npm ci
npm run build
pm2 restart pwebsite
pm2 save
```

If your default branch is not `main`, replace it with your branch name.
