<script setup>
import FileInput from "./FileInput";
import FileInputCompact from "~/components/functional/fileUploader/FileInputCompact";
import { FILE_STATUS } from "~/utils/constants"
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
    <UContainer class="max-w-[991px]">
        <div v-if="files.length" class="flex flex-col gap-2 pb-10">
            <slot name="files"></slot>
        </div>
    </UContainer>
    <FileInput v-if="!files.length"  @addFile="(e) => {console.log('addFile')}"/>
    <div class="sticky bottom-0 bg-white py-5 border-t" v-else>
        <UContainer>
            <div v-if="isShowProgress || status === 'complete'" class="flex justify-center pb-5">
                <UProgress v-if="isShowProgress" size="lg" color="blue" :value="taskProgress"></UProgress>
                <UButton
                    v-else-if="status === 'complete'"
                    icon="material-symbols:download"
                    size="xl"
                    color="primary"
                    variant="solid"
                    label="Скачать все"
                    :trailing="false"
                    @click="downloadZip(uuid)"
                />
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