<script setup lang="ts">
import type {FileFormat} from "~/types/FileFormat";

const { getStoragePath } = imagePath();
const props = defineProps({
    formatTo: {
        type: Object as PropType<FileFormat>,
        required: true
    },
    formatFrom: {
        type: Object as PropType<FileFormat>,
        default: null
    }
})
</script>

<template>
    <div class="py-20">
        <UContainer>
            <div class="grid grid-cols sm:grid-cols-2 gap-4">
                <UCard v-if="formatFrom?.excerpt">
                    <div class="text-center pb-2">
                        <span class="inline-flex items-center justify-center w-16 h-16">
                            <img
                                v-if="formatFrom.icon_image"
                                :src="getStoragePath(formatFrom.icon_image).src"
                                class="w-full h-full object-contain"
                                :alt="formatFrom.name"
                            />
                            <UIcon v-else-if="formatFrom.icon" :name="formatFrom.icon" class="w-full h-full"/>
                        </span>
                    </div>
                    {{formatFrom.excerpt}}
                </UCard>
                <UCard v-if="formatTo?.excerpt">
                    <div class="text-center pb-2">
                        <span class="inline-flex items-center justify-center w-16 h-16">
                            <img
                                v-if="formatTo.icon_image"
                                :src="getStoragePath(formatTo.icon_image).src"
                                class="w-full h-full object-contain"
                                :alt="formatTo.name"
                            />
                            <UIcon v-else-if="formatTo.icon" :name="formatTo.icon" class="w-full h-full"/>
                        </span>
                    </div>
                    {{formatTo.excerpt}}
                </UCard>
            </div>
        </UContainer>
    </div>
</template>

<style scoped>

</style>