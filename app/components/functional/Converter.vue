<script setup lang="ts">
import FileUploader from "~/components/functional/fileUploader/FileUploader.vue";
import FormatSelect from "~/components/ui/FormatSelect";
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

const { files, addParam, setFromPayload, setDefaultFileParams, unmount } = useUploader();
const { uuid, payload, status, deleteTask, isDeleted } = useTask();
const { getFirstSiblingsFormat } = useFormats();
const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const allConvert = ref(props.convertFormat !== '' ? [props.convertFormat] : []);
const params = {
    convert: props.convertFormat !== '' ? [props.convertFormat] : []
}
const { public: { CHUNK_SIZE } } = useRuntimeConfig();
const localePath = useLocalePath()
const { isSomeProcessing } = useProcessing();

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

const setFileParams = () => {
    files.value.forEach(file => {
        if (!file.params) {
            file.params = Object.assign({}, params);
        }
        if (file.status === FILE_STATUS.UPLOADED && file.extension && 'convert' in file.params && !file.params.convert?.length) {
            const firstFormat = getFirstSiblingsFormat(file.extension);

            if (firstFormat) {
                file.params.convert = [firstFormat]
            }
        }
    })
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

watch(
    () => files.value.map(f => f.status),
    () => {
        setFileParams()
    }
);

watch(isDeleted, (newValue: boolean) => {
    if (newValue) {
        redirectToMain();
    }
})

onMounted(() => {
    setFileParams();
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
                                size="md"
                                icon="clarity:add-line"
                                class="text-sm min-w-[200px] py-2 px-4 h-10 md:pr-4 justify-center relative bg-blue-dark-100 transition duration-500 rounded-md hover:bg-blue-dark rounded-br-none rounded-tr-none"
                                :disabled="isSomeProcessing"
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
            <UContainer class="py-14 md:pb-20">
                <RoundedBlock :shadow="true" class="w-full dashed !bg-gray-50 relative">
                    <div class="h-[296px] flex flex-col items-center justify-center w-full relative z-1">
                        <USkeleton class="w-[80px] h-[80px] rounded-full" />
                        <div class="mt-5 sm:mb-5 text-center flex flex-col items-center relative">
                            <USkeleton class="w-[257px] sm:w-[343px] h-[24px] mb-[8px]" />
                            <USkeleton class="w-[237px] sm:w-[320px] h-[24px]" />
                        </div>
                        <div class="flex gap-2 flex-col md:flex-row pt-5">
                            <USkeleton class="w-[256px] sm:w-[296px] h-[56px] rounded-md" />
                            <USkeleton class="w-[56px] h-[56px] rounded-md hidden md:block" />
                            <USkeleton class="w-[56px] h-[56px] rounded-md hidden md:block" />
                        </div>
                        <USkeleton class="w-[336px] sm:w-[340px] h-[16px] mt-5 sm:mt-0" />
                        <UIcon name="svg-spinners:bars-scale-fade" class="w-10 h-10 absolute opacity-70 inset-1/2 translate-x-[-50%] translate-y-[-50%]" />
                    </div>
                </RoundedBlock>
            </UContainer>
        </template>
    </ClientOnly>
    <UNotifications />
</template>

<style scoped>
</style>