<script setup lang="ts">
import {useI18n} from "vue-i18n";

const { t } = useI18n();
const props = defineProps({
    format: {
        type: Object,
        default: null
    },
    formatFrom: {
        type: Object,
        default: null
    }
})

const replaceFormat = computed(() => {
    if (!props.formatFrom && props.format) {
        return `${t('to')} ${props.format.name}`;
    }
    else if (!props.formatFrom && !props.format) {
        return ``;
    }
    else {
        return `${t('from')} ${props.formatFrom.name} ${t('to')} ${props.format.name}`;
    }
})

const title = computed(() => {
    if (!props.formatFrom && props.format) {
        return t('titles.advantages').replace('#FORMAT#', props.format.name);
    }
    else if (!props.formatFrom && !props.format) {
        return t('titles.advantages3');
    }
    else {
        return t('titles.advantages2').replace('#FORMAT1#', props.formatFrom.name).replace('#FORMAT2#', props.format.name);
    }
})

const count = 6;
const items = [];
const icons = [
    'material-symbols-light:diamond-rounded',
    'heroicons:shield-check',
    'material-symbols:device-hub-rounded',
    'mdi:application-cog-outline',
    'material-symbols-light:shutter-speed-rounded',
    'fluent-mdl2:activate-orders'
];

for (let i = 1; i <= count; i++) {
    items.push({
        id: i,
        name: t(`advantages.adv${i}.name`).replace('#FORMAT#', replaceFormat.value),
        text: t(`advantages.adv${i}.text`).replace('#FORMAT#', replaceFormat.value).replace(' .', '.'),
    })
}

</script>

<template>
    <div class="py-20">
        <UContainer>
            <h2>{{ title }}</h2>
            <div class="grid grid-cols sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <UCard v-for="(item, index) in items" :key="item.id">
                    <div class="text-center pb-2">
                        <span class="inline-flex items-center justify-center p-2 rounded-full border border-orange-200 bg-orange-50 w-12 h-12">
                            <UIcon :name="icons[index]" class="w-8 h-8 text-orange-500"/>
                        </span>
                    </div>
                    <div class="font-bold mb-2">
                        {{item.name}}
                    </div>
                    {{item.text}}
                </UCard>
            </div>
        </UContainer>
    </div>
</template>

<style scoped>

</style>