// Simple script to ensure 404.html exists for GitHub Pages SPA routing
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const browserDir = path.join(root, 'dist', 'portfolio', 'browser');
const indexPath = path.join(browserDir, 'index.html');
const notFoundPath = path.join(browserDir, '404.html');

function ensure404() {
  if (!fs.existsSync(indexPath)) {
    console.error(`No se encontró index.html en: ${indexPath}`);
    process.exit(1);
  }
  try {
    fs.copyFileSync(indexPath, notFoundPath);
    console.log(`Copiado 404.html desde index.html en: ${browserDir}`);
  } catch (err) {
    console.error('Error copiando 404.html:', err);
    process.exit(1);
  }
}

ensure404();
