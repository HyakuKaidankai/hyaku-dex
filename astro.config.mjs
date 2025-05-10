// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
    site: 'https://hyakukaidankai.github.io',
    base: 'hyaku-dex',
    vite: {
        plugins: [tailwindcss()],
      },
      image: {
        remotePatterns: [{ protocol: "https" }],
      }
});
