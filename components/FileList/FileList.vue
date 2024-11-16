<script setup>
import FileInfo from "~/components/FileList/FileInfo.vue";

const props = defineProps({
    files: {
        type: Array,
        required: true,
    }
})
</script>

<template>
    <div class="flex flex-col gap-3">
        <FileInfo v-for="(file, index) in files" :file="file" :key="index"></FileInfo>
    </div>
</template>

<style scoped>

</style>