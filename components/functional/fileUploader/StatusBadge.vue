<script setup lang="ts">
import {FILE_STATUS} from "~/utils/constants";
import {useI18n} from "vue-i18n";
const { t } = useI18n();

const props = defineProps({
    status: {
        required: true,
        type: Number
    },
    progress: {
        required: false,
        type: Number,
        default: 0
    },
});

const statusMessage = computed(() => {
    switch (props.status) {
        case FILE_STATUS.LOADING:
            return {
                color: 'blue',
                text: t('status.loading') + ' ' + props.progress + '%'
            }
        case FILE_STATUS.UPLOADED:
            return {
                color: 'blue',
                text: t('status.uploaded')
            }
        case FILE_STATUS.ERROR:
            return {
                color: 'red',
                text: t('status.error')
            }
        case FILE_STATUS.DELETE:
            return {
                color: 'red',
                text: t('status.delete')
            }
        case FILE_STATUS.PROCESSING:
            return {
                color: 'purple',
                text: t('status.processing')
            }
        case FILE_STATUS.COMPLETED:
            return {
                color: 'green',
                text: t('status.completed')
            }
        default:
            return {
                color: 'blue',
                text: t('status.created')
            }
    }
});

const className = computed(() => {
    const color = statusMessage.value.color;
    return `ring-1 ring-inset text-xs text-medium py-1 px-2 inline-flex item-center rounded`
})
</script>

<template>
    <UBadge
        size="sm"
        :color="statusMessage.color"
        variant="subtle"
        :ui="{ rounded: 'rounded' }"
        :label="statusMessage.text"
        :trailing="false"
    />
</template>

<style scoped>
.status-green {
    @apply ring-green-500 text-green-500 bg-green-50
}
.status-purple {
    @apply ring-purple-500 text-purple-500 bg-purple-50
}
.status-red {
    @apply ring-red-500 text-red-500 bg-red-50
}
.status-blue {
    @apply ring-blue-500 text-blue-500 bg-blue-50
}
</style>