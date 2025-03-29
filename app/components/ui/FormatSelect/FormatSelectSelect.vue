<script setup lang="ts">
const props = defineProps({
    label: {
        type: String,
        default: '',
    },
    selectedFormat: {
        type: String,
        default: '',
    },
    clickHandler: {
        type: Function,
        default: () => {}
    }
})
</script>

<template>
    <div class="flex items-center gap-2" @click="clickHandler">
        {{ label }}
        <span class="select">
            <span class="mx-auto">{{ selectedFormat.toUpperCase() }}</span>
            <UIcon name="material-symbols:keyboard-arrow-down-rounded" class="w-4 h-4 ml-auto" />
        </span>
    </div>
</template>

<style scoped>
.select {
    @apply w-[70px] md:w-[80px] border rounded border-gray-300 text-xs px-2 md:px-3 py-1 md:py-2 inline-flex items-center
    justify-between cursor-pointer min-w-[60px] gap-2 transition hover:border-primary-500 hover:text-primary-500;
}
</style>