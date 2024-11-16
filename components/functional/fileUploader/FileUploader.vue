<script setup>
import FileInfo from "./FileInfo";
import FileInput from "./FileInput";
import FileInputCompact from "~/components/functional/fileUploader/FileInputCompact";
import {v4 as uuidv4} from 'uuid';
import { FILE_STATUS } from "~/utils/constants"
import FormatSelect from "~/components/ui/FormatSelect.vue";

const api = useApi();
const uuid = ref(null);

const props = defineProps({
    task: {
        type: Object,
        default: null,
    },
    chunkSize: {
        type: Number,
        default: (1024 * 1024)
    },
    maxRetries: {
        type: Number,
        default: 3
    }
})

const files = reactive({});
const fileInput = ref(null);
const emits = defineEmits(['uploads']);
const isLoading = ref(false);
const allConvert = ref([]);
const { getImagePath } = imagePath();

const onSelectFile = () => {
    if (!uuid.value) {
        setUuid();
    }
    setFiles();
    uploadFiles();

    emits('change', files);
}

const setFiles = () => {
    Array.from(fileInput.value.files).forEach(file => {
        const hash = uuidv4();
        files[hash] = {
            file,
            hash,
            progress: 0,
            status: FILE_STATUS.CREATED,
            convert: allConvert.value
        }
    });

    fileInput.value.value = null;
}

const uploadFiles = () => {
    if (uuid.value) {
        for (let hash in files) {
            const file = files[hash];

            if (file.status === FILE_STATUS.CREATED) {
                uploadFile(file.file, hash);
            }
        }
    }
}

const uploadFile = async (file, hash) => {
    const totalChunks = Math.ceil(file.size / props.chunkSize);
    let chunkIndex = 1;
    let retries = 0;
    fileSetStatus(hash, FILE_STATUS.LOADING);
    const uploadNext = async (hash = null) => {
        const start = (chunkIndex - 1) * props.chunkSize;
        const end = Math.min(file.size, start + props.chunkSize);
        const chunk = file.slice(start, end);
        const formData = new FormData();
        formData.append('file', chunk, file.name);
        formData.append('index', chunkIndex);
        formData.append('total', totalChunks);
        formData.append('task', uuid.value);
        formData.append('hash', hash);
        formData.append('filename', file.name);

        try {
            const res = await api.callApi('file.upload', formData);

            if (res.status && totalChunks > chunkIndex) {

                const progress = chunkIndex / totalChunks * 100;
                setFileProgress(hash, progress)

                chunkIndex++;
                await uploadNext(res.hash);
            }
            else if (res.status) {
                setFileProgress(hash, 100)
                files[hash].extension = res.result.extension;
                files[hash].mimetype = res.result.mimetype;
                fileSetStatus(hash, FILE_STATUS.UPLOADED);
            }
        }
        catch (e) {
            retries++;

            if (e.status >= 500 && retries < props.maxRetries) {
                await uploadNext(hash);
            }
            else {
                fileSetStatus(hash, FILE_STATUS.ERROR, 'Upload failed');
                console.error(e);
            }
        }
    };
    await uploadNext(hash);
}

const fileSetStatus = (hash, status, message = null) => {
    if (hash in files) {
        files[hash].status = status;
        files[hash].message = message;
    }
}

const setFileProgress = (hash, value) => {
    if (hash in files) {
        files[hash].progress = value;
    }
}

const setUuid = async () => {
    isLoading.value = true;
    uuid.value = await api.callApi('task.create');
    isLoading.value = false;
}

const deleteFileHandler = async (hash) => {
    if (hash in files) {
        fileSetStatus(hash, FILE_STATUS.DELETE)
        const file = files[hash];

        try {
            await api.callApi('file.delete', {
                hash,
                task: uuid.value,
                filename: file.file.name,
            });
            delete files[hash]
        } catch (e) {
            console.log(e)
        }
    }
}

onBeforeMount(() => {
    if (props.task) {
        uuid.value = props.task.uuid;

        if (props.task?.payload?.files) {
            props.task?.payload?.files.forEach(file => {
                files[file.hash] = {
                    hash: file.hash,
                    status: file.status,
                    progress: 0,
                    result: file.result,
                    filename: file.filename,
                    path: getImagePath(props.task.uuid, file.result.filename)
                }
            })
        }
    }
})

const setConvertFormat = (data) => {
    files[data.hash].convert = data.format;
}

const filesArray = computed(() => {
    return Object.values(files);
})

const sendData = computed(() => {
    return {
        task: uuid.value,
        type: 'convert',
        payload: {
            files: filesArray.value.map(file => ({
                hash: file.hash,
                status: file.status,
                size: file.file.size,
                extension: file.extension,
                mimetype: file.mimetype,
                filename: file.filename || file.file.name,
                convert: file.convert,
            }))
        }
    }
})

watchEffect(() => {
    if (uuid.value) {
        uploadFiles();
    }
})

watch(allConvert, newValue => {
    for (let hash in files) {
        files[hash].convert = Object.assign([], newValue)
    }
})

</script>

<template>
    {{files}}
    <div v-if="filesArray.length" class="flex flex-col gap-2 pb-10">
        <FileInfo
            v-for="file in filesArray"
            v-model="files[file.hash]"
            :key="file.hash"
            @delete="deleteFileHandler(file.hash)"
        ></FileInfo>
    </div>
    <div class="flex justify-center pb-4">
        <FormatSelect v-model="allConvert" label="Преобразовать всё в"/>
    </div>
    <FileInput v-if="!filesArray.length"/>
    <FileInputCompact :data="sendData" v-else />
    <input ref="fileInput" @change="onSelectFile" id="input-file" type="file" multiple class="hidden" />
</template>

<style scoped>

</style>