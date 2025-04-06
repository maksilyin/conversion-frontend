<script setup lang="ts">
import type {FileFormat, FileType} from "~/types/FileFormat";
import {converterIconsV2} from "~/collections/icons";

const props = defineProps({
    formats: {
        type: Array as PropType<FileType[]>,
        required: true
    },
    clickHandler: {
        type: Function,
        default: () => {}
    },
    checkItem: {
        type: Function,
        default: () => {}
    }
})

const showTab = ref('image');
const searchQuery = ref('');

const formatList = computed(() => {
    if (searchQuery.value.length > 0) {
        let formatTypes: FileType[] = JSON.parse(JSON.stringify(props.formats));

        formatTypes = formatTypes.filter(fileType => {
            let formats: FileFormat[] = fileType.formats;

            formats = formats.filter(format => {
                return format.extension.toLowerCase().indexOf(searchQuery.value.toLowerCase()) >= 0
            });

            if (formats.length) {
                fileType.formats = formats;
                return true;
            }

            return false;
        });

        return formatTypes;
    }

    return props.formats;
})

</script>

<template>
    <div class="xs:px-2 pt-2">
        <UInput
            v-model="searchQuery"
            class="search-input rounded border border-gray-200"
            icon="i-heroicons-magnifying-glass-20-solid"
            size="md"
            color="white"
            :trailing="false"
            placeholder="Search..."
        />
    </div>
    <div class="flex gap-2 xs:p-2 pt-2 w-full min-h-[300px] max-h-[365px] md:w-[450px]">
        <div class="w-auto flex-shrink-0 rounded border border-gray-200 p-2">
            <div
                v-for="formatNavItem in formatList"
                :key="formatNavItem.id"
                class="cursor-pointer py-1 pl-1 pr-2 rounded border border-transparent font-medium text-xs xs:text-sm transition hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 flex items-center gap-2"
                :class="{'bg-blue-50 !border-blue-300 text-blue-600': showTab === formatNavItem.slug}"
                @mouseover="showTab = formatNavItem.slug"
            >
                <img v-if="converterIconsV2[formatNavItem.slug]" class="w-6 h-6 object-contain" :src="converterIconsV2[formatNavItem.slug]" :alt="formatNavItem.name" />
                <UIcon v-else-if="formatNavItem.icon" :name="formatNavItem.icon" class="w-5 h-5" />{{ formatNavItem.name }}
            </div>
        </div>
        <div class="w-full rounded border border-gray-200 overflow-y-auto relative">
            <div class="absolute inset-0 w-full overflow-auto scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg">
                <div class="p-2">
                    <div v-for="formatNavItem in formatList" :key="formatNavItem.id" class="grid grid-cols-2 xs:grid-cols-3 gap-1 xs:gap-2" v-show="showTab === formatNavItem.slug">
                        <span
                            v-for="format in formatNavItem.formats"
                            @click="clickHandler(format.extension)"
                            class="cursor-pointer rounded text-sm w-full font-medium text-center text-gray-500 transition border border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-600 py-[6px] px-2"
                            :class="{'!bg-primary-50 !border-primary-500 !text-primary-600': checkItem(format.extension)}"
                        >
                            {{ format.extension.toUpperCase() }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.search-input ::v-deep(input) {
    @apply ring-0;
}
</style>