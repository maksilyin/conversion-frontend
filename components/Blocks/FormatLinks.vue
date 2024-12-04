<script setup lang="ts">
import {useI18n} from "vue-i18n";
import type {FileFormat} from "~/types/FileFormat";

const { fromConvertible, toConvertFormats } = useFormats();
const { t } = useI18n();
const props = defineProps({
    format: {
        type: Object as PropType<FileFormat>,
        required: true,
    },
    isFromFormat: {
        type: Boolean,
        default: false
    }
});
const showBlock = ref<HTMLElement | null>(null);
const linkWrapper = ref<HTMLElement | null>(null);
const isShowMore = ref(false);
const isShow = ref(false);
const height = ref(0);
let formatLinks = [];

if (!props.isFromFormat) {
    formatLinks = fromConvertible(props.format);
}
else {
    formatLinks = toConvertFormats(props.format);
}

let title = t(!props.isFromFormat ? 'titles.to_format' : 'titles.form_format').replace('#FORMAT#', props.format.name)

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

const getLabel = (formatItem: FileFormat) => {
    if (!props.isFromFormat) {
        return `${formatItem.name.toUpperCase()} ${t('in')} ${props.format.name.toUpperCase()}`
    }
    else {
        return `${props.format.name.toUpperCase()} ${t('in')} ${formatItem.name.toUpperCase()}`
    }
}

const getLink = (formatItem: FileFormat) => {
    if (!props.isFromFormat) {
        return `/convert/${formatItem.extension}-to-${props.format.extension}`
    }
    else {
        return `/convert/${props.format.extension}-to-${formatItem.extension}`
    }
}

</script>

<template>
    <div class="py-20">
        <UContainer>
            <h2>{{ title }}</h2>
            <div
                ref="showBlock"
                class="transition-max-height duration-500 overflow-hidden"
                :style="{ maxHeight: isShow ? `${height}px` : '95px' }"
            >
                <div ref="linkWrapper" class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 lg:grid-cols-8 gap-3 min-h-full">
                    <NuxtLinkLocale
                        v-for="formatItem in formatLinks"
                        :key="formatItem.name + '-' + format.name"
                        :to="getLink(formatItem)"
                        class="flex items-center justify-center p-2 hover:bg-primary-50 hover:border-primary-400 rounded-lg border border-primary-200 text-primary-500 transition"
                    >
                        <span class="font-semibold">{{ getLabel(formatItem) }}</span>
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
        </UContainer>
    </div>
</template>

<style scoped>

</style>