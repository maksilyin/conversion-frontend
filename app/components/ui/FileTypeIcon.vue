<script setup>
const { getStoragePath } = imagePath();

const props = defineProps({
    fileType: {
        default: null,
    },
    converterIcons: {
        required: false,
        type: Array,
    }
})

</script>

<template>
    <span class="inline-flex items-center justify-center w-12 h-12 flex-shrink">
        <img
            v-if="fileType.icon_image"
            :src="getStoragePath(fileType.icon_image).src"
            class="w-full h-full object-contain"
            :alt="fileType.name"
        />
        <UIcon v-else-if="fileType.icon" :name="fileType.icon" class="w-full h-full text-orange-400"/>
        <img
            v-else-if="converterIcons[fileType.slug]"
            :src="converterIcons[fileType.slug]"
            class="w-full h-full object-contain"
            :alt="fileType.name"
        />
        <UIcon v-else-if="fileType.icon" :name="fileType.icon" class="w-full h-full text-orange-400"/>
    </span>
</template>

<style scoped>
</style>