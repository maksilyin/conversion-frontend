<script setup lang="ts">
import {FILE_STATUS} from "~/utils/constants";
import {useI18n} from "vue-i18n";
import ProgressBar from "~/components/functional/fileUploader/ProgressBar.vue";
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

const progressPercent = computed(() => {
    return props.progress + '%'
})

const statusMessage = computed(() => {
    switch (props.status) {
        case FILE_STATUS.PREPARE:
            return {
                color: 'blue',
                status: 'loading',
                text: t('status.created')
            }
        case FILE_STATUS.LOADING:
            return {
                color: 'blue',
                status: 'loading',
                text: t('status.loading') + ' ' + progressPercent.value
            }
        case FILE_STATUS.UPLOADED:
            return {
                color: 'blue',
                status: 'uploaded',
                text: t('status.uploaded')
            }
        case FILE_STATUS.ERROR:
            return {
                color: 'red',
                status: 'error',
                text: t('status.error')
            }
        case FILE_STATUS.DELETE:
            return {
                color: 'red',
                status: 'delete',
                text: t('status.delete')
            }
        case FILE_STATUS.PROCESSING:
            return {
                color: 'purple',
                status: 'processing',
                text: t('status.processing')
            }
        case FILE_STATUS.COMPLETED:
            return {
                color: 'green',
                status: 'completed',
                text: t('status.completed')
            }
        case FILE_STATUS.DOWNLOAD:
            return {
                color: 'green',
                status: 'download',
                text: t('status.download') + ' ' + progressPercent.value
            }
        default:
            return {
                color: 'blue',
                status: '',
                text: t('status.created')
            }
    }
});

const className = computed(() => {
    const color = statusMessage.value.color;
    return `ring-1 ring-inset text-xs text-medium py-1 px-2 inline-flex item-center rounded`
})

const classProcessing = computed(() => {

})
</script>

<template>
    <UBadge
        class="relative w-full justify-center"
        size="sm"
        :color="statusMessage.color"
        variant="subtle"
        :ui="{ rounded: 'rounded' }"
        :trailing="false"
    >
        <span
            v-if="props.status === FILE_STATUS.PROCESSING
            || props.status === FILE_STATUS.LOADING
            || props.status === FILE_STATUS.PREPARE
            || props.status === FILE_STATUS.DELETE"
            class="progress-bar absolute"
            :class="[
                `process-${statusMessage.status}`
            ]"
        />
        <span
            class="relative z-1 py-1 uppercase"
            :class="[
                `process-text-${statusMessage.status}`
            ]"
        >
            {{ statusMessage.text }}
        </span>
    </UBadge>
</template>

<style scoped>
.status-green {
    @apply ring-green-500 bg-green-50 text-white
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

.process-delete {
    @apply bg-red-100 ring-1 ring-red-300 ring-opacity-25;
}

.process-loading {
    @apply bg-blue-100 ring-1 ring-blue-300 ring-opacity-100;
}

.process-processing {
    @apply ring-purple-500 bg-purple-100 ring-1 ring-opacity-25;
}

.process-text-delete {
    @apply text-red-500;
}

.process-text-loading {
    @apply text-blue-500;
}

.process-text-process {
    @apply text-purple-500;
}

.progress-bar {
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    top: 1px;
    left: 1px;
    background-image: linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.2) 75%,
        transparent 75%,
        transparent
    );
    background-size: 40px 40px;
    animation: move-bg 1s linear infinite;
    border-radius: 4px;
    overflow: hidden;
}
@keyframes move-bg {
    from {
        background-position: 0 0;
    }
    to {
        background-position: 40px 0;
    }
}
</style>