<script setup lang="ts">
import ConvertCategory from "~/components/functional/ConvertCategory.vue";
import {useI18n} from "vue-i18n";
const { t } = useI18n();

useSeoMeta({
    title: t('page.index.title'),
    description: t('page.index.description'),
});

</script>

<template>
    <ConvertCategory category="image" />
</template>

<style scoped>

</style>