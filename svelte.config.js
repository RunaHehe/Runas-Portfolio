import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  onwarn: (warning, handler) => {
    if (warning.code === 'css-unused-selector') return;
    handler(warning);
  },

  kit: {
    adapter: adapter({
      pages: 'public',     // Build output folder for Neocities
      assets: 'public',
      fallback: null       // optional: use SPA fallback if needed
    }),

    alias: {
      '@components': './src/webpack/components',
      '@pages': './src/webpack/pages',
      '@misc': './src/webpack/misc',
      '@api': './src/webpack/api'
    }
  }
};

export default config;