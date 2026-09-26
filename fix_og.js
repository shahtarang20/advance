const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx')) results.push(file);
    }
  });
  return results;
}

const files = walk('src/app');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Fix strings like "/api/og?..."
  if (content.includes('"/api/og?')) {
    content = content.replace(/"\/api\/og\?([^"]+)"/g, (match, p1) => {
      let ext = p1.includes('ext=.png') ? '' : '&ext=.png';
      return `\`\${SITE_URL}/api/og?${p1}${ext}\``;
    });
    changed = true;
  }
  
  // Fix template literals like `/api/og?...`
  if (content.includes('`/api/og?')) {
    content = content.replace(/`\/api\/og\?([^`]+)`/g, (match, p1) => {
      let ext = p1.includes('ext=.png') ? '' : '&ext=.png';
      return `\`\${SITE_URL}/api/og?${p1}${ext}\``;
    });
    changed = true;
  }

  if (changed) {
    if (!content.includes('import { SITE_URL }')) {
      content = 'import { SITE_URL } from "@/lib/site";\n' + content;
    }
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed', file);
  }
});
