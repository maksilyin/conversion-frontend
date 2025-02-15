<script setup>

const { loadFormats } = useFormats();
const { loadLocales } = useLocale();

await loadFormats();
await loadLocales();

</script>

<template>
    <NuxtLoadingIndicator />
    <NuxtLayout>
        <NuxtPage/>
    </NuxtLayout>
</template>