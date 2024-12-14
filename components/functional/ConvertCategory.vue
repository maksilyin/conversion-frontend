<script setup lang="ts">
import type {FileFormat, FileType} from "~/types/FileFormat";
import Converter from "~/components/functional/Converter.vue";
import TopBlock from "~/components/ui/TopBlock.vue";
import {useI18n} from "vue-i18n";
import Advantages from "~/components/Blocks/Advantages.vue";
import CategoryLinks from "~/components/Blocks/CategoryLinks.vue";

const { initConvertChain } = useBreadcrumbs();
const props = defineProps({
    category: {
        type: String,
        required: true
    }
})

const route = useRoute();
const { t } = useI18n();

const { loadDetailTypeFile } = useFormats();

const fileType: FileType | null = await loadDetailTypeFile(props.category)


if (!fileType) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Format not found',
    });
}

const title = t(`titles.category.${props.category}`);
const subtitle = t(`subtitles.category.${props.category}`);

initConvertChain(null, null, fileType)

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
    <Converter/>
    <Advantages class="bg-white border-t"></Advantages>
    <CategoryLinks :file-type="fileType"/>
</template>

<style scoped>

</style>