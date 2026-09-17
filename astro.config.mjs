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
  redirects: {
    '/blog/surya-dev-aarti-bhajan-lyrics-in': { status: 301, destination: '/blog/surya-dev-aarti-bhajan-lyrics-in-english-and-hindi' },
    '/blog/shri-ram-aarti-lord-ram-prayer-in': { status: 301, destination: '/blog/shri-ram-aarti-lord-ram-prayer-in-marathi' },
    '/blog/shri-kaal-bhairav-chalisa-lyrics-in': { status: 301, destination: '/blog/shri-kaal-bhairav-chalisa-lyrics-in-hindi' },
    '/blog/shri-kaal-bhairav-chalisa-lyrics-in_24': { status: 301, destination: '/blog/shri-kaal-bhairav-chalisa-lyrics-in-english' },
    '/blog/durga-aarti-goddess-durga-prayer-in': { status: 301, destination: '/blog/durga-aarti-goddess-durga-prayer-in-marathi' },
    '/blog/shri-vindheshwari-chalisa-lyrics-in': { status: 301, destination: '/blog/shri-vindheshwari-chalisa-lyrics-in-english-hindi' },
    '/blog/shri-datta-chi-aarti-lord-dattatreya': { status: 301, destination: '/blog/shri-datta-chi-aarti-lord-dattatreya-prayer-in-marathi' },
    '/blog/shri-sadguru-aarti-lord-sadguru-prayer': { status: 301, destination: '/blog/shri-sadguru-aarti-lord-sadguru-prayer-in-marathi' },
    '/blog/shri-krishna-aarti-lord-krishna-prayer': { status: 301, destination: '/blog/shri-krishna-aarti-lord-krishna-prayer-in-marathi' },
    '/blog/shri-vishnu-aarti-lord-vishnu-prayer-in': { status: 301, destination: '/blog/shri-vishnu-aarti-lord-vishnu-prayer-in-marathi' },
    '/blog/shri-shankar-aarti-lord-shiva-prayer-in': { status: 301, destination: '/blog/shri-shankar-aarti-lord-shiva-prayer-in-marathi' },
    '/blog/shri-ganpati-aarti-lord-ganesh-prayer': { status: 301, destination: '/blog/shri-ganpati-aarti-lord-ganesh-prayer-in-marathi' },
    '/blog/shri-ramchandra-kripalu-lyrics-in': { status: 301, destination: '/blog/shri-ramchandra-kripalu-lyrics-in-english' },
    '/blog/shri-rani-sati-chalisa-lyrics-in': { status: 301, destination: '/blog/shri-rani-sati-chalisa-lyrics-in-english' },
    '/blog/shri-annapurna-chalisa-lyrics-in': { status: 301, destination: '/blog/shri-annapurna-chalisa-lyrics-in-english' },
    '/blog/shri-saraswati-chalisa-lyrics-in': { status: 301, destination: '/blog/shri-saraswati-chalisa-lyrics-in-english-hindi' },
    '/blog/shri-baba-balaknath-chalisa-lyrics-in': { status: 301, destination: '/blog/shri-baba-balaknath-chalisa-lyrics-in-hindi' },
    '/blog/shri-chandraprabhu-chalisa-lyrics-in': { status: 301, destination: '/blog/shri-chandraprabhu-chalisa-lyrics-in-hindi' },
    '/blog/japji-sahib-path-in-hindi-punjabi-and': { status: 301, destination: '/blog/japji-sahib-path-in-hindi-punjabi-and-english' },
    '/blog/balaji-chalisa-lyrics-in-english-and': { status: 301, destination: '/blog/balaji-chalisa-lyrics-in-english-and-hindi' },
    '/blog/gorakhnath-chalisa-lyrics-in-hindi-and': { status: 301, destination: '/blog/gorakhnath-chalisa-lyrics-in-hindi-and-english' },
    '/blog/chamunda-chalisa-lyrics-in-hindi-and': { status: 301, destination: '/blog/chamunda-chalisa-lyrics-in-hindi-and-english' }
  },
  vite: {
    ssr: {
      noExternal: isBuild ? [/prisma/, '@prisma/client', '.prisma/client'] : []
    }
  }
});
