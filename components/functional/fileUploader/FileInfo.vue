<script setup lang="ts">
import type { UploadFile } from "~/types/UploadFile";
import { FILE_STATUS } from "~/utils/constants"
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { formatSize } from "~/utils/functions";
import {useMimeTypes} from "~/composables/useMimeTypes";

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

const {fileColor, fileIcon} = useMimeTypes(props.file.mimetype);
const { formatMap, getExtensionByMimeType } = useFormats();
const { uuid } = useTask();
const { getImagePath, getStoragePath } = imagePath();
const image = ref<null | string>(null);
const icon = ref('file');
const isShowProgress = ref(false);
const toFormat = ref(props.format);
const mainColor = fileColor() || 'blue-400';

const emits = defineEmits(['update:modelValue', 'delete', 'selectFormat', 'download']);

const status = computed(() => {
    return props.file.status;
})

const filename = computed(() => {
    return props.file.filename;
})

const extension = computed(() => {
    return props.file?.extension ? props.file.extension : getExtensionByMimeType(props.file.mimetype);
});

const mainIcon = computed(() => {
    if (extension.value && extension.value in formatMap.value) {
        const icon = formatMap.value[extension.value].icon;

        if (icon && icon !== '') {
            return icon;
        }
    }

    return 'flowbite:file-lines-outline'
})

const statusMessage = computed(() => {
    switch (status.value) {
        case FILE_STATUS.LOADING:
            return {
                color: 'blue',
                text: t('status.loading') + ' ' + progress.value + '%'
            }
        case FILE_STATUS.UPLOADED:
            return {
                color: 'blue',
                text: t('status.uploaded')
            }
        case FILE_STATUS.ERROR:
            return {
                color: 'red',
                text: t('status.error')
            }
        case FILE_STATUS.DELETE:
            return {
                color: 'red',
                text: t('status.delete')
            }
        case FILE_STATUS.PROCESSING:
            return {
                color: 'purple',
                text: t('status.processing')
            }
        case FILE_STATUS.COMPLETED:
            return {
                color: 'green',
                text: t('status.completed')
            }
        default:
            return {
                color: 'blue',
                text: t('status.created')
            }
    }
})

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
    return props.file.result?.error || props.file.message;
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
        image.value = getImagePath(uuid.value, `${props.file.hash}_${props.file.filename}`)['src']
    }
    else if (props.file?.extension && props.file.extension in formatMap.value) {
        const imageIcon = formatMap.value[props.file.extension].icon_image;

        if (imageIcon !== '') {
            image.value = getStoragePath(imageIcon).src;
        }
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

const progressClass = {
    progress: {
        bar: `!text-blue-400`,
    }
}

</script>

<template>
    <div class="rounded-lg border border-gray-300 p-2 shadow-base relative overflow-hidden">
        <div class="flex items-center gap-5">
            <div class="w-[60px] h-[60px] flex-shrink-0 relative">
                <img class="w-full h-full object-cover object-center" v-if="image" :src="image" alt="">
                <UIcon v-else :name="mainIcon" class="w-full h-full"/>
                <div v-if="isShowProgress || status === FILE_STATUS.DELETE" class="w-full h-full absolute inset-0 flex items-center justify-center bg-opacity-80 bg-gray-50">
                    <UIcon loading name="svg-spinners:ring-resize" class="w-4 h-4 text-blue-500" />
                </div>
            </div>
            <div class="w-1/3 flex-shrink-0">
                <span class="truncate text-ellipsis overflow-hidden w-full block" :title="filename">{{ filename }}</span>
                <div class="w-full pt-1">
                    <UProgress size="md" :class="{'opacity-50': !isShowProgress}" :ui="progressClass" :value="parseInt(progress)" />
                    <div class="text-gray-500 text-xs flex items-center gap-2 pt-1">
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
                    <UBadge
                        size="sm"
                        class="min-w-[100px] justify-center"
                        :color="statusMessage.color"
                        variant="subtle"
                        :ui="{ rounded: 'rounded' }"
                        :label="statusMessage.text"
                        :trailing="false"
                    />
                    <UTooltip v-if="errorMessage" :text="errorMessage" strategy="absolute" :resize="true" :popper="{ placement: 'top' }">
                        <UIcon name="rivet-icons:info-circle" class="text-red-500"/>
                    </UTooltip>
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
                <UButton
                    v-if="isUploaded"
                    class="text-xs"
                    icon="heroicons-outline:x-circle"
                    color="red"
                    @click="removeFile"
                    :disabled="status === FILE_STATUS.DELETE"
                />
                <UButton
                    v-if="status === FILE_STATUS.COMPLETED"
                    icon="material-symbols:download"
                    color="blue"
                    @click="downloadFile"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>