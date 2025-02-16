<script setup lang="ts">
const props = defineProps({
    text: {
        type: String,
        required: true
    }
})
</script>

<template>
    <div class="py-20">
        <UContainer>
            <div class="prose mx-auto my-3 dark:prose-invert prose-a:text-blue-600 max-w-full" v-html="text"></div>
        </UContainer>
    </div>
</template>

<style scoped>

</style>