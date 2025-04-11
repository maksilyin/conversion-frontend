<script setup lang="ts">
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";
import type { BreadcrumbLink } from '#ui/types';

const props = defineProps({
    breadcrumbs: {
        type: Array as PropType<BreadcrumbLink[] | null>,
        default: null,
    },
    hideBreadCrumbs: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <div class="top-block">
        <UContainer>
            <Breadcrumbs v-if="!hideBreadCrumbs" :links="breadcrumbs"/>
            <div class="title-wrapper">
                <h1>
                    <slot name="title"></slot>
                </h1>
                <p class="sm:text-lg text-black-300 mb-5 text-center dark:text-white lg:leading-snug">
                    <slot name="subtitle"></slot>
                </p>
            </div>
        </UContainer>
    </div>
</template>

<style scoped>
.top-block h1 {
    @apply text-black font-[700] mb-5 mt-2 text-center text-3xl dark:text-white md:text-3xl lg:text-[42px] lg:leading-snug;
}

.top-block .title-wrapper {
    @apply pt-7 lg:pt-14 pb-7;
}

.top-block.page h1 {
    @apply text-left mb-0;
}

.top-block.page .title-wrapper {
    @apply lg:pt-7 pb-0;
}
</style>