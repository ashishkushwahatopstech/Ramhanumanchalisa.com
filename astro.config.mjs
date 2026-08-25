import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import path from 'path';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    imageService: 'passthrough'
  }),
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        '.prisma/client/edge': path.resolve(process.cwd(), 'node_modules/.prisma/client/edge.js'),
        '@prisma/client/edge': path.resolve(process.cwd(), 'node_modules/.prisma/client/edge.js'),
        '.prisma/client/index-browser': path.resolve(process.cwd(), 'node_modules/.prisma/client/index-browser.js')
      }
    },
    ssr: {
      noExternal: [/prisma/, '@prisma/client', '.prisma/client']
    }
  }
});
