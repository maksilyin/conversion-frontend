<script setup lang="ts">
const props = defineProps({
    shadow: {
        default: false,
        type: Boolean
    },
})
</script>

<template>
    <div
        class="rounded-[30px] bg-white py-12 px-3 sm:px-12"
        :class="{'rounded-block-shadow': shadow}"
    >
        <slot></slot>
    </div>
</template>

<style scoped>
.rounded-block-shadow {
    @apply shadow-ring shadow-black-300/5;
}
</style>