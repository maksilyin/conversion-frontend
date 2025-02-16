<script setup lang="ts">
import ThemeSwitch from "../ui/themeSwitch.vue";
import LangSwitcher from "../ui/LangSwitcher.vue";
import {useI18n} from "vue-i18n";
const { t } = useI18n();

const menuCols = [
    {
        name: t('menu.convert'),
        items: [
            {
                name: t('menu.footer.image'),
                url: '/convert/image'
            },
            {
                name: t('menu.footer.document'),
                url: '/convert/document'
            },
            {
                name: t('menu.footer.audio'),
                url: '/convert/audio'
            },
            {
                name: t('menu.footer.video'),
                url: '/convert/video'
            },
            {
                name: t('menu.footer.presentation'),
                url: '/convert/presentation'
            },
        ]
    },
    {
        name: t('menu.company'),
        items: [
            {
                name: t('menu.about'),
                url: '/about'
            },
            {
                name: t('menu.faq'),
                url: '/faq'
            },
            {
                name: t('menu.security'),
                url: '/security'
            },
            {
                name: t('menu.privacy'),
                url: '/privacy'
            },
            {
                name: t('menu.terms_service'),
                url: '/terms'
            },
        ]
    },
]

</script>

<template>
    <div class="pt-10 pb-5 bg-black-300 text-white">
        <UContainer className="mt-10 border-t border-gray-100 dark:border-gray-800">
            <div class="grid grid-cols md:grid-cols-3 pb-8 md:pb-10 gap-8 md:gap-12">
                <div class="">
                    <NuxtLinkLocale :to="'/'" class="w-44 dark:hidden">
                        <NuxtImg
                            src="/img/logo-white.svg"
                            alt="Logo"
                            class="max-w-[300px]"
                        />
                    </NuxtLinkLocale>
                </div>
                <div class="flex flex-col gap-2" v-for="(menuCol, index) in menuCols" :key="index">
                    <div class="uppercase font-medium mb-2">
                        {{menuCol.name}}
                    </div>
                    <NuxtLinkLocale
                        class="transition hover:text-main-100"
                        v-for="menuItem in menuCol.items" :key="menuItem.name + menuItem.url"
                        :to="menuItem.url"
                    >
                        {{ menuItem.name }}
                    </NuxtLinkLocale>
                </div>
            </div>
            <div class="grid grid-cols md:grid-cols-2 items-center">
                <div class="text-sm text-center md:text-left order-2 md:order-none">
                    Copyright © {{new Date().getFullYear()}} All rights reserved.
                </div>
                <div class="text-center text-sm md:ml-auto w-48 mb-8 md:mb-0">
                    <LangSwitcher />
                </div>
            </div>
        </UContainer>
    </div>
</template>

<style scoped>

</style>