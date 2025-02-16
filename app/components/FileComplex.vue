<script setup lang="ts">

import FileUploader from "~/components/functional/fileUploader/FileUploader.vue";
import FileInfo from "~/components/functional/fileUploader/FileInfo.vue";
import FileInputCompact from "~/components/functional/fileUploader/FileInputCompact.vue";
import FormatSelect from "~/components/ui/FormatSelect.vue";
import FileInput from "~/components/functional/fileUploader/FileInput.vue";
</script>

<template>
    <FileUploader chunkSize="26214">
        <template #compact>

        </template>
    </FileUploader>

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