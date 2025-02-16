<script setup lang="ts">
import ConvertCategory from "~/components/functional/ConvertCategory.vue";
import ConvertFormat from "~/components/functional/ConvertFormat.vue";

const route = useRoute();
const param = Array.isArray(route.params.request) ? route.params.request[0] : route.params.request;

const { formats } = useFormats();
const isCategory = ref(false);

if (formats.value.find(formatType => formatType.slug === param)) {
    isCategory.value = true;
}

</script>
<template>
    <ConvertCategory v-if="isCategory" :category="param" />
    <ConvertFormat v-else :format="param" />
</template>

<style scoped>

</style>