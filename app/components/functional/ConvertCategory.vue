<script setup lang="ts">
import type {FileFormat, FileType} from "~/types/FileFormat";
import Converter from "~/components/functional/Converter.vue";
import TopBlock from "~/components/ui/TopBlock.vue";
import {useI18n} from "vue-i18n";
import Advantages from "~/components/Blocks/Advantages.vue";
import CategoryLinks from "~/components/Blocks/CategoryLinks.vue";
import CategoryCardList from "~/components/Blocks/CategoryCardList.vue";
import DecorBg from "~/components/design/DecorBg.vue";

const { initConvertChain } = useBreadcrumbs();
const props = defineProps({
    category: {
        type: String,
        required: true
    }
})

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

useSeoMeta({
    title: fileType.seo?.title ? fileType.seo.title : `${title} ${t('meta.title.suffix')}`,
    description: fileType.seo?.description ? fileType.seo.description : `${subtitle} ${t('meta.description.suffix')}`
});

initConvertChain(null, null, fileType)

</script>

<template>
    <div key="category">
        <div class="relative bg-grey-light">
            <DecorBg/>
            <div class="relative z-1">
                <TopBlock :hideBreadCrumbs="true">
                    <template #title>
                        <span v-html="title"></span>
                    </template>
                    <template #subtitle>
                        <div class="max-w-4xl mx-auto text-center">
                            {{subtitle}}
                        </div>
                    </template>
                </TopBlock>
            </div>
            <Converter/>
        </div>
        <Advantages></Advantages>
        <CategoryLinks :file-type="fileType"/>
    </div>
</template>

<style scoped>

</style>