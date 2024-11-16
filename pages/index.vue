<script setup lang="ts">
import FileUploader from "~/components/functional/fileUploader/FileUploader.vue";
import type {Task} from "~/types/Task";

const api = useApi();

</script>

<template>
    <UContainer>
        <FileUploader chunkSize="26214"/>
    </UContainer>
</template>

<style scoped>

</style>