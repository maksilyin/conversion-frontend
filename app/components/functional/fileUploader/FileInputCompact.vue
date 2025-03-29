<script setup>
import {useI18n} from "vue-i18n";
import UploadFileButton from "~/components/ui/UploadFileButton.vue";
const { downloadZip, files } = useUploader()
const { uuid, status, clearTask } = useTask()
const {
    isSomeProcessing,
    isProcessingTask,
    isDownloadZipLoading
} = useProcessing();
const { t } = useI18n();
import {FILE_STATUS, TASK_STATUS} from "~/utils/constants"
import DownloadAllButton from "~/components/ui/DownloadAllButton.vue";
import {useMediaQuery} from "@vueuse/core";

const props = defineProps({
    data: {
        default: {}
    },
    for: {
        default: 'input-file'
    },
    isDisabled: {
        type: Boolean,
        default: false,
    }
})
const isMobile = useMediaQuery('(max-width: 640px)')
const isAllCompleted = computed(() => {
    let completed = false;
    let uploaded = false;

    files.value.forEach(file => {
        if (file.status === FILE_STATUS.COMPLETED) {
            completed = true;
        }
        else if (file.status === FILE_STATUS.UPLOADED) {
            uploaded = true;
        }
    })

    return completed && !uploaded;
})

const emits = defineEmits(['send']);

const send = async () => {
    emits('send')
}

</script>

<template>
    <div class="bg-white">
        <div class="flex gap-3 sm:gap-2 sm:px-6 lg:px-0 flex-col sm:flex-row items-center">
            <UploadFileButton
                v-if="status !== TASK_STATUS.LOCK && status !== TASK_STATUS.CLEAR"
                class="hidden md:flex"
                size="small"
            >
                <label :for="props.for">
                    <UButton
                        @click.stop
                        icon="clarity:add-line"
                        class="text-md py-2 px-4 whitespace-nowrap h-10 md:pr-4 justify-center relative bg-blue-dark-100 transition duration-500 rounded-md hover:bg-blue-dark rounded-br-none rounded-tr-none"
                        :disabled="isSomeProcessing"
                    >
                        {{$t('add_more_files')}}
                        <label :for="props.for" class="absolute w-full h-full inset-0 cursor-pointer"></label>
                    </UButton>
                </label>
            </UploadFileButton>
            <div v-if="!isMobile || status !== TASK_STATUS.COMPLETE || !isAllCompleted"
                 class="mx-auto pt-3 sm:pt-0"
            >
                <slot></slot>
            </div>
            <DownloadAllButton
                class="ml-auto"
                v-if="status === TASK_STATUS.COMPLETE && isAllCompleted"
                :is-processing-task="isProcessingTask"
                :is-processing-zip="isDownloadZipLoading"
                :download-zip-handler="() => { downloadZip(uuid) }"
                :remove-handler="() => { clearTask() }"
            />
            <UButton
                v-else
                class="text-md justify-center h-12 bg-blue-dark-100 transition duration-500 rounded-none sm:rounded-md hover:bg-blue-dark ml-auto px-6 w-full sm:w-auto"
                @click="send"
                :disabled="isSomeProcessing || isDisabled"
            >
                <span class="inline-block py-3 md:py-0">
                    {{$t('convert')}}
                </span>
                <template #trailing>
                    <UIcon v-if="isProcessingTask" name="svg-spinners:180-ring-with-bg" class="w-5 h-5" />
                    <UIcon v-else name="i-heroicons-arrow-right-20-solid" class="w-5 h-5" />
                </template>
            </UButton>
        </div>
    </div>
</template>

<style scoped>

</style>