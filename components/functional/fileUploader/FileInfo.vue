<script setup lang="ts">
import type { UploadFile } from "~/types/UploadFile";
import { FILE_STATUS } from "~/utils/constants"
import { useI18n } from 'vue-i18n';
import FormatSelect from "~/components/ui/FormatSelect.vue";
const { t } = useI18n();

interface Props {
    data: UploadFile;
    multiple: Boolean;
    format: string[];
}

const props = defineProps({
    modelValue: Object as PropType<UploadFile>,
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

const image = ref(props.modelValue?.path?.src);
const icon = ref('file');
const isShowProgress = ref(false);
const toFormat = ref(props.format);

const emits = defineEmits(['update:modelValue', 'delete', 'selectFormat']);

const file = computed(() => {
    return props.modelValue?.file;
})

const result = computed(() => {
    return props.modelValue?.result;
})

const status = computed(() => {
    return props.modelValue.status;
})

const filename = computed(() => {
    return file.value ? file.value.name : props.modelValue.filename;
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
                color: 'primary',
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
        case FILE_STATUS.COMPLETED:
            return {
                color: 'primary',
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
    return props.modelValue.progress.toFixed(0);
})

const size = computed(() => {
    if (file.value) {
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(file.value.size) / Math.log(k));
        return parseFloat((file.value.size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    return ''
})

const removeFile = () => {
    emits('delete');
}

onMounted(() => {
    if (file.value && file.value.type.includes('image/')) {
        const reader = new FileReader();

        reader.onload = (e) => {
            image.value = e.target.result;
        };

        reader.readAsDataURL(file.value);
    }
})

watchEffect(() => {
    if (status.value === FILE_STATUS.LOADING) {
        isShowProgress.value = true;
    }
    else {
        setTimeout(() => {
            isShowProgress.value = false;
        }, 1000)
    }
})

watch(toFormat, newValue => {
    if (!props.multiple) {
       // isOpenModal.value = false;
        //emits('selectFormat', {hash: props.data.hash, format: newValue})
        //emits('update:modelValue', selected)
    }
})

const progressClass = {
    progress: {
        rounded: 'rounded-none [&::-webkit-progress-value]:rounded-none [&::-moz-progress-bar]:rounded-none [&::-webkit-progress-bar]:rounded-none',
        indeterminate: {
            rounded: 'rounded-none indeterminate:after:rounded-none [&:indeterminate::-webkit-progress-value]:rounded-none [&:indeterminate::-moz-progress-bar]:rounded-none',
        },
        bar: 'rounded-none [&::-webkit-progress-value]:rounded-none [&::-moz-progress-bar]:rounded-none [&::-webkit-progress-value]:transition-all [&::-webkit-progress-value]:ease-in-out [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-bar]:dark:bg-transparent [@supports(selector(&::-moz-progress-bar))]:bg-transparent [@supports(selector(&::-moz-progress-bar))]:dark:bg-transparent'
    }
}

</script>

<template>
    <div class="rounded-sm border p-2 shadow-base relative overflow-hidden">
        <div class="flex items-center gap-5">
            <div class="w-[50px] h-[50px] relative">
                <img class="w-[50px] h-[50px] object-contain object-center" v-if="image" :src="image" alt="">
                <div v-if="isShowProgress || status === FILE_STATUS.DELETE" class="w-full h-full absolute inset-0 flex items-center justify-center bg-opacity-80 bg-gray-50">
                    <UIcon loading name="svg-spinners:ring-resize" class="w-4 h-4 text-blue-500" />
                </div>
            </div>
            <div class="w-1/3">{{ filename }}</div>
            <div v-if="!hiddenFormats" class="w-28">
                <div v-if="isUploaded">
                    <FormatSelect v-model="modelValue.convert" :label="t('in')"/>
                </div>
            </div>
            <div class="w-1/4">
                <UBadge
                    size="sm"
                    class="min-w-[100px] justify-center"
                    :color="statusMessage.color"
                    variant="outline"
                    :ui="{ rounded: 'rounded-none' }"
                    :label="statusMessage.text"
                    :trailing="false"
                />
            </div>
            <div class="w-28 ml-auto">
                <UBadge color="white" variant="solid">
                    <span class="whitespace-nowrap">
                        <span v-if="modelValue?.extension">
                            {{ modelValue.extension.toUpperCase() }} /
                        </span>
                        {{size}}
                    </span>
                </UBadge>
            </div>
            <div class="w-8">
                <UButton
                    v-if="isUploaded"
                    icon="heroicons-outline:x-circle"
                    color="red"
                    @click="removeFile"
                    :disabled="status === FILE_STATUS.DELETE"
                />
            </div>
        </div>
        <div v-if="isShowProgress" class="absolute bottom-0 left-0 w-full">
            <UProgress size="xs" :ui="progressClass" :value="progress" />
        </div>
    </div>
</template>

<style scoped>

</style>