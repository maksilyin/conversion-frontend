<script setup lang="ts">
import {useI18n} from "vue-i18n";
import type {FileFormat} from "~/types/FileFormat";
import TitleH2 from "~/components/ui/TitleH2.vue";

const { fromConvertible } = useFormats();
const { t } = useI18n();
const props = defineProps({
    format: {
        type: Object as PropType<FileFormat>,
        required: true
    },
    formatFrom: {
        type: Object,
        default: null
    }
})

const supportFormats = fromConvertible(props.format);

const getSupportFormatsString = (num: number = 3) => {
    const formats = supportFormats.slice(0, num);
    let result: string[] = [];

    formats.forEach(formatItem => {
        result.push(formatItem.name);
    });

    return result.join(', ');
}

const title = !props.formatFrom
    ? t('titles.instruction').replace('#FORMAT#', props.format.name)
    : t('titles.instruction2').replace('#FORMAT1#', props.formatFrom.name).replace('#FORMAT2#', props.format.name);

const count = 4;
const items = [];

for (let i = 1; i <= count; i++) {
    if (!props.formatFrom) {
        items.push({
            id: i,
            name: t(`instruction.item${i}.name`).replace('#FORMAT#', props.format.name),
            text: t(`instruction.item${i}.text`).replace('#FORMAT#', props.format.name).replace('#SUPPORTFORMATS#', getSupportFormatsString()),
        })
    }
    else {
        items.push({
            id: i,
            name: t(`instruction2.item${i}.name`).replace('#FORMAT1#', props.formatFrom.name).replace(/#FORMAT2#/g, props.format.name),
            text: t(`instruction2.item${i}.text`).replace('#FORMAT1#', props.formatFrom.name).replace(/#FORMAT2#/g, props.format.name).replace('#SUPPORTFORMATS#', getSupportFormatsString()),
        })
    }
}

</script>

<template>
    <div class="section">
        <UContainer>
            <TitleH2>{{title}}</TitleH2>
            <div class="space-y-8">
                <div v-for="(item, index) in items" :key="item.id" class="flex items-start space-x-4">
                    <div class="flex-shrink-0">
                        <div class="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center">
                            <span class="text-lg font-bold">{{index + 1}}</span>
                        </div>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold text-black">{{item.name}}</h3>
                        <p class="text-black-300">{{item.text}}</p>
                    </div>
                </div>
            </div>
        </UContainer>
    </div>
</template>

<style scoped>

</style>