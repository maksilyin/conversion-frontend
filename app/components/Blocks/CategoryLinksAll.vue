<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { FileType } from "~/types/FileFormat";
import FormatLink from "~/components/ui/FormatLink.vue";
import { converterIcons } from "~/collections/icons"
import TitleH2 from "~/components/ui/TitleH2.vue";

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
    <div class="section">
        <UContainer>
            <TitleH2 class="mb-8">{{ $t('titles.convert_main') }}</TitleH2>
            <p class="max-w-4xl mx-auto text-center text-lg mb-10">{{ $t('subtitles.convert_main') }}</p>
            <div class="flex flex-col gap-16">
                <div class="border-b border-gray-200 pb-16" v-for="fileType in fileTypes" :key="fileType.id">
                    <div class="flex gap-2 items-center mb-10">
                        <span class="inline-flex items-center justify-center w-14 h-14 flex-shrink">
                            <img
                                v-if="fileType.icon_image"
                                :src="getStoragePath(fileType.icon_image).src"
                                class="w-full h-full object-contain"
                                :alt="fileType.name"
                            />
                            <UIcon v-else-if="fileType.icon" :name="fileType.icon" class="w-full h-full text-orange-400"/>
                            <img
                                v-else-if="converterIcons[fileType.slug]"
                                :src="converterIcons[fileType.slug]"
                                class="w-full h-full object-contain"
                                :alt="fileType.name"
                            />
                        </span>
                        <h3 class="text-2xl font-medium text-black-300">
                            <NuxtLinkLocale class="transition hover:text-blue-dark" :to="`/convert/${fileType.slug}`">{{ $t('convert') }} {{ fileType.name.toLowerCase() }}</NuxtLinkLocale>
                        </h3>
                    </div>
                    <div
                        ref="showBlock"
                        class="transition-max-height duration-500"
                    >
                        <div ref="linkWrapper" class="grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-h-full">
                            <FormatLink :item="formatItem" v-for="(formatItem, index) in fileType.formats" :key="formatItem.id"/>
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