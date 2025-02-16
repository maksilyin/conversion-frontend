<script setup lang="ts">
import Converter from "~/components/functional/Converter.vue";
import TopBlock from "~/components/ui/TopBlock.vue";
import {useI18n} from "vue-i18n";
import Advantages from "~/components/Blocks/Advantages.vue";
import ConvertList from "~/components/Blocks/ConvertList.vue";
import CategoryLinks from "~/components/Blocks/CategoryLinks.vue";
import DecorBg from "~/components/design/DecorBg.vue";
import CategoryLinksAll from "~/components/Blocks/CategoryLinksAll.vue";
import TextBlock from "~/components/Blocks/TextBlock.vue";

const { initConvertChain } = useBreadcrumbs();
const { t } = useI18n();
const title = t('titles.convert3')
const subtitle = t('subtitles.convert3')
const { formats } = useFormats();

useSeoMeta({
    title: t('page.convert.title'),
    description: t('page.convert.description'),
});

initConvertChain();
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
        <CategoryLinksAll :file-types="formats"/>
        <TextBlock class="pt-0" block="convert"/>
    </div>
</template>

<style scoped>

</style>