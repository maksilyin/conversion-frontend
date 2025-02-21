<script setup lang="ts">
import { FILE_STATUS } from "~/utils/constants"
import type {UploadFile} from "~/types/UploadFile";
const props = defineProps({
    file: {
        required: true,
        type: Object as PropType<UploadFile>
    }
})
</script>

<template>
    <UProgress
        class="progress"
        size="md"
        :class="{'progress-delete': file.status === FILE_STATUS.DELETE}" :value="file.progress" />
</template>

<style scoped>
.progress ::v-deep(progress) {
    @apply !text-blue-400;
}
.progress-delete ::v-deep(progress) {
    @apply !text-red-500;
}
</style>