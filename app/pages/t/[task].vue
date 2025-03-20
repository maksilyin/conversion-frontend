<script setup lang="ts">
import Converter from "~/components/functional/Converter.vue";
import TopBlock from "~/components/ui/TopBlock.vue";
import {useI18n} from "vue-i18n";
import Advantages from "~/components/Blocks/Advantages.vue";
import CategoryLinksAll from "~/components/Blocks/CategoryLinksAll.vue";
import CategoryCardList from "~/components/Blocks/CategoryCardList.vue";
import DecorBg from "~/components/design/DecorBg.vue";

const router = useRouter();
const route = useRoute();

definePageMeta({
    name: 'task'
})

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

if (payload.value?.files && Array.isArray(payload.value?.files)) {
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
    <div :key="uuid">
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