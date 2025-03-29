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
    <div>
        <UContainer>
            <Breadcrumbs v-if="!hideBreadCrumbs" :links="breadcrumbs"/>
            <div class="pt-7 lg:pt-14 pb-7">
                <h1 class="text-black-500 font-[700] mb-5 mt-2 text-center text-3xl dark:text-white md:text-3xl lg:text-[42px] lg:leading-snug">
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

</style>