<script setup lang="ts">
import Converter from "~/components/functional/Converter.vue";
import TopBlock from "~/components/ui/TopBlock.vue";
import {useI18n} from "vue-i18n";
import Advantages from "~/components/Blocks/Advantages.vue";
import Instruction from "~/components/Blocks/Instruction.vue";
import FormatLinks from "~/components/Blocks/FormatLinks.vue";
import DetailText from "~/components/Blocks/DetailText.vue";

const { initConvertChain } = useBreadcrumbs();
const route = useRoute();
const format = Array.isArray(route.params.format) ? route.params.format[0] : route.params.format;
const { t } = useI18n();

const { loadDetailFormat, formatDetail } = useFormats();
await loadDetailFormat(format);

if (!formatDetail.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Format not found',
    });
}

const title = t('titles.convert').replace('#FORMAT#', formatDetail.value.name)
const subtitle = t('subtitles.convert').replace('#FORMAT#', formatDetail.value.name)

initConvertChain(formatDetail.value);

</script>

<template>
    <TopBlock>
        <template #title>
            <span v-html="title"></span>
        </template>
        <template #subtitle>
            {{subtitle}}
        </template>
    </TopBlock>
    <Converter :convert-format="format"/>
    <Instruction class="border-t" :format="formatDetail"/>
    <Advantages class="bg-gray-50" :format="formatDetail"></Advantages>
    <FormatLinks :format="formatDetail"/>
    <FormatLinks :is-from-format="true" :format="formatDetail"/>
    <DetailText v-if="formatDetail?.description" :text="formatDetail.description"></DetailText>
</template>

<style scoped>

</style>