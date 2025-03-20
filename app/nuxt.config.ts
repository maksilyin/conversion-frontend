// https://nuxt.com/docs/api/configuration/nuxt-config

import i18nConfig from './config/i18n';
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      APP_NAME: process.env.APP_NAME,
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
      CHUNK_SIZE: process.env.CHUNK_SIZE,
      TASK_SIZE_LIMIT: process.env.TASK_SIZE_LIMIT,
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
  robots: {
    disallow: ['/admin', '/search'],
    credits: false,
    sitemap: [
      '/sitemap_index.xml',
    ],
  },
  site: {
    url: process.env.APP_URL,
    name: process.env.NUXT_SITE_NAME,
  },
  sitemap: {
    sources: [
      process.env.APP_URL + '/api/sitemap/'
      //'http://nginx/api/sitemap/'
    ],
  },
  i18n: i18nConfig,
  nitro: { compressPublicAssets: true, prerender: { failOnError: false, routes: ['sitemap.xml'], }, }
})