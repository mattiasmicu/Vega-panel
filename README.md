# Vega Theme for Pterodactyl

A modern, customizable theme for Pterodactyl Panel with a clean dark interface and enhanced user experience.

![Vega Theme Preview](preview.png)

## Features

- 🎨 Modern dark theme with customizable branding
- 📱 Fully responsive design
- 📊 Enhanced server statistics and graphs
- ⚡ Quick action shortcuts
- 🎮 Improved game server management
- 🔒 Beautiful authentication pages

## Requirements

- Pterodactyl Panel 1.x
- PHP 8.0+
- Node.js 16+
- Composer

## Installation

1. Navigate to your Pterodactyl installation:
```bash
cd /var/www/pterodactyl
```

2. Clone the theme repository:
```bash
git clone https://github.com/mattiasmicu/Vega-panel.git resources/themes/vega
```

3. Install dependencies:
```bash
npm install --prefix resources/themes/vega
composer update
```

4. Build the theme:
```bash
npm run build --prefix resources/themes/vega
```

5. Clear the panel cache:
```bash
php artisan view:clear
php artisan cache:clear
```

6. Set theme in panel settings or .env:
```
APP_THEME=vega
```

## Customization

1. Copy `.env.example` to `.env` in the theme directory:
```bash
cp resources/themes/vega/.env.example resources/themes/vega/.env
```

2. Edit the `.env` file to customize:
- Panel name
- Logo URL
- Primary color
- Secondary color
- Accent color

## Development

1. Install development dependencies:
```bash
npm install --prefix resources/themes/vega
```

2. Start development server:
```bash
npm run dev --prefix resources/themes/vega
```

3. Build for production:
```bash
npm run build --prefix resources/themes/vega
```

## Support

If you encounter any issues or need help, please create an issue on GitHub.

## License

This theme is open-source software licensed under the MIT license.
