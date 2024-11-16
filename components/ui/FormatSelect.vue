<script setup lang="ts">
import { imageFormats } from "~/collections/fileFormats";
import { useI18n } from 'vue-i18n';
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
    }
})

const formatList = computed(() => {
    return [
        {
            label: t('format.images'),
            type: 'image',
            icon: '',
            formats: imageFormats
        }
    ]
});
const emit = defineEmits(['update:modelValue'])
const showTab = ref('image');
const selected = ref([...props.modelValue])
const isOpenModal = ref(false);

const setItem = (value: string) => {
    if (!props.multiple) {
        selected.value = [value]
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

watch(() => props.modelValue, newValue => {
    selected.value = newValue;
})

</script>

<template>
    <div class="flex items-center gap-2">
        {{ label }}
        <span class="border text-xs px-3 py-2 inline-flex items-center justify-between cursor-pointer min-w-[60px] gap-2" @click="isOpenModal=true">
            <span>{{ selectedFormat }}</span>
            <UIcon name="material-symbols:keyboard-arrow-down-rounded" class="w-4 h-4 ml-auto" />
        </span>
    </div>
    <UModal v-model="isOpenModal">
        <div class="flex items-center justify-between p-2">
            <UIcon
                name="i-heroicons-x-mark-20-solid"
                class="w-5 h-5 cursor-pointer ml-auto hover:text-red-500"
                @click="isOpenModal = false"
            />
        </div>
        <div class="flex gap-4 p-4 pt-2">
            <div class="w-36">
                <div
                    v-for="formatNavItem in formatList"
                    :key="formatNavItem.type"
                    class="cursor-pointer p-2 border-b font-medium text-sm transition hover:bg-gray-50 flex items-center gap-2"
                    @hover="showTab = formatNavItem.type"
                >
                    <UIcon name="mage:image" class="w-5 h-5" />{{ formatNavItem.label }}
                </div>
            </div>
            <div class="w-full">
                <div v-for="formatNavItem in formatList" :key="formatNavItem.type" class="flex flex-wrap gap-2" v-show="showTab === formatNavItem?.type">
                    <UBadge
                        v-for="format in formatNavItem.formats"
                        :color="checkItem(format) ? 'primary' : 'gray'"
                        size="md"
                        variant="solid"
                        :ui="{ rounded: 'rounded-none' }"
                        @click="setItem(format)"
                        class="cursor-pointer text-sm"
                    >
                        {{ format }}
                    </UBadge>
                </div>
            </div>
        </div>
    </UModal>
</template>

<style scoped>

</style>