<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { availableLocales, locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
</script>

<template>
    <div class="flex gap-2 items-center uppercase group">
        <span class="px-3 py-2 text-sm font-medium text-gray-600 hover:text-secondary dark:text-gray-400 dark:hover:text-secondary flex gap-2 items-center cursor-pointer">
            {{locale}}
            <svg class="size-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
        </span>
        <div class="submenu scroll group-hover:visible group-hover:opacity-100">
            <div v-for="localeItem in availableLocales" :key="localeItem">
                <nuxt-link
                    :href="switchLocalePath(localeItem)"
                    class="uppercase px-3 py-2 text-sm font-medium text-gray-600 hover:text-secondary dark:text-gray-400 dark:hover:text-secondary flex gap-2 items-center"
                >
                    {{localeItem}}
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>