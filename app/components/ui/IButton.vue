<script setup lang="ts">
const props = defineProps({
    size: {
        default: ''
    },
    icon: {
        default: ''
    },
    label: {
        default: ''
    }
})
</script>

<template>
    <UButton
        :size="size"
        class="bg-blue-dark-100 transition duration-500 rounded-md hover:bg-blue-dark"
        :icon="icon"
        :label="label"
    >
        <slot></slot>
        <template #trailing>
            <slot name="trailing"></slot>
        </template>
    </UButton>
</template>

<style scoped>

</style>