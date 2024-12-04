<script setup lang="ts">
import type {Menu} from "~/types/Menu";
import SlideUpDown from 'vue-slide-up-down'

interface Props {
    item: Menu
}

let isAnimate = false;
const isOpen = ref(false);
const props = defineProps<Props>();
const className = "px-3 xl:px-4 py-2 text-sm font-medium text-gray-600 hover:text-secondary dark:text-gray-400 dark:hover:text-secondary flex gap-2 items-center relative";

const isExternal = computed(() => {
    return /^(http|https):\/\//.test(props.item.url)
});

const hasSubmenu = computed(() => {
    return props.item.children.length
});

const itemLink = computed(() => {
    return props.item.url;
});

const clickHandler = (e:PointerEvent) => {
    isOpen.value = !isOpen.value;
}

onMounted(() => {

});

</script>

<template>
    <div class="flex gap-2 items-center justify-center">
        <NuxtLinkLocale
            v-if="!isExternal"
            :to="itemLink"
            :class="className + (hasSubmenu ? ' parent' : '')"
        >
            {{ item.name }}
            <span @click.stop.prevent="clickHandler" class="absolute lg:static right-[-13px] transition-all" :class="{'rotate-180': isOpen}">
                <svg v-if="hasSubmenu" class="size-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </span>
        </NuxtLinkLocale>
        <a v-else :href="item.url" :class="className">
            {{ item.name }}
            <span @click.stop.prevent="clickHandler" class="absolute lg:static right-[-13px] transition-all" :class="{'rotate-180': isOpen}">
                <svg v-if="hasSubmenu" class="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </span>
        </a>
    </div>
    <div
        v-if="hasSubmenu"
        class=""
    >
        <slide-up-down :active="isOpen" :duration="300">
            <NavItemMobile v-for="subItem in item.children" :key="subItem.type + subItem.id" :item="subItem"/>
        </slide-up-down>
    </div>
</template>

<style scoped>

</style>