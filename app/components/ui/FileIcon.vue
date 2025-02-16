<script setup lang="ts">
import FileIconConvert from "~/components/ui/FileIconConvert.vue";

const props = defineProps({
    color: {
        type: String
    },
    type: {
        default: 'default'
    },
    label: {
        required: true,
        type: String,
    }
})

</script>

<template>
    <div class="relative">
        <FileIconConvert v-if="type==='default'" :label="label" :color="color"/>
    </div>
</template>
