import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import path from 'path';

// Astro config helper: inspect command arguments directly in module scope
const isBuild = process.argv.includes('build') || process.env.NODE_ENV === 'production';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    imageService: 'passthrough'
  }),
  integrations: [react()],
  vite: {
    resolve: {
      alias: isBuild ? {
        '@prisma/client$': path.resolve(process.cwd(), 'node_modules/@prisma/client/edge.js'),
        '.prisma/client/edge': path.resolve(process.cwd(), 'node_modules/.prisma/client/edge.js'),
        '.prisma/client/default': path.resolve(process.cwd(), 'node_modules/@prisma/client/edge.js')
      } : {}
    },
    ssr: {
      noExternal: isBuild ? [/prisma/, '@prisma/client', '.prisma/client'] : []
    }
  }
});
