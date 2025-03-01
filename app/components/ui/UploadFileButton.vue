<script setup>

import IButton from "~/components/ui/IButton.vue";
import {useI18n} from "vue-i18n";
const { t } = useI18n();
const { isProcessingTask } = useTask()
const openDropdown = ref(false);
const mobileButton = ref(null);
const widthDropdown = ref('auto');

const props = defineProps({
    hideChoosers: {
        default: false
    },
    size: {
        type: String,
    }
})

const { openChooser } = useFileChooser();

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

const handleClick = (chooser) => {
    return (e) => {
        e.preventDefault()

        if (isProcessingTask.value) {
            openChooser(chooser)
        }
    }
}

const items = [
    [
        {
            label: t('from_dropbox'),
            icon: 'ri:dropbox-fill',
            class: 'text-black text-md pl-4 gap-3',
            iconClass: 'text-black',
            click: handleClick('dropbox')
        }
    ],
    [
        {
            label: t('from_google'),
            icon: 'uil:google-drive',
            class: 'text-black text-md pl-4 gap-3',
            iconClass: 'text-black',
            click: handleClick('google')
        }
    ]
]

const dropDownButtonClass = computed(() => {
    let className = 'p-2 justify-center relative rounded-bl-none rounded-tl-none border-l disabled:bg-blue-dark-100 disabled:opacity-50';

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
                <UDropdown :items="items"
                   v-model:open="openDropdown"
                   :popper="{ placement: 'bottom-start' }"
                >
                    <span class="flex">
                        <slot></slot>
                        <IButton
                            icon="i-heroicons-chevron-down-20-solid"
                            @click.stop="handleDropdown"
                            size="xl"
                            :class="dropDownButtonClass"
                            :disabled="isProcessingTask"
                        >
                        </IButton>
                    </span>
                </UDropdown>
            </div>
        </div>
        <IButton
            v-if="!hideChoosers"
            @click.stop="openChooser('dropbox')"
            size="xl"
            class="w-14 p-2 justify-center hidden lg:flex text-xl disabled:opacity-50"
            icon="ri:dropbox-fill"
            :disabled="isProcessingTask"
        />
        <IButton
            v-if="!hideChoosers"
            @click.stop="openChooser('google')"
            size="xl"
            class="w-14 p-2 justify-center hidden lg:flex text-xl disabled:opacity-50"
            icon="uil:google-drive"
            :disabled="isProcessingTask"
        />
    </div>
</template>

<style scoped>

</style>