// @ts-check
import { defineConfig } from 'astro/config';


import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

;

// https://astro.build/config
export default defineConfig({
  site: 'https://meidenlife.nl',
  output: 'static',

  server: {
    host: true,
    port: 4321,
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
});