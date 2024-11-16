<script setup>
import Button from "~/components/input/Button.vue";
const api = useApi();

const props = defineProps({
    data: {
        default: {}
    },
    for: {
        default: 'input-file'
    }
})

const send = async () => {
    const res = await api.callApi('task.send', props.data)
    console.log(res)
}

</script>

<template>
    <div class="sticky bottom-0 p-2 bg-white">
        <div class="flex gap-5">
            <Button tag="label" :for="props.for" icon="upload">Выберите файлы</Button>
            <Button tag="span" icon="dropbox"></Button>
            <Button tag="span" icon="google-drive"></Button>
            <Button class="ml-auto" tag="span" @click="send">Конвертировать</Button>
        </div>
    </div>
</template>

<style scoped>

</style>