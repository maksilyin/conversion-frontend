<script setup>
import FileInput from "./FileInput";
import FileInputCompact from "~/components/functional/fileUploader/FileInputCompact";
import { FILE_STATUS } from "~/utils/constants"
import DrugAndDrop from "~/components/functional/fileUploader/DrugAndDrop.vue";
import {useI18n} from "vue-i18n";
import TaskLimitModal from "~/components/modals/TaskLimitModal.vue";
const {uuid, createTask, startTask, taskProgress, status, task} = useTask();

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
const { public: { TASK_SIZE_LIMIT } } = useRuntimeConfig();
const { t } = useI18n();
const modal = useModal();
const { setInputFiles, uploadFile, files, setFileStatus, createFile, addCreatedFile } = useUploader()
const isShowProgress = ref(false);
const isCreatingTask = ref(false);
const fileInput = ref(null);
const totalUploadedSize = ref(0);

const onSelectFile = async () => {
    setInputFiles(Array.from(fileInput.value.files));
    fileInput.value.value = null;
}

const uploadFiles = () => {
    let hasError = false;

    filesToUpload.value.forEach(file => {
        if (limitLeft.value >= file.size) {
            useLimitSize(file.size);
            createAndUploadFile(file);
        }
        else {
            hasError = true;
            setFileStatus(file.hash, FILE_STATUS.ERROR, t('error.file.limit'));
        }
    })

    if (hasError) {
        openModal()
    }
}

const createAndUploadFile = async (file) => {
    file.status = FILE_STATUS.PREPARE
    createFile({
        task: uuid.value,
        size: file.size,
        extension: file.extension,
        filename: file.filename,
    })
        .then((hash) => {
            addCreatedFile(hash, file.index);
            uploadFile(file.file, hash, uuid.value, props.chunkSize, props.maxRetries);
        })
        .catch(e => {
            file.status = FILE_STATUS.ERROR
            file.message = e.message
        })
}

function openModal() {
    modal.open(TaskLimitModal)
}

const sendData = computed(() => {
    return {
        task: uuid.value,
        type: props.type,
        payload: {
            files: getFilesForPayload()
        }
    }
})

const getFilesForPayload = () => {
    let filesFiltered = files.value.filter(file => {
        return file.status !== FILE_STATUS.DELETE
    })

    return filesFiltered.map(file => {
        return {
            hash: file.hash,
            status: file.status,
            filename: file.filename,
            params: file.params,
        }
    })
}

const send = () => {
    startTask(sendData.value);
}

const filesToUpload = computed(() => {
    return files.value.filter(file => file.status === FILE_STATUS.ADD);
});

const useLimitSize = (size) => {
    totalUploadedSize.value += size;
}

const limit = computed(() => {
    return (TASK_SIZE_LIMIT || 100) * 1024 * 1024;
});

const limitLeft = computed(() => {
    return limit.value - totalUploadedSize.value;
});

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
        await createTask(props.type);
        isCreatingTask.value = false;
        totalUploadedSize[uuid.value] = 0;
    }

    if (uuid.value) {
        uploadFiles();
    }
})

onBeforeMount(() => {
    if (uuid.value) {
        files.value.forEach(file => {
            useLimitSize(file.size)
        })
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