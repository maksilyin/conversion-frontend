<script setup lang="ts">
import FileUploader from "~/components/functional/fileUploader/FileUploader.vue";
import FormatSelect from "~/components/ui/FormatSelect.vue";
import FileInfo from "~/components/functional/fileUploader/FileInfo.vue";
import {useI18n} from "vue-i18n";
const { files, deleteFile, downloadResult, addParam, setFromPayload } = useUploader();
const { uuid, createTask, payload, loadTask } = useTask();
const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const taskId = Array.isArray(route.params.task) ? route.params.task[0] : route.params.task;
await loadTask(taskId);

if (payload.value?.files) {
    setFromPayload(payload.value.files);
}

const allConvert = ref(['JPEG']);
const params = {
    convert: ['JPEG']
}

const redirectTask = (e: string) => {
    if (uuid.value) {
        router.replace(`/t/${uuid.value}`);
    }
}

watch(allConvert, newValue => {
    files.value.forEach(file => {
        addParam(file.hash, 'convert', newValue);
    })
})

watch(payload, (newValue: Record<string, any>) => {
    setFromPayload(newValue.files);
})

</script>

<template>
    <UContainer class="max-w-[991px]">
        <FileUploader @create="createTask" @startTask="redirectTask" type="convert" :params="params">
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
    </UContainer>
</template>

<style scoped>

</style>