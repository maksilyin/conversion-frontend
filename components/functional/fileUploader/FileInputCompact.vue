<script setup>
import {useI18n} from "vue-i18n";
const { status, isProcessing } = useTask()
const { t } = useI18n();

const props = defineProps({
    data: {
        default: {}
    },
    for: {
        default: 'input-file'
    }
})

const { openChooser } = useFileChooser();
const emits = defineEmits(['send']);

const send = async () => {
    emits('send')
}

</script>

<template>
    <div class="sticky bottom-0 p-2 bg-white">
        <div class="flex gap-3">
            <label :for="props.for">
                <UButton icon="clarity:add-line" class="p-2 pr-4 justify-center relative" :disabled="isProcessing">
                    {{$t('add_more_files')}}
                    <label :for="props.for" class="absolute w-full h-full inset-0 cursor-pointer"></label>
                </UButton>
            </label>
            <UButton @click.stop="openChooser('dropbox')" class="w-10 p-2 justify-center" icon="ri:dropbox-fill" :disabled="isProcessing"></UButton>
            <UButton @click.stop="openChooser('google')" class="w-10 p-2 justify-center" icon="uil:google-drive" :disabled="isProcessing"></UButton>
            <div class="mx-auto">
                <slot></slot>
            </div>
            <UButton class="ml-auto" :label="t('convert')" @click="send">
                <template #trailing>
                    <UIcon v-if="isProcessing" name="svg-spinners:180-ring-with-bg" class="w-5 h-5" />
                    <UIcon v-else name="i-heroicons-arrow-right-20-solid" class="w-5 h-5" />
                </template>
            </UButton>
        </div>
    </div>
</template>

<style scoped>

</style>