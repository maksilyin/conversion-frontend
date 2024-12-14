<script setup lang="ts">
import FileUploader from "~/components/functional/fileUploader/FileUploader.vue";
import FormatSelect from "~/components/ui/FormatSelect.vue";
import FileInfo from "~/components/functional/fileUploader/FileInfo.vue";
import {useI18n} from "vue-i18n";

const props = defineProps({
    convertFormat: {
        type: String,
        default: '',
    }
});

const { files, deleteFile, downloadResult, addParam, setFromPayload, setDefaultFileParams, unmount } = useUploader();
const { uuid, payload, status, deleteTask } = useTask();
const { t } = useI18n();
const router = useRouter();
const allConvert = ref(props.convertFormat !== '' ? [props.convertFormat] : []);
const params = {
    convert: props.convertFormat !== '' ? [props.convertFormat] : []
}

setDefaultFileParams(params);

watch(allConvert, newValue => {
    files.value.forEach(file => {
        addParam(file.hash, 'convert', newValue);
    })
})

watch(payload, (newValue: Record<string, any>) => {
    setFromPayload(newValue.files);
})

watch(status, (newValue) => {
    if (newValue === 'pending' && uuid.value) {
        window.history.replaceState(null, '', `/t/${uuid.value}`);
    }
})

onBeforeRouteLeave(() => {
    unmount();
    deleteTask();
});

</script>

<template>
    <FileUploader type="convert" :params="params">
        <template #files>
            <FileInfo
                v-for="file in files"
                :file="file"
                :key="file.hash"
                @delete="deleteFile(file.hash, uuid)"
                @download="downloadResult(file.hash, uuid)"
            >
                <FormatSelect
                    :label="t('in')"
                    :extension="file?.extension?.toLowerCase()"
                    v-model="file.params.convert"
                    :hidden-select="file.status > FILE_STATUS.UPLOADED"
                />
            </FileInfo>
        </template>
        <template #compact>
            <FormatSelect v-model="allConvert" :label="t('convert_all')"/>
        </template>
    </FileUploader>
    <UNotifications />
</template>

<style scoped>

</style>