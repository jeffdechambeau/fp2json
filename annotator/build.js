const fs = require('fs');
const path = require('path');

// Directory where your JS files are located
const jsDirectory = './src';

// Path to your HTML template
const htmlTemplatePath = './src/template.html';
const htmlOutputPath = './dist/index.html';

// Placeholder in your HTML where scripts will be injected
const injectionPlaceholder = '<!-- INJECT_SCRIPTS -->';

// Read the HTML template
let htmlContent = fs.readFileSync(htmlTemplatePath, 'utf8');

// Read all JS files from the directory and create script tags
fs.readdir(jsDirectory, (err, files) => {
  if (err) {
    console.error('Error reading JS directory:', err);
    return;
  }

  const scriptTags = `<script>${files
    .filter(file => file.endsWith('.js'))
    .map(file => fs.readFileSync(path.join(jsDirectory, file), 'utf8'))
    .join('\n')}</script>`;
  console.log({ scriptTags });

  // Replace the placeholder with the actual script tags
  htmlContent = htmlContent.replace(injectionPlaceholder, scriptTags);

  // Write the updated HTML content to the output file
  fs.writeFileSync(htmlOutputPath, htmlContent, 'utf8');
  console.log('Scripts injected and HTML file created:', htmlOutputPath);
});
