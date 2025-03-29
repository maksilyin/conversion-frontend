<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import FormatSelectSelect from "./FormatSelectSelect.vue";
import FormatSelectPanel from "./FormatSelectPanel.vue";
import { useMediaQuery } from '@vueuse/core'
const modal = useModal();
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

defineShortcuts({
    o: () => isOpenModal.value = !isOpenModal.value
})

const { filteredFormats, searchFormats, formats } = useFormats(props.extension);

const emit = defineEmits(['update:modelValue'])
const selected = ref([...props.modelValue])
const isOpenPopover = ref(false);
const isOpenModal = ref(false);
const isMobile = useMediaQuery('(max-width: 768px)')

const setItem = (value: string) => {
    if (!props.multiple) {
        selected.value = [value]
        isOpenPopover.value = false;
        isOpenModal.value = false;
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

</script>

<template>
    <div v-if="!multiple && hiddenSelect" class="flex items-center gap-2 justify-center">
        <span>{{ label }}</span>
        <span>{{ selectedFormat }}</span>
    </div>
    <div v-if="!hiddenSelect">
        <div v-if="isMobile">
            <FormatSelectSelect
                :click-handler="() => {isOpenModal = !isOpenModal}"
                :label="label"
                :selected-format="selectedFormat"
            />
        </div>
        <UPopover v-else :ui="{container: 'group z-[200]'}" :modal="true" :popper="{ arrow: true }" v-model:open="isOpenPopover">
            <FormatSelectSelect
                :label="label"
                :selected-format="selectedFormat"
            />
            <template #panel>
                <FormatSelectPanel
                    :formats="filteredFormats"
                    :click-handler="setItem"
                    :check-item="checkItem"
                />
            </template>
        </UPopover>
    </div>
    <UModal v-model="isOpenModal">
        <div class="p-2">
            <UButton
                variant="ghost"
                icon="i-heroicons-x-mark-20-solid text-white"
                class="absolute right-0 -top-8 hover:bg-transparent"
                @click="isOpenModal = false"
            />
            <FormatSelectPanel
                :formats="filteredFormats"
                :click-handler="setItem"
                :check-item="checkItem"
            />
        </div>
    </UModal>
</template>

<style scoped>

</style>