<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type {Menu} from "~/types/Menu";
import NavItem from "./NavItem.vue";
import SearchInputHeader from "../../ui/SearchInputHeader.vue";
import NavItemMobile from "./NavItemMobile.vue";
import Tools from "./Tools"

const menu:Menu[] = [
    {
        id: 1,
        name: 'Инструменты',
        url: '#',
        children: [],
        component: Tools
    },
    {
        id: 2,
        name: 'Сжать изображения',
        url: '/',
    }
];

const openMenu = ref(false);

const toggleMobileMenu = (value: boolean) => {
    openMenu.value = value

    if (openMenu.value) {
        document.body.classList.add('overflow-hidden');
    }
    else {
        document.body.classList.remove('overflow-hidden');
    }
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
            <div class="relative flex flex-wrap items-center justify-between lg:flex-nowrap">
                <NuxtLinkLocale :to="'/'" class="w-36 dark:hidden">
                    <NuxtImg
                        src="/img/logo.png"
                        alt="Logo"
                        height="57.1px"
                    />
                </NuxtLinkLocale>
                <NuxtLinkLocale :to="'/'" class="hidden w-36 dark:block">
                    <NuxtImg
                        src="/img/logo-white.png"
                        alt="Logo"
                        height="57.1px"
                    />
                </NuxtLinkLocale>
                <div class="flex-col items-start lg:order-none lg:flex lg:flex-row flex-grow">
                    <div v-for="(item, index) in menu" :key="`${item.name}${index}`" class="navbar__item relative">
                        <NavItem :item="item"/>
                    </div>
                    <div class="navbar__item relative block ml-auto">
                        <SearchInputHeader/>
                    </div>
                    <button @click="toggleMobileMenu(!openMenu)" class="rounded-md px-2 py-1 text-gray-500 focus:outline-none dark:text-gray-300 lg:hidden">
                        <svg class="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path v-if="openMenu" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
                            <path v-else d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    </UContainer>
</template>