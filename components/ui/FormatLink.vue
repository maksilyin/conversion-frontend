<script setup lang="ts">
import type {FileFormat} from "~/types/FileFormat";
import FileIcon from "~/components/ui/FileIcon.vue";
const { getStoragePath } = imagePath();
const props = defineProps({
    item: {
        type: Object as PropType<FileFormat>,
        required: true,
    },
});
</script>

<template>
    <UCard class="group transition hover:ring-blue-dark relative overflow-hidden" :ui="{body: 'p-0', rounded: 'rounded-md'}">
        <div aria-hidden="true" class="inset-0 opacity-0 group-hover:opacity-25 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-primary-500 to-white dark:from-white dark:to-white blur-2xl dark:opacity-0 dark:group-hover:opacity-5"></div>
        <NuxtLinkLocale class="block p-3 relative z-1" :to="`/convert/${item.extension}`">
            <div class="flex items-center gap-4">
            <span class="inline-flex items-center justify-center w-12 h-12 flex-shrink">
                <img
                    v-if="item.icon_image"
                    :src="getStoragePath(item.icon_image).src"
                    class="w-full h-full object-contain"
                    :alt="item.name"
                />
                <UIcon v-else-if="item.icon" :name="item.icon" class="w-full h-full text-orange-500"/>
                <FileIcon class="w-full h-full" v-else />
            </span>
                <div>
                    <div class="font-medium transition text-blue-dark-900">
                        {{item.name}}
                    </div>
                    <div class="text-gray-600">
                        {{item.extended_name}}
                    </div>
                </div>
                <UIcon
                    name="material-symbols:arrow-forward-rounded"
                    class="w-8 h-8 translate-x-[-5px] group-hover:translate-x-0 opacity-0 duration-500 ml-auto text-gray-400 transition group-hover:opacity-100 group-hover:text-blue-dark"
                />
            </div>
        </NuxtLinkLocale>
    </UCard>
</template>

<style scoped>

</style>