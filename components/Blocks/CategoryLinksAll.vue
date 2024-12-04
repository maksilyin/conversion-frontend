<script setup lang="ts">
import {useI18n} from "vue-i18n";
import type {FileFormat, FileType} from "~/types/FileFormat";

const { getStoragePath } = imagePath();
const { t } = useI18n();
const props = defineProps({
    fileTypes: {
        type: Object as PropType<FileType[]>,
        required: true,
    },
});
const showBlock = ref<HTMLElement | null>(null);
const linkWrapper = ref<HTMLElement | null>(null);
const isShowMore = ref(false);
const isShow = ref(false);
const height = ref(0);

const toggleShow = () => {
    if (linkWrapper.value && showBlock.value) {
        height.value = linkWrapper.value.offsetHeight;
    }
    isShow.value = !isShow.value;
}

onMounted(() => {
    if (linkWrapper.value && showBlock.value) {
        if (linkWrapper.value.offsetHeight > showBlock.value.offsetHeight) {
            isShowMore.value = true;
        }
    }

    document.addEventListener('resize', function () {
        if (linkWrapper.value && showBlock.value) {
            if (linkWrapper.value.offsetHeight > showBlock.value.offsetHeight) {
                isShowMore.value = true;
            }
            else {
                isShowMore.value = false;
            }
        }
    })
})

</script>

<template>
    <div class="py-20">
        <UContainer>
            <h2>{{ $t('convert') }}</h2>
            <div class="flex flex-col gap-8">
                <div v-for="fileType in fileTypes" :key="fileType.id">
                    <h3 class="text-lg font-medium text-gray-500 mb-5">{{ $t('convert') }} {{ fileType.name.toLowerCase() }}</h3>
                    <div
                        ref="showBlock"
                        class="transition-max-height duration-500 overflow-hidden border border-gray-200 p-4 rounded-lg bg-gray-200 bg-opacity-10"
                    >
                        <div ref="linkWrapper" class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-3 min-h-full">
                            <NuxtLinkLocale
                                v-for="formatItem in fileType.formats"
                                :key="formatItem.id"
                                :to="`/convert/${formatItem.extension}`"
                                class="flex items-center justify-center hover:text-primary-700 rounded-lg text-primary-500 transition"
                            >
                                <span class="font-semibold flex gap-2 items-center">
                                    <span v-if="formatItem.icon_image || formatItem.icon" class="inline-flex items-center justify-center w-6 h-6">
                                        <img
                                            v-if="formatItem.icon_image"
                                            :src="getStoragePath(formatItem.icon_image).src"
                                            class="w-full h-full object-contain"
                                            :alt="formatItem.name"
                                        />
                                        <UIcon v-else-if="formatItem.icon" :name="formatItem.icon" class="w-full h-full"/>
                                    </span>
                                    Конвертер {{formatItem.name}}
                                </span>
                            </NuxtLinkLocale>
                        </div>
                    </div>
                    <div v-if="isShowMore" class="text-center pt-8">
                        <span
                            class="inline-flex gap-2 items-center relative cursor-pointer transition text-primary-600 font-semibold hover:text-primary-700"
                            @click="toggleShow()"
                        >
                            <span v-if="!isShow">{{$t('show_more')}}</span>
                            <span v-else>{{$t('hide')}}</span>
                            <UIcon
                                class="w-5 h-5 transition duration-500"
                                :class="{'rotate-180': isShow}"
                                name="material-symbols:keyboard-arrow-down-rounded"
                            />
                        </span>
                    </div>
                </div>
            </div>
        </UContainer>
    </div>
</template>

<style scoped>

</style>