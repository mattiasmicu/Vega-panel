# Vega Panel Theme for Pterodactyl

A modern, full-stack theme for the [Pterodactyl](https://pterodactyl.io) game server control panel.  
This README will guide you through installing **Pterodactyl** from scratch and then applying the Vega Panel theme.

---

## 1. Install Pterodactyl Panel

#### Requirements
- Ubuntu 22.04 (recommended)
- Root or sudo access
- MariaDB/MySQL, Nginx, PHP 8.1+, Composer

### Step-by-step Pterodactyl Installation

#### 1. Update and Install Dependencies

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx mysql-server php8.1 php8.1-fpm php8.1-cli php8.1-gd php8.1-mysql \
php8.1-pdo php8.1-mbstring php8.1-tokenizer php8.1-bcmath php8.1-xml php8.1-curl \
php8.1-zip php8.1-redis php8.1-gmp tar unzip git redis-server composer
```

#### 2. Create Panel Directory

```bash
sudo mkdir -p /var/www/pterodactyl
sudo chown -R $USER:$USER /var/www/pterodactyl
cd /var/www/pterodactyl
```

#### 3. Download Pterodactyl

```bash
curl -Lo panel.tar.gz https://github.com/pterodactyl/panel/releases/latest/download/panel.tar.gz
tar -xzvf panel.tar.gz
rm panel.tar.gz
```

#### 4. Install Composer Dependencies

```bash
composer install --no-dev --optimize-autoloader
```

#### 5. Set File Permissions

```bash
chmod -R 755 storage/* bootstrap/cache/
```

#### 6. Configure Environment

```bash
cp .env.example .env
php artisan key:generate --force
```

#### 7. Set Up Database

- Create a database and user in MySQL/MariaDB:

```sql
CREATE DATABASE panel;
CREATE USER 'pterodactyl'@'127.0.0.1' IDENTIFIED BY 'yourpassword';
GRANT ALL PRIVILEGES ON panel.* TO 'pterodactyl'@'127.0.0.1';
FLUSH PRIVILEGES;
```

- Edit your `.env` with your new DB credentials.

#### 8. Run Installer

```bash
php artisan p:environment:setup
php artisan p:environment:database
php artisan migrate --seed --force
```

#### 9. Set Up Webserver and SSL

- Follow the [official Pterodactyl docs](https://pterodactyl.io/panel/1.0/webserver.html) to set up Nginx and SSL.

#### 10. Create First Admin User

```bash
php artisan p:user:make
```

---

## 2. Install Vega Panel Theme

Now that you have Pterodactyl installed and working:

### 1. Make Sure the Themes Directory Exists

```bash
cd /var/www/pterodactyl
mkdir -p themes
```

### 2. Download the Vega Panel Theme

```bash
cd /var/www/pterodactyl/themes
git clone https://github.com/mattiasmicu/Vega-panel.git
```

### 3. Create Theme Subdirectories (if needed)

```bash
mkdir -p Vega-panel/views
mkdir -p Vega-panel/public
mkdir -p Vega-panel/resources/scripts/components/layout
mkdir -p Vega-panel/resources/scripts/pages/server
mkdir -p Vega-panel/resources/scripts/routes
```

### 4. (Optional) Install Theme Dependencies

If you plan to rebuild theme assets:

```bash
cd Vega-panel
npm install
npm run build
```

### 5. Apply the Theme

#### Copy Blade Views

```bash
cp -r Vega-panel/views/* ../../resources/views/
```

#### Copy Public Assets

```bash
cp -r Vega-panel/public/* ../../public/
```

---

## 3. Final Steps

#### Clear Laravel Cache

```bash
php artisan view:clear
php artisan cache:clear
```

#### Visit Your Panel

Go to your panel URL in your browser.  
If you do not see the theme, clear your browser cache and refresh.

---

## 4. Troubleshooting

- Always back up your panel before applying any theme.
- If your panel breaks, restore from your backup.
- For advanced troubleshooting, check `storage/logs/laravel.log`.

---

## Credits

- [Pterodactyl Panel](https://pterodactyl.io)
- Vega Panel Theme by [mattiasmicu](https://github.com/mattiasmicu)

---

## License

MIT

---
**For more details, always refer to the [official Pterodactyl installation docs](https://pterodactyl.io/panel/1.0/getting_started.html).**
