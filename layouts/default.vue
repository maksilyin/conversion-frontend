<script setup  lang="ts">
import Navbar from "~/components/patials/navbar/Navbar.vue";
import Footer from "~/components/patials/Footer.vue";
import {useI18n} from "vue-i18n";
const { t } = useI18n();
const { loadFormats } = useFormats();

const head = useLocaleHead({
    addDirAttribute: true,
    identifierAttribute: 'id',
    addSeoAttributes: true
});

defineOgImage({url: '/img/logo.png', width: 657, height: 232, alt: 'The Fit Life Guide'})

const title = computed(() => {
    const defaultTitle = t('layouts.title');
    const routeTitle = typeof route.meta.title === 'string' ? t(route.meta.title) : 'The Fit Life Guide';

    return routeTitle || defaultTitle;
});

const route = useRoute()

useHead({
    link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'
        },
    ],
    titleTemplate: null,
});

loadFormats();

</script>

<template>
    <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir" class="antialiased text-gray-800 dark:bg-black-900 dark:text-gray-400">
        <Head>
            <Title>{{ title }}</Title>
            <template v-for="link in head.link" :key="link.id">
                <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
            </template>
        </Head>
        <Body class="dark:bg-black-900 min-h-[100vh]">
            <header class="navigation xl:px-11 py-5 border-b">
                <Navbar></Navbar>
            </header>
            <slot></slot>
            <Footer></Footer>
        </Body>
    </Html>
</template>

<style scoped>

</style>