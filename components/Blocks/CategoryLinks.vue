<script setup lang="ts">
import {useI18n} from "vue-i18n";
import type {FileFormat, FileType} from "~/types/FileFormat";
import FormatLink from "~/components/ui/FormatLink.vue";

const { getStoragePath } = imagePath();
const { t } = useI18n();
const props = defineProps({
    fileType: {
        type: Object as PropType<FileType>,
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
            <h2>{{ $t('convert') }} {{ fileType.name.toLowerCase() }}</h2>
            <div
                ref="showBlock"
                class="transition-max-height duration-500 p-1 overflow-hidden"
            >
                <div
                    ref="showBlock"
                    class="transition-max-height duration-500"
                >
                    <div ref="linkWrapper" class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-3 min-h-full">
                        <FormatLink :item="formatItem" v-for="(formatItem, index) in fileType.formats" :key="formatItem.id"/>
                    </div>
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
        </UContainer>
    </div>
</template>

<style scoped>

</style>