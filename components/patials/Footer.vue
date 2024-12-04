<script setup lang="ts">
import ThemeSwitch from "../ui/themeSwitch.vue";
import LangSwitcher from "../ui/LangSwitcher.vue";
</script>

<template>
    <Container className="mt-10 border-t border-gray-100 dark:border-gray-800">
        <div class="flex sm:hidden gap-5 item-center justify-center w-full pb-5">
            <div class="navbar__item navbar__item-up relative">
                <LangSwitcher />
            </div>
            <ThemeSwitch />
        </div>
        <div class="text-center text-sm dark:text-gray-400">
            Copyright © {{new Date().getFullYear()}} The Fit Life Guide. All rights reserved.
        </div>
        <div class="text-center text-sm mt-2">
            <NuxtLinkLocale :to="'/privacy'" class="hover:text-secondary dark:text-gray-400 dark:hover:text-secondary">{{ $t('privacy_policy') }}</NuxtLinkLocale>
        </div>
    </Container>
</template>

<style scoped>

</style>