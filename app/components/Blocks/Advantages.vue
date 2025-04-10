<script setup lang="ts">
import {useI18n} from "vue-i18n";
import security from '~/assets/icons/security.svg';
import quality from '~/assets/icons/quality.svg';
import digital_platform from '~/assets/icons/digital_platform.svg';
import software_app_development_icon from '~/assets/icons/software_app_development_icon.svg'
import content_information_data_media from '~/assets/icons/content_information_data_media.svg'
import launch_icon from '~/assets/icons/launch_icon.svg'
import RoundedBlock from "~/components/ui/RoundedBlock.vue";
import TitleH2 from "~/components/ui/TitleH2.vue";

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

const subtitle = computed(() =>{
  return t('subtitles.advantages3');
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

const iconsSvg = [
    quality,
    content_information_data_media,
    software_app_development_icon,
    digital_platform,
    security,
    launch_icon,
];

const gradient = [
    'from-primary-500 to-white dark:from-white dark:to-white',
    'from-sky-500 to-white dark:from-white dark:to-white',
    'from-teal-500 to-white dark:from-white dark:to-white',
    'from-violet-500 to-white dark:from-white dark:to-white',
    'from-orange-500 to-white dark:from-white dark:to-white',
    'from-cyan-500 to-white dark:from-white dark:to-white',
]

const color = [
    'text-[#F45D48]',
    'text-[#F4A261]',
    'text-[#2A9D8F]',
    'text-[#E76F51]',
    'text-[#457B9D]',
    'text-[#1D3557]',
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
    <div class="section bg-black-300">
        <UContainer>
            <RoundedBlock>
                <TitleH2 class="mb-6">{{ title }}</TitleH2>
                <p class="text-center text-black-300 mb-12 sm:text-lg">{{ subtitle }}</p>
                <div class="grid grid-cols sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div class="relative z-1" v-for="(item, index) in items" :key="item.id">
                        <div class="pb-1 sm:pb-4">
                            <span class="inline-flex items-center justify-center rounded-full">
                                <img class="h-12 sm:h-16" :src="iconsSvg[index]" alt=""/>
                            </span>
                        </div>
                        <div class="font-bold text-lg mb-2 text-black">
                            {{item.name}}
                        </div>
                        <div class="text-black-300">
                            {{item.text}}
                        </div>
                    </div>
                </div>
            </RoundedBlock>
        </UContainer>
    </div>
</template>

<style scoped>

</style>