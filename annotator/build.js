const fs = require('fs');
const path = require('path');

const jsDirectory = path.resolve('./src');
const htmlTemplatePath = path.resolve('./src/template.html');
const distDirectory = path.resolve('./dist');
const htmlOutputPath = path.join(distDirectory, 'index.html');

const injectionPlaceholder = '<!-- INJECT_SCRIPTS -->';

let htmlContent = fs.readFileSync(htmlTemplatePath, 'utf8');

if (!fs.existsSync(distDirectory)) {
  fs.mkdirSync(distDirectory);
}

fs.readdir(jsDirectory, (err, files) => {
  if (err) {
    console.error('Error reading JS directory:', err);
    return;
  }

  const scriptTags = `<script>${files
    .filter(file => file.endsWith('.js'))
    .map(file => fs.readFileSync(path.join(jsDirectory, file), 'utf8'))
    .join('\n')}</script>`;

  htmlContent = htmlContent.replace(injectionPlaceholder, scriptTags);

  fs.writeFileSync(htmlOutputPath, htmlContent, 'utf8');
  console.log('Scripts injected and HTML file created:', htmlOutputPath);
});
