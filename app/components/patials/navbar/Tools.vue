<script setup lang="ts">
import { converterIcons } from "~/collections/icons"
import {useI18n} from "vue-i18n";
const { t } = useI18n();

const sections = [
    {
        id: 1,
        label: t('convert'),
        image: converterIcons.convert,
        links: [
            {
                label: t('tools.image'),
                image: converterIcons.image,
                to: '/convert/image',
            },
            {
                label:  t('tools.document'),
                image: converterIcons.document,
                to: '/convert/document',
            },
            {
                label: t('tools.audio'),
                image: converterIcons.audio,
                to: '/convert/audio',
            },
            {
                label: t('tools.video'),
                image: converterIcons.video,
                to: '/convert/video',
            },
            {
                label: t('tools.archive'),
                image: converterIcons.archive,
                to: '/convert/archive',
            },
            {
                label: t('tools.font'),
                image: converterIcons.font,
                to: '/convert/font',
            },
            {
                label: t('tools.spreadsheet'),
                image: converterIcons.spreadsheet,
                to: '/convert/spreadsheet',
            },
            {
                label: t('tools.presentation'),
                image: converterIcons.presentation,
                to: '/convert/presentation',
            },
            {
                label: t('tools.vector'),
                image: converterIcons.vector,
                to: '/convert/vector',
            },
        ]
    },
]

</script>

<template>
    <div class="flex gap-2">
        <div v-for="section in sections" :key="section.id">
            <span class="flex font-medium text-md items-center px-2 pb-3 gap-3 text-gray-500 uppercase">
                <img v-if="section.image" class="w-6 h-6 object-contain opacity-80" :src="section.image" :alt="section.label" />
                {{ section.label }}
            </span>
            <UDivider class="pb-2"/>
            <UVerticalNavigation :links="section.links">
                <template #default="{ link }">
                    <span class="relative text-md flex items-center gap-3 text-gray-800">
                        <img v-if="link.image" class="w-6 h-6 object-contain" :src="link.image" :alt="link.label" />
                        {{ link.label }}
                    </span>
                </template>
            </UVerticalNavigation>
        </div>
    </div>
</template>

<style scoped>

</style>