<script setup>
import nuxtStorage from 'nuxt-storage';

const theme = ref('light');
const themes = [
    'light',
    'dark'
]

onMounted(() => {
    const themeStorage = nuxtStorage.localStorage.getData('theme');

    if (themeStorage) {
        theme.value = themeStorage;
    }
    updateHtmlTheme(theme.value);
});

watch(theme, (newValue) => {
    updateHtmlTheme(newValue);
    setTheme(newValue);
});
function updateHtmlTheme(theme) {
    const htmlElement = document.documentElement;
    htmlElement.classList.remove('dark', 'light');
    htmlElement.classList.add(theme);

    if (theme === 'dark') {
        htmlElement.style.colorScheme = 'dark';
    }
    else {
        htmlElement.style.colorScheme = 'light';
    }
}

const isDark = computed(() => {
    return theme.value === 'dark';
})

const setTheme = (newTheme) => {
    if (themes.includes(newTheme)) {
        nuxtStorage.localStorage.setData('theme', newTheme)
    }
}

const switchTheme = () => {
    theme.value = isDark.value ? 'light' : 'dark';
    updateHtmlTheme(theme.value);
}

</script>

<template>
    <div class="inline-flex items-center text-gray-600 hover:text-secondary dark:text-gray-400 dark:hover:text-secondary" @click="switchTheme">
        <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>
    </div>
</template>