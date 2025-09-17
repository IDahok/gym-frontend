const fs = require('fs');
const path = require('path');

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src)) {
    const s = path.join(src, entry);
    const d = path.join(dest, entry);
    const stat = fs.statSync(s);
    if (stat.isDirectory()) copyRecursive(s, d);
    else fs.copyFileSync(s, d);
  }
}

const repoRoot = path.resolve(__dirname, '../../..');
const srcDir = path.join(repoRoot, 'materio-bootstrap-html-admin-template-free', 'dist');
const destDir = path.resolve(__dirname, '../public/materio');

copyRecursive(srcDir, destDir);
console.log('Materio assets copiados para', destDir);


