// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primevue/themes/aura";
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  css: ["~/assets/css/main.scss"],
  image: {
    provider: "ipx",
  },
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@primevue/nuxt-module",
    "@nuxt/image",
    "@nuxt/scripts",
  ],
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          cssLayer: true,
        },
      },
    },
  },
  app: {
    head: {
      title: "NASA - Data Search",
      meta: [
        {
          name: "description",
          content:
            "NASA data Search, when you can search by date for data about nasa and save favorites.",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  runtimeConfig: {
    apiKey: process.env.NUXT_API_KEY,
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
    },
  },
  imports: {
    dirs: ["store"],
  },
});
