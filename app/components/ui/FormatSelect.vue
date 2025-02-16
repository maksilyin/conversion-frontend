<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { converterIconsV2 } from "~/collections/icons"
const { t } = useI18n();

const props = defineProps({
    modelValue: {
        type: Array,
        default: () => []
    },
    multiple: {
        default: false,
        type: Boolean,
    },
    label: {
        default: '',
        type: String,
    },
    extension: {
        default: '',
        type: String,
    },
    hiddenSelect: {
        default: false,
        type: Boolean,
    }
})

const { filteredFormats, formats } = useFormats(props.extension);

const emit = defineEmits(['update:modelValue'])
const showTab = ref('image');
const selected = ref([...props.modelValue])
const isOpenModal = ref(false);
const isOpenModalToggle = ref(false);

const setItem = (value: string) => {
    if (!props.multiple) {
        selected.value = [value]
        isOpenModal.value = false;
        isOpenModalToggle.value = false
    }
    else {
        const newValue = Object.assign([], selected.value);

        if (!checkItem(value)) {
            newValue.push(value);
        }
        else {
            const index = newValue.indexOf(value);
            newValue.splice(index, 1);
        }

        selected.value = newValue;
    }

    emit('update:modelValue', selected.value)
}

const selectedFormat = computed(() => {
    if (props.modelValue.length === 1) {
        return props.modelValue[0];
    }
    else if (props.modelValue.length > 1) {
        return t('chosen') + ': ' + props.modelValue.length;
    }

    return '';
})

const checkItem = (value: string) => {
    return selected.value.includes(value);
}

const handleDropdown = () => {
    isOpenModalToggle.value = !isOpenModalToggle.value
    isOpenModal.value = !isOpenModalToggle.value
}

watch(() => props.modelValue, newValue => {
 //   selected.value = newValue;
})

</script>

<template>
    <div v-if="!multiple && hiddenSelect" class="flex items-center gap-2">
        <span>{{ label }}</span>
        <span>{{ selectedFormat }}</span>
    </div>
    <UPopover :ui="{container: 'group z-[200]'}" v-if="!hiddenSelect" :popper="{ arrow: true }" v-model:open="isOpenModal">
        <div class="flex items-center gap-2" @click="handleDropdown">
            {{ label }}
            <span class="w-[70px] md:w-[80px] border rounded border-gray-300 text-xs px-2 md:px-3 py-1 md:py-2 inline-flex items-center justify-between cursor-pointer min-w-[60px] gap-2 transition hover:border-primary-500 hover:text-primary-500" @click="isOpenModal=true">
                <span class="mx-auto">{{ selectedFormat.toUpperCase() }}</span>
                <UIcon name="material-symbols:keyboard-arrow-down-rounded" class="w-4 h-4 ml-auto" />
            </span>
        </div>
        <template #panel>
            <div class="flex gap-2 p-2 pt-2 h-[330px] w-[450px]">
                <div class="w-56 rounded border border-gray-200 p-2">
                    <div
                        v-for="formatNavItem in filteredFormats"
                        :key="formatNavItem.id"
                        class="cursor-pointer py-1 pl-1 pr-2 rounded border border-transparent font-medium text-sm transition hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 flex items-center gap-2"
                        :class="{'bg-blue-50 !border-blue-300 text-blue-600': showTab === formatNavItem.slug}"
                        @mouseover="showTab = formatNavItem.slug"
                    >
                        <img v-if="converterIconsV2[formatNavItem.slug]" class="w-6 h-6 object-contain" :src="converterIconsV2[formatNavItem.slug]" :alt="formatNavItem.name" />
                        <UIcon v-else-if="formatNavItem.icon" :name="formatNavItem.icon" class="w-5 h-5" />{{ formatNavItem.name }}
                    </div>
                </div>
                <div class="w-full rounded border border-gray-200 p-2 overflow-y-auto scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg scrollbar-thin">
                    <div v-for="formatNavItem in filteredFormats" :key="formatNavItem.id" class="flex flex-wrap gap-2" v-show="showTab === formatNavItem.slug">
                    <span
                        v-for="format in formatNavItem.formats"
                        @click="setItem(format.extension)"
                        class="cursor-pointer rounded text-sm w-[calc(100%/3-0.34rem)] font-medium text-center text-gray-500 transition border border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-600 py-1 px-2"
                        :class="{'!bg-primary-50 !border-primary-500 !text-primary-600': checkItem(format.extension)}"
                    >
                        {{ format.extension.toUpperCase() }}
                    </span>
                    </div>
                </div>
            </div>
        </template>
    </UPopover>
</template>

<style scoped>

</style>