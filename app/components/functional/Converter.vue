<script setup lang="ts">
import FileUploader from "~/components/functional/fileUploader/FileUploader.vue";
import FormatSelect from "~/components/ui/FormatSelect.vue";
import FileInfo from "~/components/functional/fileUploader/FileInfo.vue";
import {useI18n} from "vue-i18n";
import UploadFileButton from "~/components/ui/UploadFileButton.vue";

const props = defineProps({
    convertFormat: {
        type: String,
        default: '',
    }
});

const { files, deleteFile, downloadResult, addParam, setFromPayload, setDefaultFileParams, unmount } = useUploader();
const { uuid, payload, status, deleteTask, isProcessing } = useTask();
const { t } = useI18n();
const router = useRouter();
const allConvert = ref(props.convertFormat !== '' ? [props.convertFormat] : []);
const params = {
    convert: props.convertFormat !== '' ? [props.convertFormat] : []
}
const { public: { CHUNK_SIZE } } = useRuntimeConfig();

setDefaultFileParams(params);

watch(allConvert, newValue => {
    files.value.forEach(file => {
        if (file.status === FILE_STATUS.UPLOADED) {
            addParam(file.hash, 'convert', newValue);
        }
    })
    if (!newValue.length) {
        params.convert = props.convertFormat !== '' ? [props.convertFormat] : []
    }
    else {
        params.convert = newValue;
    }
    setDefaultFileParams(params);
})

watch(payload, (newValue: Record<string, any>) => {
    setFromPayload(newValue.files);
})

watch(status, (newValue) => {
    if (newValue === TASK_STATUS.PENDING && uuid.value) {
        window.history.replaceState(null, '', `/t/${uuid.value}`);
    }
})

onBeforeRouteLeave(() => {
    unmount();
    deleteTask();
});

</script>

<template>
    <FileUploader type="convert" :params="params" :chunkSize="parseInt(CHUNK_SIZE)">
        <template #files>
            <div v-if="status !== TASK_STATUS.LOCK && status !== TASK_STATUS.CLEAR" class="md:hidden pb-2">
                <UploadFileButton :hide-choosers="true" size="small">
                    <label for="input-file">
                        <UButton
                            @click.stop
                            size="xl"
                            icon="clarity:add-line"
                            class="text-md py-2 px-4 h-10 md:pr-4 justify-center relative bg-blue-dark-100 transition duration-500 rounded-md hover:bg-blue-dark rounded-br-none rounded-tr-none"
                            :disabled="isProcessing"
                        >
                            {{$t('add_more_files')}}
                            <label for="input-file" class="absolute w-full h-full inset-0 cursor-pointer"></label>
                        </UButton>
                    </label>
                </UploadFileButton>
            </div>
            <div class="flex flex-col gap-2 min-h-[200px] md:min-h-[350px] relative">
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
            </div>
        </template>
        <template #compact>
            <FormatSelect v-model="allConvert" :label="t('convert_all')"/>
        </template>
    </FileUploader>
    <UNotifications />
</template>

<style scoped>

</style>