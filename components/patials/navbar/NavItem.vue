<script setup lang="ts">
import type {Menu} from "~/types/Menu";

interface Props {
    item: Menu
}

const props = defineProps<Props>();
const className = "px-3 xl:px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-dark dark:text-gray-400 dark:hover:text-secondary flex gap-2 items-center relative";

const isExternal = computed(() => {
    return /^(http|https):\/\//.test(props.item.url)
});

const hasSubmenu = computed(() => {
    return props.item.children.length
});

const itemLink = computed(() => {
    return props.item.url;
});

const open = ref(true)

onMounted(() => {

});

</script>

<template>
    <div class="group">
        <div class="flex gap-2 items-center">
            <UPopover v-if="item?.component" mode="hover" :popper="{ placement: 'bottom-start' }">
                <NuxtLinkLocale
                    :to="itemLink"
                    :class="className"
                >
                    {{ item.name }}
                    <UIcon class="w-5 h-5" name="material-symbols:keyboard-arrow-down-rounded"/>
                </NuxtLinkLocale>
                <template #panel>
                    <div class="p-4">
                        <component :is="item.component"/>
                    </div>
                </template>
            </UPopover>

            <UDropdown v-else-if="item.children" v-model:open="open" :items="item.children" mode="hover" :popper="{ placement: 'bottom-start' }">
                <NuxtLinkLocale
                    :to="itemLink"
                    :class="className"
                >
                    {{ item.name }}
                    <UIcon class="w-5 h-5" name="material-symbols:keyboard-arrow-down-rounded"/>
                </NuxtLinkLocale>
            </UDropdown>
            <NuxtLinkLocale
                v-else
                :to="itemLink"
                :class="className"
            >
                {{ item.name }}
            </NuxtLinkLocale>
        </div>
    </div>
</template>

<style scoped>

</style>