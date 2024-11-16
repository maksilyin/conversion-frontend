// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      APP_URL: process.env.APP_URL,
      API_URL: process.env.API_URL,
      FILE_URL: process.env.FILE_URL,
    }
  },
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/i18n"],
  i18n: {
    baseUrl: process.env.APP_URL,
    locales: [
      {
        code: 'en',
        language: 'en',
      },
      {
        code: 'ru',
        language: 'ru',
      },
    ],
    defaultLocale: 'en',
    vueI18n: './nuxt-i18n.js',
  }
})