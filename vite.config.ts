import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      // Copies src/assets into dist/ so root-relative URLs like
      // "/src/assets/images/..." (e.g. generate_image output) still resolve
      // in production builds. Do not remove.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }

          const pdfjsBase = path.resolve(__dirname, 'node_modules/pdfjs-dist');
          for (const folder of ['wasm', 'cmaps', 'standard_fonts']) {
            const srcFolder = path.join(pdfjsBase, folder);
            const destFolder = path.join(distDir, 'pdfjs', folder);
            if (fs.existsSync(distDir) && fs.existsSync(srcFolder)) {
              fs.cpSync(srcFolder, destFolder, {recursive: true, force: true});
            }
          }
        },
      },
      {
        name: 'serve-pdfjs-assets-dev',
        apply: 'serve',
        configureServer(server) {
          const pdfjsBase = path.resolve(__dirname, 'node_modules/pdfjs-dist');
          server.middlewares.use('/pdfjs', (req, res, next) => {
            const cleanUrl = (req.url || '').split('?')[0].replace(/^\/+/, '');
            if (!cleanUrl) return next();
            const filePath = path.resolve(pdfjsBase, cleanUrl);
            if (!filePath.startsWith(pdfjsBase) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
              return next();
            }
            const ext = path.extname(filePath).toLowerCase();
            const mimeTypes: Record<string, string> = {
              '.wasm': 'application/wasm',
              '.js': 'application/javascript; charset=utf-8',
              '.mjs': 'application/javascript; charset=utf-8',
              '.bcmap': 'application/octet-stream',
              '.pfb': 'application/octet-stream',
              '.ttf': 'font/ttf',
              '.otf': 'font/otf',
            };
            res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
            fs.createReadStream(filePath).pipe(res);
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
