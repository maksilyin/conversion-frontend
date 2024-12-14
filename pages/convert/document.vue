<script setup lang="ts">
import {useI18n} from "vue-i18n";

const { t } = useI18n();

useSeoMeta({
    title: t('page.index.title'),
    description: t('page.index.description'),
});


import ConvertCategory from "~/components/functional/ConvertCategory.vue";
</script>

<template>
    <ConvertCategory category="document" />
</template>

<style scoped>

</style>