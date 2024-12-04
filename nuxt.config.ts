// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      APP_URL: process.env.APP_URL,
      API_URL: process.env.API_URL,
      FILE_URL: process.env.FILE_URL,
      STORAGE_URL: process.env.STORAGE_URL,
      REVERB_APP_KEY: process.env.REVERB_APP_KEY,
      REVERB_HOST: process.env.REVERB_HOST,
      REVERB_PORT: process.env.REVERB_PORT,
      REVERB_SCHEME: process.env.REVERB_SCHEME,
      GOOGLE_PICKER_CLIENT_ID: process.env.GOOGLE_PICKER_CLIENT_ID,
      GOOGLE_PICKER_API_KEY: process.env.GOOGLE_PICKER_API_KEY,
      DROPBOX_KEY: process.env.DROPBOX_KEY,
    }
  },
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxtjs/i18n",
    'nuxt-schema-org',
    'nuxt-og-image',
    '@nuxtjs/seo',
    '@nuxt/image',
  ],
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
  },
})