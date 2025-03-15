<script setup>
import {useI18n} from "vue-i18n";

const { t } = useI18n();
const openDropdown = ref(false);
const mobileButton = ref(null);
const widthDropdown = ref('auto');
const { isSomeProcessing, isDownloadZipLoading, isProcessingTask } = useProcessing();

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
        if (mobileButton.value) {
            const headlessui_menu_items = mobileButton.value.querySelector('[id^="headlessui-menu-items"]');

            if (headlessui_menu_items) {
                widthDropdown.value = mobileButton.value.clientWidth
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
                class: 'text-red-500 text-md px-6',
                iconClass: 'text-red-500 h-6 w-6',
                click: props.removeHandler
            }
        ],
    ]
})

</script>

<template>
    <div class="flex gap-2 flex-col md:flex-row">
        <div>
            <div ref="mobileButton" class="relative inline-block">
                <UDropdown :items="items"
                           v-model:open="openDropdown"
                           :popper="{ placement: 'bottom-start' }"
                           :ui="{padding: 'px-0'}"
                >
                    <span class="flex">
                        <UButton
                            size="xl"
                            :icon="!isDownloadZipLoading ? 'material-symbols:download' : 'svg-spinners:180-ring-with-bg'"
                            class="text-md rounded-br-none rounded-tr-none justify-center h-12 bg-blue-dark-100 transition duration-500 hover:bg-blue-dark ml-auto px-6"
                            :label="$t('download_all')"
                            :trailing="false"
                            @click.stop="downloadZipHandler"
                            :disabled="isSomeProcessing"
                        />
                            <UButton
                                @click.stop="handleDropdown"
                                icon="i-heroicons-chevron-down-20-solid"
                                color="blue"
                                size="xl"
                                class="rounded-bl-none justify-center rounded-tl-none border-l w-12 p-0 text-xs transition duration-500 bg-blue-dark-100 hover:bg-blue-dark"
                                :disabled="isSomeProcessing"
                            />
                    </span>
                </UDropdown>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>