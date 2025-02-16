<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import {useLocale} from "~/composables/useLocale";
const { availableLocales, locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const { locales } = useLocale();

const options = computed(() => {
    return locales.value.map(localeItem => {
        return {
            id: localeItem.id,
            label: localeItem.name,
            href: switchLocalePath(localeItem.code),
            code: localeItem.code
        }
    })
})

const currentLocale = computed(() => {
    const loc = options.value.find(localeItem => localeItem.code == locale.value)
    return loc ? loc : locales.value[0]
});

const current = ref(currentLocale.value);

watch(current, (newValue: Record<string, any>) => {
    console.log(newValue.href)
    location.href = newValue.href;
})


</script>

<template>
    <USelectMenu
        v-model="current"
        icon="ph:globe"
        :options="options"
        :popper="{placement: 'top'}"
    />
</template>

<style scoped></style>