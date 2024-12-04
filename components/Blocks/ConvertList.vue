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
                <div class="font-medium text-xl mb-2 flex items-center gap-2">
                     <span v-if="fileType.icon_image || fileType.icon" class="inline-flex items-center justify-center w-6 h-6">
                        <img
                            v-if="fileType.icon_image"
                            :src="getStoragePath(fileType.icon_image).src"
                            class="w-full h-full object-contain"
                            :alt="fileType.name"
                        />
                        <UIcon v-else-if="fileType.icon" :name="fileType.icon" class="w-full h-full"/>
                    </span>
                    {{ fileType.name }}
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