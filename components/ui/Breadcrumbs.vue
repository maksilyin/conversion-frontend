<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {useBreadcrumbs} from "~/composables/useBreadcrumbs";
const { t } = useI18n();
const localePath = useLocalePath();
const linksDefault:BreadcrumbItemProps[] = useBreadcrumbItems().value;
const { links } = useBreadcrumbs();

const props = defineProps({
    links: {
        default: null,
    },
})

const items = computed<BreadcrumbItemProps[]>(() => {
    if (props.links || links.length) {
        const itemsCurrent:BreadcrumbItemProps[] = props.links ? [...props.links] : [...links];

        itemsCurrent.unshift({
            ariaLabel: t('breadcrumb.items.index.ariaLabel'),
            label: t('breadcrumb.items.index.label'),
            current: false,
            to: localePath('/'),
        });

        return itemsCurrent
    }

    return linksDefault
})

const itemsSchemaOrg = computed(() => {
    return items.value.map(item => {
        return {
            name: item.label, item: item?.to
        }
    })
})

useSchemaOrg([
    defineBreadcrumb({
        itemListElement: itemsSchemaOrg
    }),
])

const uiClass = {
    ol: "flex items-center gap-x-1.5",
    li: "flex items-center gap-x-1.5 text-gray-500 dark:text-gray-400 text-sm leading-6 min-w-0",
    active: 'text-gray-400 dark:text-gray-600',
    inactive: 'hover:text-blue-dark dark:hover:text-primary',
    base: 'flex items-center gap-x-1.5 group min-w-0 text-xs font-normal',
}

</script>

<template>
    <UBreadcrumb
        class="pt-6"
        :ui="uiClass"
        divider="/"
        :links="items"
    />
</template>

<style scoped>

</style>