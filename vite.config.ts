import path from 'path';
import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

const resolve = {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  // Tell Vitest to use the `browser` entry points in `package.json` files, even though it's running in Node
  resolve: process.env.VITEST
    ? {
        conditions: ['browser'],
        ...resolve,
      }
    : resolve,
});
