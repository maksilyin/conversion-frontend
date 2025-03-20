<script setup lang="ts">
import Converter from "~/components/functional/Converter.vue";
import TopBlock from "~/components/ui/TopBlock.vue";
import {useI18n} from "vue-i18n";
import Advantages from "~/components/Blocks/Advantages.vue";
import CategoryLinksAll from "~/components/Blocks/CategoryLinksAll.vue";
import DecorBg from "~/components/design/DecorBg.vue";
import ConvertList from "~/components/Blocks/ConvertList.vue";
import CategoryCardList from "~/components/Blocks/CategoryCardList.vue";

const props = defineProps({
    category: {
        type: String,
        required: true
    }
})

definePageMeta({
  key: () => Date.now(),
});

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
    <div>
        <div class="relative bg-grey-light">
            <DecorBg/>
            <div class="relative z-1">
                <TopBlock :hideBreadCrumbs="true">
                    <template #title>
                        <span v-html="title"></span>
                    </template>
                    <template #subtitle>
                        <span class="block max-w-4xl mx-auto" v-html="subtitle"></span>
                    </template>
                </TopBlock>
            </div>
            <Converter/>
        </div>
        <Advantages/>
        <CategoryCardList/>
    </div>
</template>

<style scoped>

</style>