import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    // Output the build files into the plugin's assets directory
    outDir: 'assets',
    // Clear the assets directory before building
    emptyOutDir: false,
    // Generate manifest.json so PHP can read the files with hashes
    manifest: true,
    rollupOptions: {
      // Define entry points
      input: {
        admin: resolve(__dirname, 'src/App.jsx'),
        widget: resolve(__dirname, 'src/widget/FloatingButton.jsx')
      },
      output: {
        entryFileNames: `js/[name]-[hash].js`,
        chunkFileNames: `js/chunks/[name]-[hash].js`,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return `css/[name]-[hash][extname]`;
          }
          return `media/[name]-[hash][extname]`;
        }
      }
    }
  }
});
