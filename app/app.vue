<script setup>

const { loadFormats } = useFormats();
const { loadLocales } = useLocale();

await Promise.all([
    loadFormats().then(() => undefined),
    loadLocales().then(() => undefined)
]);

onMounted(() => {
    useCsrf();
})

</script>

<template>
    <NuxtLoadingIndicator />
    <NuxtLayout>
        <NuxtPage/>
    </NuxtLayout>
    <UModals />
</template>