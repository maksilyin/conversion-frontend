<script setup lang="ts">
import type {FileFormat} from "~/types/FileFormat";
import Converter from "~/components/functional/Converter.vue";
import TopBlock from "~/components/ui/TopBlock.vue";
import {useI18n} from "vue-i18n";
import Advantages from "~/components/Blocks/Advantages.vue";
import Instruction from "~/components/Blocks/Instruction.vue";
import FormatLinks from "~/components/Blocks/FormatLinks.vue";
import PreviewDescription from "~/components/Blocks/PreviewDescription.vue";

const { initConvertChain } = useBreadcrumbs();
const route = useRoute();
const formatFrom = Array.isArray(route.params.format1) ? route.params.format1[0] : route.params.format1;
const formatTo = Array.isArray(route.params.format2) ? route.params.format2[0] : route.params.format2;
const { t } = useI18n();

const { loadDetailFormat } = useFormats();
const formatDetailFrom: FileFormat | null = await loadDetailFormat(formatFrom);
const formatDetailTo: FileFormat | null = await loadDetailFormat(formatTo);

if (!formatDetailFrom || !formatDetailTo) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Format not found',
    });
}

const title = t('titles.convert2').replace('#FORMAT1#', formatDetailFrom.name).replace('#FORMAT2#', formatDetailTo.name)
const subtitle = t('subtitles.convert2').replace('#FORMAT1#', formatDetailFrom.name).replace('#FORMAT2#', formatDetailTo.name)

const metaTitle = t('page.format1_to_format2.title').replace('#FORMAT1#', formatDetailFrom.name).replace('#FORMAT2#', formatDetailTo.name)
const metaDescription = t('page.format1_to_format2.description').replace('#FORMAT1#', formatDetailFrom.name).replace('#FORMAT2#', formatDetailTo.name)

useSeoMeta({
    title: `${metaTitle} ${t('meta.title.suffix')}`,
    description: `${metaDescription} ${t('meta.description.suffix')}`,
});

initConvertChain(formatDetailFrom, formatDetailTo);

</script>

<template>
    <div class="relative">
        <div class="relative z-1">
            <TopBlock>
                <template #title>
                    <span v-html="title"></span>
                </template>
                <template #subtitle>
                    {{subtitle}}
                </template>
            </TopBlock>
            <Converter :convert-format="formatTo"/>
        </div>
    </div>
    <Instruction class="border-t" :formatFrom="formatDetailFrom" :format="formatDetailTo"/>
    <Advantages class="bg-gray-50" :formatFrom="formatDetailFrom" :format="formatDetailTo"></Advantages>
    <FormatLinks :is-from-format="true" :format="formatDetailFrom"/>
    <FormatLinks class="bg-white" :format="formatDetailTo"/>
    <PreviewDescription :format-to="formatDetailTo" :format-from="formatDetailFrom"/>
</template>

<style scoped>

</style>