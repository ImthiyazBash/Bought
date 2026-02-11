const fs = require('fs');
const path = require('path');

// Custom 404.html for GitHub Pages that handles trailing slash redirects
const custom404 = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Loading...</title>
    <script>
      // GitHub Pages 404 handler for Next.js with trailingSlash
      // Ensures all URLs have trailing slashes as configured in next.config.ts

      (function() {
        var path = window.location.pathname;

        // If the path doesn't end with a slash and doesn't have a file extension, add trailing slash
        if (!path.endsWith('/') && !path.match(/\\.[a-z0-9]+$/i)) {
          window.location.replace(path + '/' + window.location.search + window.location.hash);
        } else {
          // If still getting 404 after redirect, show error message
          setTimeout(function() {
            document.querySelector('.loader p').textContent = 'Page not found (404)';
            document.querySelector('.spinner').style.display = 'none';
          }, 1000);
        }
      })();
    </script>
    <style>
      body {
        font-family: system-ui, -apple-system, sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        margin: 0;
        background: #f9fafb;
      }
      .loader {
        text-align: center;
      }
      .spinner {
        border: 3px solid #e5e7eb;
        border-top: 3px solid #3b82f6;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
  </head>
  <body>
    <div class="loader">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>
  </body>
</html>`;

const outDir = path.join(__dirname, '..', 'out');
const custom404Path = path.join(outDir, '404.html');

// Write the custom 404.html
fs.writeFileSync(custom404Path, custom404, 'utf8');
console.log('✓ Custom 404.html copied to out directory');
