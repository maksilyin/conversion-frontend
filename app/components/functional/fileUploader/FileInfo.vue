<script setup lang="ts">
import type { UploadFile } from "~/types/UploadFile";
import { FILE_STATUS } from "~/utils/constants"
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { formatSize } from "~/utils/functions";
import {useMimeTypes} from "~/composables/useMimeTypes";
import FileIcon from "~/components/ui/FileIcon.vue";
import StatusBadge from "~/components/functional/fileUploader/StatusBadge.vue";
import ProgressBar from "~/components/functional/fileUploader/ProgressBar.vue";

interface Props {
    data: UploadFile;
    multiple: Boolean;
    format: string[];
}

const props = defineProps({
    file: {
       required: true,
       type: Object as PropType<UploadFile>
    },
    multiple: {
        type: Boolean,
        default: false,
    },
    format: {
        type: Array,
        default: () => [],
    },
    hiddenFormats: {
        type: Boolean,
        default: false,
    }
});

const indexResult = 0;
const { fileIcon } = useMimeTypes(props.file.mimetype);
const { getExtensionByMimeType, getFileFormat } = useFormats();
const { uuid } = useTask();
const { getImagePath } = imagePath();
const image = ref<null | string>(null);
const icon = ref('file');
const isShowProgress = ref(false);

const emits = defineEmits(['update:modelValue', 'delete', 'selectFormat', 'download']);

const result = computed(() => {
    return props.file.result ? props.file.result[indexResult] : null;
})

const status = computed(() => {
    return props.file.status;
})

const filename = computed(() => {
    return props.file.filename;
})

const extension = computed(() => {
    return props.file?.extension ? props.file.extension : getExtensionByMimeType(props.file.mimetype);
});

const color = computed(() => {
    return extension.value ? getFileFormat(extension.value)?.color : null;
});

const isUploaded = computed(() => {
    return status.value === FILE_STATUS.UPLOADED;
})

const progress = computed(() => {
    return props.file.progress.toFixed(0);
})

const size = computed(() => {
    return formatSize(props.file.size);
})

const errorMessage = computed(() => {
    return result.value?.error || props.file.message;
})

const removeFile = () => {
    emits('delete');
}

const downloadFile = () => {
    emits('download');
}

const setImage = () => {
    if (props.file?.file && props.file.file.type.includes('image/')) {
        const reader = new FileReader();

        reader.onload = (e:any) => {
            image.value = e.target.result;
        };

        reader.readAsDataURL(props.file.file);
    }
    else if (props.file?.mimetype && props.file?.mimetype.includes('image/') && props.file?.externalPath) {
         image.value = props.file.externalPath;
    }
    else if (props.file?.mimetype && props.file?.mimetype.includes('image/') && uuid.value) {
        image.value = getImagePath(uuid.value, props.file.hash)['src']
    }
}

onMounted(() => {
  //  setImage();
})

watchEffect(() => {
    if (status.value <= FILE_STATUS.LOADING || status.value === FILE_STATUS.DELETE) {
        isShowProgress.value = true;
    }
    else {
        setTimeout(() => {
            isShowProgress.value = false;
        }, 1000)
    }

    if (status.value >= FILE_STATUS.CREATED && !image.value) {
        setImage();
    }
})

const progressClass = computed(() => {
    let color = 'blue';

    if (status.value === FILE_STATUS.DELETE) {
        color = 'red';
    }

    return {
        progress: {
            bar: `!text-${color}-400`,
        }
    }
})

</script>

<template>
    <div class="bg-white shadow-black-300/30 shadow-ring-5 rounded-md p-2 pr-3 relative overflow-hidden">
        <div class="mb-2 flex xs:hidden items-center flex-wrap">
            <span class="truncate text-ellipsis overflow-hidden max-w-[50%] block text-xs mr-auto" :title="filename">{{ filename }}</span>
            <div class="text-gray-500 text-xs flex items-center gap-3">
                <span class="text-nowrap">
                    <span v-if="extension">
                        {{ extension.toUpperCase() }} /
                    </span>
                    <span>
                        {{ size }}
                    </span>
                </span>
            </div>
        </div>
        <div class="flex items-center gap-5">
            <div class="w-[60px] h-[60px] flex-shrink-0 relative hidden md:block">
                <img class="w-full h-full object-cover object-center" v-if="image" :src="image" alt="">
                <FileIcon
                    v-else-if="extension"
                    class="w-full h-full"
                    :label="extension.toUpperCase()"
                    :color="color || ''"
                />
                <div v-if="isShowProgress || status === FILE_STATUS.DELETE" class="w-full h-full absolute inset-0 flex items-center justify-center bg-opacity-80 bg-gray-50">
                    <UIcon loading name="svg-spinners:ring-resize" class="w-4 h-4 text-blue-500" />
                </div>
            </div>
            <div class="w-1/3 flex-shrink-0 hidden xs:block">
                <span class="truncate text-xs sm:text-md text-ellipsis overflow-hidden w-full block" :title="filename">{{ filename }}</span>
                <div class="w-full pt-1">
                    <ProgressBar :class="{'opacity-50': !isShowProgress}" :file="file"/>
                    <div class="text-gray-500 text-xs flex items-center justify-between gap-2 pt-1">
                        <span>
                            {{ progress }}%
                        </span>
                        <span>
                            {{ size }}
                        </span>
                    </div>
                </div>
            </div>
            <div v-if="!hiddenFormats" class="mx-auto w-[100px] flex-shrink-0">
                <div v-if="status >= FILE_STATUS.UPLOADED">
                    <slot></slot>
                </div>
            </div>
            <div class="w-[124px]">
                <div class="flex items-center gap-2">
                    <StatusBadge class="min-w-[100px] justify-center" :status="status"/>
                    <UPopover v-if="errorMessage" mode="hover" :resize="true" :popper="{ placement: 'top', arrow: false }">
                        <template #panel>
                            <p class="text-red-500 py-1 px-2 text-xs max-w-[200px]">{{ errorMessage }}</p>
                        </template>
                        <UIcon name="rivet-icons:info-circle" class="text-red-500"/>
                    </UPopover>
                </div>
            </div>
            <div class="w-28 ml-auto hidden md:block">
                <span class="whitespace-nowrap font-medium text-xs">
                    <span v-if="extension">
                        {{ extension.toUpperCase() }} /
                    </span>
                    {{size}}
                </span>
            </div>
            <div class="w-8">
                <UTooltip v-if="isUploaded" :text="$t('delete')" openDelay="1000" :popper="{ placement: 'top', arrow: true }">
                    <UButton
                        class="text-xs"
                        icon="heroicons-outline:x-circle"
                        color="red"
                        @click="removeFile"
                        :disabled="status === FILE_STATUS.DELETE"
                    />
                </UTooltip>
                <UTooltip v-if="status === FILE_STATUS.COMPLETED" :text="$t('download')" openDelay="1000" :popper="{ placement: 'top', arrow: true }">
                    <UButton
                        icon="material-symbols:download"
                        color="blue"
                        @click="downloadFile"
                    />
                </UTooltip>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>