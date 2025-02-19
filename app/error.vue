<script setup lang="ts">
import type { NuxtError } from '#app'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const props = defineProps({
    error: Object as () => NuxtError
})

type ErrorCodes = 403 | 'default';

interface ErrorMessage {
    title: string;
    message: string;
}

const errorMessages = computed<Record<ErrorCodes, ErrorMessage>>(() => {
    return {
        403: {
            title: t('page.error.error_403_title'),
            message: t('page.error.error_403_message'),
        },
        default: {
            title: t('page.error.error_default_title'),
            message: t('page.error.error_default_message'),
        }
    };
});

const errorMessage = computed(() => {
    return errorMessages.value[props.error.statusCode as ErrorCodes] ?? errorMessages.value.default;
});
</script>

<template>
    <NuxtLoadingIndicator />
    <NuxtLayout>
        <UContainer class="pb-16">
            <div v-if="error.statusCode === 404" class="prose mx-auto mt-10 dark:prose-invert">
                <h1 class="text-center text-9xl mb-10 text-black-900 dark:text-gray-200">40<span class="text-secondary">4</span></h1>
                <p class="my-5 text-center text-3xl mb-10 uppercase font-bold">{{$t('page.error.page_not_found')}}</p>
                <p class="text-center">{{$t('page.error.not_found_text')}}</p>
                <div class="text-center">
                    <NuxtLinkLocale
                        class="text-sm inline-flex items-center gap-2 px-5 py-3 rounded border border-secondary bg-orange-main transition-all hover:border-secondary-900 hover:bg-orange-300 text-white dark:text-gray-400 hover:dark:text-white no-underline font-normal"
                        to="/"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                            <path stroke-linecap="round" stroke-width="2px" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        {{ $t('back_home') }}
                    </NuxtLinkLocale>
                </div>
            </div>
            <div v-else class="prose mx-auto mt-10 dark:prose-invert">
                <h1 class="text-center text-9xl mb-10 text-black-900 dark:text-gray-200">{{ error.statusCode }}</h1>
                <p class="my-5 text-center text-3xl mb-10 uppercase font-bold">
                    {{ errorMessage.title }}
                </p>
                <p class="text-center">
                    {{ errorMessage.message }}
                </p>
                <div class="text-center">
                    <NuxtLinkLocale
                        class="text-sm inline-flex items-center gap-2 px-3 py-3 rounded border border-secondary bg-orange-main transition-all hover:border-secondary-900 hover:bg-orange-300 text-white dark:text-gray-400 hover:dark:text-white no-underline font-normal"
                        to="/"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                            <path stroke-linecap="round" stroke-width="2px" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        {{ $t('back_home') }}
                    </NuxtLinkLocale>
                </div>
            </div>
        </UContainer>
    </NuxtLayout>
</template>