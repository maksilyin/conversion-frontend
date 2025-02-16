<script setup lang="ts">
import type {FileFormat} from "~/types/FileFormat";
import FileIcon from "~/components/ui/FileIcon.vue";
import {converterIcons} from "~/collections/icons";
import FileTypeIcon from "~/components/ui/FileTypeIcon.vue";
import FileIconConvert from "~/components/ui/FileIconConvert.vue";
const { getStoragePath } = imagePath();
const props = defineProps({
    item: {
        type: Object as PropType<FileFormat>,
        required: true,
    },
});
</script>

<template>
    <NuxtLinkLocale
        :to="`/convert/${item.extension}`"
        class="group p-2 block relative shadow-ring-5 shadow-black-300/20 rounded transition duration-200 hover:shadow-ring-10 hover:shadow-black-300/30 hover:scale-105">
        <span class="flex gap-2 items-center h-full">
            <span class="w-12 h-12">
                <img
                    v-if="item.icon_image"
                    :src="getStoragePath(item.icon_image).src"
                    class="w-full h-full object-contain"
                    :alt="item.name"
                />
                <UIcon v-else-if="item.icon" :name="item.icon" class="w-full h-full text-orange-500"/>
                <FileIcon
                    v-else
                    class="w-full h-full transition duration-500"
                    :label="item.extension.toUpperCase()"
                    :color="item.color || ''"
                />
            </span>
            <span>
                <span class="block text-lg font-medium text-gray-800">
                    <span class="">
                        {{item.name}}
                    </span>
                </span>
                <span v-if="item.extended_name" class="block text-sm">
                    {{item.extended_name}}
                </span>
            </span>
        </span>
        <!--<UIcon name="solar:round-arrow-right-up-outline" class="w-10 h-10 right-5 top-5 absolute text-black-300 opacity-50"/>-->
    </NuxtLinkLocale>
    <!--
    <UCard
        class="card group transition ring-blue-500 hover:ring-blue-dark relative overflow-hidden flex flex-col justify-center max-h-[72px]"
        :ui="{body: 'p-0', rounded: 'rounded-md'}"
    >
        <div aria-hidden="true" class="inset-0 opacity-0 group-hover:opacity-25 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-primary-500 to-white dark:from-white dark:to-white blur-2xl dark:opacity-0 dark:group-hover:opacity-5"></div>
        <NuxtLinkLocale class="block p-2 relative z-1" :to="`/convert/${item.extension}`">
            <div class="flex items-center gap-2 h-full">
            <span class="inline-flex items-center justify-center w-12 h-12 flex-shrink">
                <img
                    v-if="item.icon_image"
                    :src="getStoragePath(item.icon_image).src"
                    class="w-full h-full object-contain"
                    :alt="item.name"
                />
                <UIcon v-else-if="item.icon" :name="item.icon" class="w-full h-full text-orange-500"/>
                <FileIcon
                    v-else
                    class="w-full h-full"
                    :label="item.extension.toUpperCase()"
                    :color="item.color || ''"
                />
            </span>
                <div>
                    <div class="font-medium transition text-blue-dark-900">
                        {{item.name}}
                    </div>
                    <div class="text-gray-600 text-sm">
                        {{item.extended_name}}
                    </div>
                </div>
                <UIcon
                    name="material-symbols:arrow-forward-rounded"
                    class="w-8 h-8 translate-x-[-5px] group-hover:translate-x-0 opacity-0 duration-500 ml-auto text-gray-400 transition group-hover:opacity-100 group-hover:text-blue-dark"
                />
            </div>
        </NuxtLinkLocale>
    </UCard>-->
</template>

<style scoped>

</style>