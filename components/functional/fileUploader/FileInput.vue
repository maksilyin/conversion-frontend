<script setup>
import Button from "~/components/input/Button";

const props = defineProps({
    for: {
        default: 'input-file'
    }
})
</script>

<template>
    <div class="flex items-center justify-center w-full">
        <div class="flex flex-col items-center justify-center w-full h-72 border-2 border-gray-100 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg class="w-20 h-20 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <h2 class="mt-5 mb-5 text-2xl text-center"><span class="font-bold text-primary">Перетащите файлы сюда</span></h2>
                <div class="flex gap-5">
                    <Button tag="label" :for="props.for" icon="upload">Выберите файлы</Button>
                    <Button tag="span" icon="dropbox"></Button>
                    <Button tag="span" icon="google-drive"></Button>
                </div>
                <p class="text-xs mt-5 text-gray-500 dark:text-gray-400">Перетащите файлы сюда. 100 MB максимальный размер файла</p>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>