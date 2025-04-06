<script setup>
import {useI18n} from "vue-i18n";
import {useMediaQuery} from "@vueuse/core";

const { t } = useI18n();
const openDropdown = ref(false);
const dropdownButton = ref(null);
const widthDropdown = ref('auto');
const { isSomeProcessing, isDownloadZipLoading, isProcessingTask, downLoadZipProgress } = useProcessing();
const isMobile = useMediaQuery('(max-width: 640px)')

const props = defineProps({
    downloadZipHandler: {
        type: Function
    },
    removeHandler: {
        type: Function
    },
})

const handleDropdown = () => {
    openDropdown.value = !openDropdown.value;
    setTimeout(() => {
        if (dropdownButton.value) {
            const headlessui_menu_items = dropdownButton.value.querySelector('[id^="headlessui-menu-items"]');

            if (headlessui_menu_items) {
                widthDropdown.value = dropdownButton.value.clientWidth

                if (isMobile.value) {
                    widthDropdown.value -= 15;
                }

                headlessui_menu_items.style.width = widthDropdown.value + 'px'
            }
        }
    }, 0)
}

const items = computed(() => {
    return [
        [
            {
                label: t('remove_all'),
                icon: isProcessingTask.value ? 'svg-spinners:180-ring-with-bg' : 'heroicons-outline:x-circle',
                class: 'text-red-500 text-md px-3.5',
                iconClass: 'text-red-500 h-6 w-6',
                click: props.removeHandler
            }
        ],
    ]
})

const downloadingText = computed(() => {
    return isDownloadZipLoading.value ? (t('download_all') + ' ' + downLoadZipProgress.value + '%') : t('download_all');
})

</script>

<template>
    <div class="flex gap-2 flex-col md:flex-row w-full sm:w-auto md:pr-5 lg:pr-0">
        <div>
            <div ref="dropdownButton" class="relative sm:inline-block">
                <UDropdown
                    class="w-full"
                    :items="items"
                    v-model:open="openDropdown"
                    :popper="{ placement: 'bottom-start' }"
                    :ui="{padding: 'px-0'}"
                >
                    <span class="flex w-full">
                        <UButton
                            size="xl"
                            :icon="!isDownloadZipLoading ? 'material-symbols:download' : 'svg-spinners:180-ring-with-bg'"
                            class="download-btn btn-blue"
                            :label="downloadingText"
                            :trailing="false"
                            @click.stop="downloadZipHandler"
                            :disabled="isSomeProcessing"
                        />
                            <UButton
                                @click.stop="handleDropdown"
                                icon="i-heroicons-chevron-down-20-solid"
                                color="blue"
                                size="xl"
                                class="dropdown-btn btn-blue"
                                :disabled="isSomeProcessing"
                            />
                    </span>
                </UDropdown>
            </div>
        </div>
    </div>
</template>

<style scoped>
.download-btn {
    @apply justify-center h-12 transition duration-500 rounded-none sm:rounded-tl-md sm:rounded-bl-md
    sm:ml-auto flex-grow sm:flex-grow-0;
}
.dropdown-btn {
    @apply rounded-none sm:rounded-tr-md flex-shrink-0 sm:rounded-br-md justify-center border-l w-12 p-0 text-xs
    transition duration-500;
}
</style>