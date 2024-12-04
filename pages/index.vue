<script setup lang="ts">
import Converter from "~/components/functional/Converter.vue";
import TopBlock from "~/components/ui/TopBlock.vue";
import {useI18n} from "vue-i18n";
import Advantages from "~/components/Blocks/Advantages.vue";
import CategoryLinksAll from "~/components/Blocks/CategoryLinksAll.vue";

const props = defineProps({
    category: {
        type: String,
        required: true
    }
})

const { t } = useI18n();
const { formats } = useFormats();
const title = t(`titles.index`);
const subtitle = t(`subtitles.index`);

useSeoMeta({
    title: t('page.index.title'),
    description: t('page.index.description'),
});

</script>

<template>
    <TopBlock :hideBreadCrumbs="true">
        <template #title>
            {{title}}
        </template>
        <template #subtitle>
            <div class="max-w-4xl mx-auto">
                {{subtitle}}
            </div>
        </template>
    </TopBlock>
    <Converter/>
    <Advantages class="bg-white"></Advantages>
    <CategoryLinksAll class="bg-white" :file-types="formats" />
</template>

<style scoped>

</style>