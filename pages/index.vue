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
const { uuid } = useTask();
const title = t(`titles.index`);
const subtitle = t(`subtitles.index`);

useSeoMeta({
    title: t('page.index.title'),
    description: t('page.index.description'),
});

</script>

<template>
    <div key="index">
        <div class="relative">
            <div class="relative z-1">
                <TopBlock :hideBreadCrumbs="true">
                    <template #title>
                        <span v-html="title"></span>
                    </template>
                    <template #subtitle>
                        <div class="max-w-4xl mx-auto">
                            {{subtitle}}
                        </div>
                    </template>
                </TopBlock>
                <Converter/>
            </div>
        </div>
        <Advantages class="border-t"></Advantages>
        <CategoryLinksAll :file-types="formats" />
    </div>
</template>

<style scoped>

</style>