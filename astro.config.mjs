import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://astranomical.xyz',
  // Static output. GitHub Pages serves the built dist/ via the deploy workflow;
  // public/CNAME rides along so the custom domain survives every build.
});
