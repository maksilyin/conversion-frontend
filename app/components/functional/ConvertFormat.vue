<script setup lang="ts">
import Converter from "~/components/functional/Converter.vue";
import TopBlock from "~/components/ui/TopBlock.vue";
import {useI18n} from "vue-i18n";
import Advantages from "~/components/Blocks/Advantages.vue";
import Instruction from "~/components/Blocks/Instruction.vue";
import FormatLinks from "~/components/Blocks/FormatLinks.vue";
import DetailText from "~/components/Blocks/DetailText.vue";
import DecorBg from "~/components/design/DecorBg.vue";

const { initConvertChain } = useBreadcrumbs();

const props = defineProps({
    format: {
        type: String,
        required: true
    }
})

const { t } = useI18n();

const { loadDetailFormat, formatDetail } = useFormats();
await loadDetailFormat(props.format);

if (!formatDetail.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Format not found',
    });
}

const title = t('titles.convert').replace('#FORMAT#', formatDetail.value.name)
const subtitle = t('subtitles.convert').replace('#FORMAT#', formatDetail.value.name)

useSeoMeta({
    title: formatDetail.value.seo?.title ? formatDetail.value.seo.title : t('page.index.title'),
    description: formatDetail.value.seo?.description ? formatDetail.value.seo.description : t('page.index.description'),
});

initConvertChain(formatDetail.value);

</script>
<template>
    <div key="index">
        <div class="relative bg-grey-light">
            <DecorBg/>
            <div class="relative z-1">
                <TopBlock :hideBreadCrumbs="true">
                    <template #title>
                        <span v-html="title"></span>
                    </template>
                    <template #subtitle>
                        <span class="block max-w-4xl mx-auto">
                            {{subtitle}}
                        </span>
                    </template>
                </TopBlock>
            </div>
            <Converter :convert-format="format"/>
        </div>
        <Instruction :format="formatDetail"/>
        <Advantages :format="formatDetail"></Advantages>
        <FormatLinks :format="formatDetail"/>
        <FormatLinks :is-from-format="true" :format="formatDetail"/>
        <DetailText v-if="formatDetail?.description" :text="formatDetail.description"></DetailText>
    </div>
</template>

<style scoped>

</style>