<script setup lang="ts">
import type {Page} from "~/types/Page";
import TopBlock from "~/components/ui/TopBlock.vue";
import {useI18n} from "vue-i18n";
import DetailText from "~/components/Blocks/DetailText.vue";
const { t } = useI18n();

const { initPageChain } = useBreadcrumbs();
const api = useApi();
const route = useRoute();

const params = !Array.isArray(route.params.page) ? [route.params.page[0]] : route.params.page;
const url = params.join('/')
const page: Page | null = await api.fetchData<Page>('page', { url });

if (page) {
    useSeoMeta({
        title: page.seo?.title ? page.seo.title : page.name,
        description: page.seo.description
    });

    initPageChain(page)
}

</script>

<template>
    <div v-if="page" class="">
        <TopBlock>
            <template #title>
                {{ page.name }}
            </template>
        </TopBlock>
        <DetailText class="pt-0" v-if="page.description" :text="page.description"/>
    </div>
</template>

<style scoped>

</style>