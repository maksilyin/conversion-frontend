<script setup lang="ts">
import {useI18n} from "vue-i18n";
import { converterIcons } from "~/collections/icons"
import FileTypeIcon from "~/components/ui/FileTypeIcon.vue";
const { getStoragePath } = imagePath();
const { formats } = useFormats();
const { t } = useI18n();
</script>

<template>
    <div class="py-20">
        <UContainer>
            <h2 class="text-center text-black text-4xl font-bold mb-6">
                {{ $t('titles.tools_convert') }}
            </h2>
            <p class="text-center text-black-300 mb-16 text-lg">
                {{ $t('subtitles.categories_list') }}
            </p>
            <div class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 min-h-full">
                <NuxtLinkLocale :to="`/convert/${fileType.slug}`"
                                class="group p-5 relative shadow-ring-5 shadow-black-300/20 rounded transition duration-200 hover:shadow-ring-10 hover:shadow-black-300/30 hover:scale-105" v-for="fileType in formats" :key="fileType.id">
                    <div class="flex flex-col gap-2">
                        <FileTypeIcon class="justify-center w-full" :file-type="fileType" :converter-icons="converterIcons"/>
                        <h3 class="text-lg font-medium text-gray-800 text-center">
                            <span class="group-hover:text-primary-600 transition">
                                {{ fileType.name }}
                            </span>
                        </h3>
                        <p v-if="fileType.excerpt" class="text-sm text-center">{{ fileType.excerpt }}</p>
                    </div>
                </NuxtLinkLocale>
            </div>
        </UContainer>
    </div>
</template>

<style scoped>

</style>