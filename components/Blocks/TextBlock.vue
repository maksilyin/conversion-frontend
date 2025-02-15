<script setup lang="ts">

import type {TextBlock} from "~/types/TextBlock";
import DetailText from "~/components/Blocks/DetailText.vue";

const props = defineProps({
    block: {
        type: String,
        required: true,
    },
});

const api = useApi();

const textBlock: TextBlock | null = await api.fetchData<TextBlock>('text', { key: props.block });

</script>

<template>
    <DetailText v-if="textBlock" :text="textBlock.description"/>
</template>

<style scoped>

</style>