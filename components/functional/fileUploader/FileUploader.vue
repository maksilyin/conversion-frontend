<script setup>
import FileInput from "./FileInput";
import FileInputCompact from "~/components/functional/fileUploader/FileInputCompact";
import { FILE_STATUS } from "~/utils/constants"
import DrugAndDrop from "~/components/functional/fileUploader/DrugAndDrop.vue";
const {uuid, createTask, startTask, taskProgress, status} = useTask();

const props = defineProps({
    type: {
        type: String,
        required: true,
    },
    chunkSize: {
        type: Number,
        default: (1024 * 512)
    },
    maxRetries: {
        type: Number,
        default: 3
    },
    params: {
        type: Object,
        default: () => {}
    }
})

const { setInputFiles, uploadFile, files, downloadZip } = useUploader()
const isShowProgress = ref(false);
const isCreatingTask = ref(false);
const fileInput = ref(null);

const onSelectFile = async () => {
    setInputFiles(Array.from(fileInput.value.files), props.params);
    fileInput.value.value = null;
}

const uploadFiles = () => {
    filesToUpload.value.forEach(file => {
        uploadFile(file.file, file.hash, uuid.value, props.chunkSize, props.maxRetries);
    })
}

const sendData = computed(() => {
    return {
        task: uuid.value,
        type: props.type,
        payload: {
            files: files.value.map(file => ({
                hash: file.hash,
                status: file.status,
                filename: file.filename,
                params: file.params,
            }))
        }
    }
})

const send = () => {
    startTask(sendData.value);
}

const filesToUpload = computed(() => {
    return files.value.filter(file => file.status === FILE_STATUS.CREATED);
})

watch(status, newValue => {
    if (newValue === 'pending') {
        isShowProgress.value = true;
    }
    else if (newValue === 'complete') {
        setTimeout(() => {
            isShowProgress.value = false;
        }, 500)
    }
});

watch(filesToUpload, async (newValue) => {
    if (!newValue.length) return;

    if (!uuid.value && !isCreatingTask.value) {
        isCreatingTask.value = true;
        await createTask();
        isCreatingTask.value = false;
    }

    if (uuid.value) {
        uploadFiles();
    }
})

</script>

<template>
    <DrugAndDrop for="input-file"/>
    <UContainer>
        <div v-if="files.length" class="flex flex-col pb-10">
            <slot name="files"></slot>
        </div>
    </UContainer>
    <FileInput v-if="!files.length"/>
    <div v-else class="sticky z-[100] bottom-0 bg-white pb-0 pt-3 md:pb-5 md:pt-5 border-t">
        <UContainer class="px-0 sm:px-0">
            <div v-if="isShowProgress || status === 'complete'" class="flex justify-center">
                <div v-if="isShowProgress" class="absolute w-full left-0 top-0">
                    <UProgress size="sm" color="blue" :value="taskProgress"></UProgress>
                </div>
            </div>
            <FileInputCompact @send="send">
                <slot name="compact"></slot>
            </FileInputCompact>
        </UContainer>
    </div>
    <input ref="fileInput" @change="onSelectFile" id="input-file" type="file" multiple class="hidden" />
</template>

<style scoped>

</style>