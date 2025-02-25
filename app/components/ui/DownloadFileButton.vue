<script setup>

import IButton from "~/components/ui/IButton.vue";
import {useI18n} from "vue-i18n";
import { FILE_STATUS } from "~/utils/constants"
const { t } = useI18n();
const { isProcessing } = useTask()
const openDropdown = ref(false);
const mobileButton = ref(null);
const widthDropdown = ref('auto');

const props = defineProps({
    removeHandler: {
        type: Function
    },
    downloadHandler: {
        type: Function
    }
})

const { openChooser } = useFileChooser();

const handleDropdown = () => {
    openDropdown.value = !openDropdown.value;
}

const handleClick = (chooser) => {
    return (e) => {
        e.preventDefault()

        if (isProcessing.value) {
            openChooser(chooser)
        }
    }
}

const items = [
    [
        {
            label: t('remove'),
            icon: 'heroicons-outline:x-circle',
            class: 'text-red-500 text-md pl-4 gap-3',
            iconClass: 'text-red-500',
            click: props.removeHandler
        }
    ],
]

const dropDownButtonClass = computed(() => {
    let className = 'rounded-bl-none rounded-tl-none border-l disabled:opacity-50';

    if (props.size === 'small') {
        className += ' w-10';
    }
    else {
        className += ' w-14';
    }

    return className;
})

</script>

<template>
    <div class="flex gap-2 flex-col md:flex-row">
        <div>
            <div ref="mobileButton" class="relative inline-block">
                <UTooltip v-if="status === FILE_STATUS.COMPLETED" :text="$t('download')" openDelay="1000" :popper="{ placement: 'top', arrow: true }"></UTooltip>
                <UDropdown :items="items"
                   v-model:open="openDropdown"
                   :popper="{ placement: 'top-start' }"
                >
                    <span class="flex">
                        <UButton
                            icon="material-symbols:download"
                            color="blue"
                            @click.stop="downloadFile"
                            class="rounded px-1 w-8 justify-center rounded-br-none rounded-tr-none disabled:opacity-50 transition duration-500 hover:bg-blue-dark"
                        />
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
                    </span>
                </UDropdown>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>