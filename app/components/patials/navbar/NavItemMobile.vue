<script setup lang="ts">
import type {Menu} from "~/types/Menu";
import SlideUpDown from 'vue-slide-up-down'

interface Props {
    item: Menu
}

let isAnimate = false;
const isOpen = ref(false);
const props = defineProps<Props>();
const className = "px-3 xl:px-4 py-2 font-medium text-gray-900 hover:text-secondary dark:text-gray-400 dark:hover:text-secondary flex gap-2 items-center relative";

const isExternal = computed(() => {
    return /^(http|https):\/\//.test(props.item.url)
});

const hasSubmenu = computed(() => {
    return props.item.children.length
});

const itemLink = computed(() => {
    return props.item.url;
});

const clickHandler = (e:PointerEvent) => {
    if (props.item?.component || props.item.children) {
        e.preventDefault();
        isOpen.value = !isOpen.value;
    }
}

const items = computed(() => {
    return
})

onMounted(() => {

});

</script>

<template>
    <div class="group">
        <div>
            <NuxtLinkLocale
                :to="itemLink"
                :class="className"
                @click="clickHandler"
            >
                {{ item.name }}
                <UIcon v-if="item?.component || item.children"
                       class="w-5 h-5" name="material-symbols:keyboard-arrow-down-rounded transition"
                       :class="{'rotate-180': isOpen}"
                />
            </NuxtLinkLocale>
            <slide-up-down :active="isOpen" :duration="500">
                <div class="p-3">
                    <component v-if="item?.component" :is="item.component"/>
                    <div v-else-if="item.children">
                        <NavItemMobile v-for="childItem in item.children" :item="childItem"/>
                    </div>
                </div>
            </slide-up-down>
        </div>
    </div>
</template>

<style scoped>

</style>