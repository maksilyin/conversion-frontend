import type {NuxtI18nOptions} from '@nuxtjs/i18n';

const i18nConfig: NuxtI18nOptions = {
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
        {
            code: 'id',
            language: 'id',
        },
        {
            code: 'cs',
            language: 'cs',
        },
        {
            code: 'da',
            language: 'da',
        },
        {
            code: 'de',
            language: 'de',
        },
        {
            code: 'es',
            language: 'es',
        },
        {
            code: 'fr',
            language: 'it',
        },
        {
            code: 'hu',
            language: 'hu',
        },
        {
            code: 'nl',
            language: 'nl',
        },
        {
            code: 'no',
            language: 'no',
        },
        {
            code: 'pl',
            language: 'pl',
        },
        {
            code: 'pt',
            language: 'pt',
        },
        {
            code: 'fi',
            language: 'fi',
        },
        {
            code: 'sv',
            language: 'sv',
        },
        {
            code: 'vi',
            language: 'vi',
        },
        {
            code: 'tr',
            language: 'tr',
        },
        {
            code: 'ar',
            language: 'ar',
        },
        {
            code: 'th',
            language: 'th',
        },
        {
            code: 'ja',
            language: 'ja',
        },
        {
            code: 'zh',
            language: 'zh',
        },
        {
            code: 'zt',
            language: 'zt',
        },
        {
            code: 'ko',
            language: 'ko',
        },
        {
            code: 'uk',
            language: 'uk',
        },
        {
            code: 'el',
            language: 'el',
        },
    ],
    customRoutes: 'config',
    defaultLocale: 'en',
    vueI18n: './nuxt-i18n.js',
}
export default i18nConfig;