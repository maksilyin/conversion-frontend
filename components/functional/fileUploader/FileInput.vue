<script setup>
import iconUpload from "~/assets/icons/upload.svg"

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

const { openChooser } = useFileChooser();

</script>

<template>
    <div class="dashed overflow-hidden p-[1px] rounded-[30px]">
        <div
            class="flex items-center justify-center w-full border-primary-200 p-3 transition cursor-pointer rounded-[30px]"
            @dragover.prevent="handleDragOver"
            @dragleave="handleDragLeave"
            @drop.prevent="handleDrop"
            :class="{'bg-primary': isDragging}"
            @click="labelInput.click()"
        >
            <div class="flex flex-col items-center justify-center w-full h-72">
                <div v-if="!isDragging" class="flex flex-col items-center justify-center pt-5 pb-6">
                    <img class="h-[60px] md:w-[150px] md:h-[83px]" :src="iconUpload" alt="">
                    <div class="mt-5 mb-5 text-lg md:text-2xl text-center">
                        <span class="font-bold">
                            {{$t('drug_drop')}} <span class="text-primary-400">{{$t('images')}}</span>, <br>
                            <span class="text-primary-400">{{$t('video')}}</span>{{$t('or_any')}} <span class="text-primary-400">{{$t('files')}}</span>
                        </span>
                    </div>
                    <div class="flex gap-2">
                        <UButton @click.stop size="xl" icon="material-symbols-light:upload" class="p-2 md:pr-4 justify-center relative">
                            Выберите файлы
                            <label ref="labelInput" :for="props.for" class="absolute w-full h-full inset-0 cursor-pointer"></label>
                        </UButton>
                        <UButton @click.stop="openChooser('dropbox')" size="xl" class="w-10 p-2 justify-center" icon="ri:dropbox-fill"></UButton>
                        <UButton @click.stop="openChooser('google')" size="xl" class="w-10 p-2 justify-center" icon="uil:google-drive"></UButton>
                    </div>
                    <p class="text-xs mt-5 text-gray-500 dark:text-gray-400">
                        {{ $t('drop_max_size') }}
                    </p>
                </div>
                <div v-else>
                    <div class="flex gap-3 items-start justify-center text-white h-24">
                        <div class="relative">
                            <UIcon class="h-20 w-20 rotate-[20deg]" name="hugeicons:arrow-move-down-right"/>
                            <div class="animated-box absolute bottom-0 left-0 bg-primary"></div>
                        </div>
                        <div class="self-end">
                            <UIcon class="h-14 w-14" name="tdesign:file"/>
                        </div>
                        <div class="relative">
                            <UIcon class="h-20 w-20 rotate-[-20deg]" name="hugeicons:arrow-move-down-left"/>
                            <div class="animated-box absolute bottom-0 left-0 bg-primary"></div>
                        </div>
                    </div>
                    <div class="font-bold text-2xl text-center text-white mt-5">
                        {{$t('drop_right_here')}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .dashed {
        background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='30' ry='30' stroke='%2360A5FA' stroke-width='4' stroke-dasharray='9' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
        border-radius: 30px;
    }

    .animated-box {
        width: 100%;
        height: 100%;
        opacity: 1;
        animation: grow-disappear .8s infinite ease-in; /* Название анимации, длительность и зацикливание */
    }

    @keyframes grow-disappear {
        0% {
            height: 100%;
            opacity: 1;
        }
        99% {
            height: 0;
            opacity: 1;
        }
        100% {
            opacity: 0;
        }

    }
</style>