<script setup lang="ts">
import {useI18n} from "vue-i18n";

const { getStoragePath } = imagePath();
const { formats } = useFormats();
const { t } = useI18n();
</script>

<template>
    <div class="py-20">
        <UContainer>
            <h2>{{ $t('titles.tools_convert') }}</h2>
            <div class="pb-6" v-for="fileType in formats" :key="fileType.id">
                <div class="flex gap-2 items-center mb-5">
                        <span class="inline-flex items-center justify-center w-8 h-8 flex-shrink">
                            <img
                                v-if="fileType.icon_image"
                                :src="getStoragePath(fileType.icon_image).src"
                                class="w-full h-full object-contain"
                                :alt="fileType.name"
                            />
                            <UIcon v-else-if="fileType.icon" :name="fileType.icon" class="w-full h-full text-orange-400"/>
                        </span>
                    <h3 class="text-lg font-medium text-gray-800">
                        <NuxtLinkLocale class="transition hover:text-primary-600" :to="`/convert/${fileType.slug}`">{{ fileType.name }}</NuxtLinkLocale>
                    </h3>
                </div>
                <div class="flex gap-2">
                    <NuxtLinkLocale
                        v-for="formatItem in fileType.formats"
                        :key="formatItem.id"
                        :to="`/convert/${formatItem.extension}`"
                        class="text-sm text-primary-600 transition hover:text-primary-700"
                    >
                        {{ formatItem.name }}
                    </NuxtLinkLocale>
                </div>
            </div>
        </UContainer>
    </div>
</template>

<style scoped>

</style>