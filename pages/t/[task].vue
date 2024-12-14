<script setup lang="ts">
import Converter from "~/components/functional/Converter.vue";
import TopBlock from "~/components/ui/TopBlock.vue";
import {useI18n} from "vue-i18n";
import Advantages from "~/components/Blocks/Advantages.vue";
import CategoryLinksAll from "~/components/Blocks/CategoryLinksAll.vue";

const router = useRouter();
const route = useRoute();

const props = defineProps({
    category: {
        type: String,
        required: true
    }
})

const { t } = useI18n();
const { formats } = useFormats();
const { setFromPayload } = useUploader();
const { uuid, loadTask, payload, deleteTask } = useTask();
const title = t(`titles.index`);
const subtitle = t(`subtitles.index`);

const taskId = Array.isArray(route.params.task) ? route.params.task[0] : route.params.task;
await loadTask(taskId);

if (payload.value?.files) {
    setFromPayload(payload.value.files);
}

useSeoMeta({
    title: t('page.index.title'),
    description: t('page.index.description'),
});

onBeforeRouteLeave(() => {
    deleteTask();
});

</script>

<template>
    <div :key="uuid" class="relative">
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
</template>

<style scoped>

</style>