<script setup lang="ts">
import FileUploader from "~/components/functional/fileUploader/FileUploader.vue";
import FormatSelect from "~/components/ui/FormatSelect.vue";
import FileInfo from "~/components/functional/fileUploader/FileInfo.vue";
import {useI18n} from "vue-i18n";
import UploadFileButton from "~/components/ui/UploadFileButton.vue";
import RoundedBlock from "~/components/ui/RoundedBlock.vue";

const props = defineProps({
    convertFormat: {
        type: String,
        default: '',
    }
});

const { files, deleteFile, downloadResult, addParam, setFromPayload, setDefaultFileParams, unmount } = useUploader();
const { uuid, payload, status, deleteTask, isProcessingTask, isDeleted, clearTask } = useTask();
const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const allConvert = ref(props.convertFormat !== '' ? [props.convertFormat] : []);
const params = {
    convert: props.convertFormat !== '' ? [props.convertFormat] : []
}
const { public: { CHUNK_SIZE } } = useRuntimeConfig();
const localePath = useLocalePath()

setDefaultFileParams(params);

const redirectToMain = () => {
    if (route.name?.toString().split('___')[0] !== 'task') {
        unmount();
        deleteTask();
        window.history.replaceState(null, '', localePath(`/`));
    }
    else {
        router.push(localePath('/'))
    }
}

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
    if (newValue?.files && Array.isArray(newValue?.files)) {
        setFromPayload(newValue.files);
    }
})

watch(status, (newValue) => {
    if (newValue === TASK_STATUS.PENDING && uuid.value) {
        window.history.replaceState(null, '', localePath(`/t/${uuid.value}`));
    }
})

watch(files, (newValue) => {
    if (status.value === TASK_STATUS.COMPLETE && !newValue.length) {
        redirectToMain();
    }
})

watch(isDeleted, (newValue: boolean) => {
    if (newValue) {
        redirectToMain();
    }
})

onBeforeRouteLeave(() => {
    unmount();
    deleteTask();
});

</script>

<template>
    <ClientOnly fallbackTag="span">
        <FileUploader :key="Date.now()" type="convert" :params="params" :chunkSize="parseInt(CHUNK_SIZE)">
            <template #files>
                <div v-if="status !== TASK_STATUS.LOCK && status !== TASK_STATUS.CLEAR" class="md:hidden pb-2">
                    <UploadFileButton :hide-choosers="true" size="small">
                        <label for="input-file">
                            <UButton
                                @click.stop
                                size="xl"
                                icon="clarity:add-line"
                                class="text-md min-w-[240px] py-2 px-4 h-10 md:pr-4 justify-center relative bg-blue-dark-100 transition duration-500 rounded-md hover:bg-blue-dark rounded-br-none rounded-tr-none"
                                :disabled="isProcessingTask"
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
                        :key="file.index"
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
        <template #fallback>
            <UContainer class="pb-20">
                <RoundedBlock :shadow="true" class="w-full dashed-gray !bg-gray-50 relative">
                    <div class="h-[340px] flex flex-col items-center justify-center w-full relative z-1">
                        <USkeleton class="w-[100px] h-[100px] rounded-full" />
                        <div class="mt-5 sm:mb-5 text-center flex flex-col items-center relative">
                            <USkeleton class="w-[343px] h-[24px] mb-[8px]" />
                            <USkeleton class="w-[320px] h-[24px]" />
                            <UIcon name="svg-spinners:bars-scale-fade" class="text-orange-main w-14 h-14 absolute 70" />
                        </div>
                        <div class="flex gap-2 flex-col md:flex-row pt-5 pb-6">
                            <USkeleton class="w-[296px] h-[56px] rounded-md" />
                            <USkeleton class="w-[56px] h-[56px] rounded-md" />
                            <USkeleton class="w-[56px] h-[56px] rounded-md" />
                        </div>
                        <USkeleton class="w-[340px] h-[16px]" />
                    </div>
                </RoundedBlock>
            </UContainer>
        </template>
    </ClientOnly>
    <UNotifications />
</template>

<style scoped>
</style>