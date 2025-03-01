<script setup>
import {useI18n} from "vue-i18n";

const { t } = useI18n();
const openDropdown = ref(false);
const mobileButton = ref(null);

const props = defineProps({
    isDownloadProcessing: {
        type: Boolean,
        default: false,
    },
    isRemoveProcessing: {
        type: Boolean,
        default: false,
    },
    removeHandler: {
        type: Function
    },
    downloadHandler: {
        type: Function
    }
})

const handleDropdown = () => {
    openDropdown.value = !openDropdown.value;
}

const items = computed(() => {
    return [
        [
            {
                label: t('remove'),
                icon: props.isRemoveProcessing ? 'svg-spinners:180-ring-with-bg' : 'heroicons-outline:x-circle',
                class: 'text-red-500 text-md pl-4 gap-3',
                iconClass: 'text-red-500',
                click: props.removeHandler
            }
        ],
    ]
})

const isProcessing = computed(() => {
    return props.isDownloadProcessing || props.isRemoveProcessing
})

</script>

<template>
    <div class="flex gap-2 flex-col md:flex-row">
        <div>
            <div ref="mobileButton" class="relative inline-block">
                    <span class="flex">
                        <UTooltip
                            :text="$t('download')"
                            openDelay="1000" :popper="{ placement: 'top', arrow: true }"
                        >
                            <UButton
                                color="blue"
                                @click.stop="downloadHandler"
                                class="rounded px-1 w-8 justify-center rounded-br-none rounded-tr-none disabled:opacity-50 transition duration-500 hover:bg-blue-dark"
                                :disabled="isProcessing"
                            >
                                <template #trailing>
                                    <UIcon v-if="isDownloadProcessing" name="svg-spinners:180-ring-with-bg" class="w-4 h-4" />
                                    <UIcon v-else name="material-symbols:download" class="w-4 h-4" />
                                </template>
                            </UButton>
                         </UTooltip>
                        <UDropdown :items="items"
                           v-model:open="openDropdown"
                           :popper="{ placement: 'top-start' }"
                           :ui="{padding: 'p-0'}"
                        >
                            <UButton
                                @click.stop="handleDropdown"
                                color="blue"
                                size="xl"
                                class="rounded rounded-bl-none justify-center rounded-tl-none border-l disabled:opacity-50 w-5 p-0 text-xs transition duration-500 hover:bg-blue-dark"
                                :disabled="isProcessing"
                            >
                                <template #trailing>
                                    <UIcon name="i-heroicons-chevron-down-20-solid" class="w-4 h-4" />
                                </template>
                            </UButton>
                        </UDropdown>
                    </span>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>