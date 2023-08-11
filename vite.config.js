import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // alias: {
    //   util: 'rollup-plugin-node-polyfills/polyfills/util',
    //   path: 'rollup-plugin-node-polyfills/polyfills/path',
    //   fs: 'rollup-plugin-node-polyfills/polyfills/empty',
    //   url: 'rollup-plugin-node-polyfills/polyfills/empty',
    //   'source-map-js': 'rollup-plugin-node-polyfills/polyfills/empty',
    //   process: 'rollup-plugin-node-polyfills/polyfills/empty',
    // },
  },
});
