<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type {Menu} from "~/types/Menu";
import NavItem from "./NavItem.vue";
import SearchInputHeader from "../../ui/SearchInputHeader.vue";
import NavItemMobile from "./NavItemMobile.vue";
import Tools from "./Tools"
import {useI18n} from "vue-i18n";
const { t } = useI18n();

const menu:Menu[] = [
    {
        id: 1,
        name: t('menu.tools'),
        url: '#',
        children: [],
        component: Tools
    },
    {
        id: 2,
        name: t('menu.about'),
        url: '/about'
    },
    {
        id: 3,
        name: t('menu.faq'),
        url: '/faq'
    },
    {
        id: 4,
        name: t('menu.security'),
        url: '/security'
    },
];

const openMenu = ref(false);

const toggleMobileMenu = (value: boolean) => {
    openMenu.value = value
};

const router = useRouter();
const route = useRoute()

watch(() => route.path, () => {
    if (openMenu.value) {
        toggleMobileMenu(false);
    }
})

</script>

<template>
    <UContainer>
        <nav class="">
            <div class="relative flex gap-4 flex-wrap items-center justify-between lg:flex-nowrap">
                <NuxtLinkLocale :to="'/'" class="w-44 dark:hidden">
                    <NuxtImg
                        src="/img/logo.svg"
                        alt="Logo"
                        height="80px"
                    />
                </NuxtLinkLocale>
                <div class="flex-col items-start lg:order-none lg:flex lg:flex-row flex-grow hidden">
                    <div v-for="(item, index) in menu" :key="`${item.name}${index}`" class="navbar__item relative">
                        <NavItem :item="item"/>
                    </div>
                </div>
                <button @click="toggleMobileMenu(!openMenu)" class="rounded-md px-2 py-1 text-gray-500 focus:outline-none dark:text-gray-300 lg:hidden">
                    <svg class="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path v-if="openMenu" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
                        <path v-else d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2z"/>
                    </svg>
                </button>
            </div>
            <USlideover v-model="openMenu">
                <div class="relative">
                    <UButton
                        color="gray"
                        variant="ghost"
                        size="sm"
                        icon="i-heroicons-x-mark-20-solid"
                        class="flex sm:hidden absolute end-2 top-2 z-20"
                        square
                        padded
                        @click="openMenu = false"
                    />
                    <div class="flex flex-col pt-14">
                        <div
                            v-for="(item, index) in menu"
                            :key="`${item.name}${index}`"
                            class="navbar__item"
                        >
                            <NavItemMobile :item="item"/>
                        </div>
                    </div>
                </div>
            </USlideover>
        </nav>
    </UContainer>
</template>