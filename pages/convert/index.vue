<script setup lang="ts">
import Converter from "~/components/functional/Converter.vue";
import TopBlock from "~/components/ui/TopBlock.vue";
import {useI18n} from "vue-i18n";
import Advantages from "~/components/Blocks/Advantages.vue";
import ConvertList from "~/components/Blocks/ConvertList.vue";

const { initConvertChain } = useBreadcrumbs();
const { t } = useI18n();
const title = t('titles.convert3')
const subtitle = t('subtitles.convert3')
initConvertChain();
</script>

<template>
    <TopBlock>
        <template #title>
            {{title}}
        </template>
        <template #subtitle>
            {{subtitle}}
        </template>
    </TopBlock>
    <Converter/>
    <Advantages class="bg-white border-t"></Advantages>
    <ConvertList/>
</template>

<style scoped>

</style>