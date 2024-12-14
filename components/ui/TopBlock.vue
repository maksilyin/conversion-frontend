<script setup lang="ts">
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";

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
    <UContainer>
        <Breadcrumbs v-if="!hideBreadCrumbs" :links="breadcrumbs"/>
        <div class="pt-14 pb-7">
            <h1 class="text-blue-dark-900 mb-5 mt-2 text-center text-3xl font-medium dark:text-white md:text-3xl lg:text-4xl lg:leading-snug">
                <slot name="title"></slot>
            </h1>
            <p class="text-gray-600 mb-5 text-center text-lg dark:text-white lg:leading-snug">
                <slot name="subtitle"></slot>
            </p>
        </div>
    </UContainer>
</template>

<style scoped>

</style>