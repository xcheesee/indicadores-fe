// https://nuxt.com/docs/api/configuration/nuxt-config
import glsl from 'vite-plugin-glsl';
export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,
  ssr: false,
  routeRules: {
    "/**": { ssr: false },
  },
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon"],
  tailwindcss: {
    configPath: "tailwind.config",
    exposeConfig: false,
    exposeLevel: 2,
    config: {},
    injectPosition: "first",
    viewer: true,
  },
  vite: {
    plugins: [glsl()]
  }
});
