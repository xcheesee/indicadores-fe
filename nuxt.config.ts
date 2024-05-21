// https://nuxt.com/docs/api/configuration/nuxt-config
import glsl from 'vite-plugin-glsl';
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  devtools: { enabled: true },
  pages: true,
  ssr: false,
  routeRules: {
    "/**": { ssr: false },
  },
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon"],
  tailwindcss: {
    configPath: "tailwind.config",
    exposeConfig: { level: 2, },
    config: {},
    viewer: true,
  },
  vite: {
    plugins: [glsl()]
  }
});
