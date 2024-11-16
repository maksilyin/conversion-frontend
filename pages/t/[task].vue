<script setup lang="ts">
import FileUploader from "~/components/functional/fileUploader/FileUploader.vue";

const route = useRoute();
const taskId = Array.isArray(route.params.task) ? route.params.task[0] : route.params.task;
const api = useApi();

const task = await api.fetchData('task', { task_id: taskId });


</script>

<template>
    <UContainer>
        <FileUploader :task="task" />
    </UContainer>
</template>

<style scoped>

</style>