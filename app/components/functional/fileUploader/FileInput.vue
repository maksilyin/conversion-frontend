<script setup>
import iconUpload from "~/assets/icons/upload.svg"
import IButton from "~/components/ui/IButton.vue";
import documentIcon from "~/assets/icons/download_file_document.svg";
import {useI18n} from "vue-i18n";
import UploadFileButton from "~/components/ui/UploadFileButton.vue";
import RoundedBlock from "~/components/ui/RoundedBlock.vue";
const { t } = useI18n();

const props = defineProps({
    for: {
        default: 'input-file'
    },
    maxSize: {
        type: Number,
        default: 100 * 1024 * 1024
    }
})
const labelInput = ref(null);
const isDragging = ref(false);
let dragLeaveTimeout = null;
const handleDragOver = () => {
    clearTimeout(dragLeaveTimeout);
    isDragging.value = true;
};

const handleDragLeave = () => {
    dragLeaveTimeout = setTimeout(() => {
        isDragging.value = false;
    }, 50);
};
const handleDrop = (event) => {
    isDragging.value = false;
    const files = Array.from(event.dataTransfer.files);
    handleFiles(files);
}
const handleFileInput = (event) => {
    const files = Array.from(event.target.files);
    handleFiles(files);
}
const handleFiles = (files) => {
    const input = document.getElementById(props.for);

    if (input) {
        const dataTransfer = new DataTransfer();
        files.forEach((file) => dataTransfer.items.add(file));
        input.files = dataTransfer.files;

        const event = new Event('change', { bubbles: true });
        input.dispatchEvent(event);
    }
}
</script>

<template>
    <div class="relative">
        <!--
        <div class="absolute bottom-[210px] inset-x-0 w-2/3 h-1/3 -z-[1] rounded-full bg-primary-100 dark:bg-white/20 mx-auto blur-[80px]"></div>
        -->
        <UContainer class="pb-20">
            <div class="">
                <div
                    class="h-full flex items-center justify-center w-full border-primary-200 transition"
                >
                    <RoundedBlock :shadow="true" class="w-full dashed" @click="labelInput.click()">
                        <div class="group flex flex-col items-center justify-center w-full">
                            <!--<img class="h-[60px] md:w-[150px] md:h-[83px]" :src="iconUpload" alt="">-->
                            <Icon name="tabler:cloud-upload" class="w-[100px] h-[100px] text-gray-500 opacity-70"/>
                            <div class="mt-5 sm:mb-5 text-lg md:text-2xl text-center">
                                    <span class="font-bold text-black">
                                        {{$t('drug_drop')}} <span class="text-orange-main">{{$t('images')}}</span>, <br>
                                        <span class="text-orange-main">{{$t('video')}}</span>{{$t('or_any')}} <span class="text-orange-main">{{$t('files')}}</span>
                                    </span>
                            </div>
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <div class="lg:flex gap-2">
                                    <UploadFileButton>
                                        <IButton
                                            @click.stop
                                            size="xl"
                                            icon="line-md:upload"
                                            class="text-md sm:text-xl font-medium py-3 px-2 sm:px-5 h-14 md:pr-4 justify-center relative rounded-br-none rounded-tr-none"
                                        >
                                            {{ $t('choose_files') }}
                                            <label ref="labelInput" :for="props.for" class="absolute w-full h-full inset-0 cursor-pointer"></label>
                                        </IButton>
                                    </UploadFileButton>
                                </div>
                                <p class="text-xs mt-5 text-center text-gray-500 dark:text-gray-400">
                                    {{ $t('drop_max_size') }}
                                </p>
                            </div>
                        </div>
                    </RoundedBlock>
                </div>
            </div>
        </UContainer>
    </div>
</template>

<style scoped>
    .dashed {
        background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='30' ry='30' stroke='%230C65AF' stroke-width='4' stroke-dasharray='9' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
        border-radius: 30px;
    }
</style>