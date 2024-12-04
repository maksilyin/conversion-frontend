<script setup>
const props = defineProps({
    tag: {
        type: String,
        default: 'button'
    },
    href: {
        type: String,
        default: ''
    },
    icon: {
        type: String,
        default: ''
    }
});

const tagData = computed(() => {
    let tag = props.tag;
    let params = {};

    if (props.href !== '') {
        tag = 'nuxt-link';
        params = {
            to: props.href
        }
    }
    return {
        tag,
        params
    }
})
</script>

<template>
    <component
        :is="tagData.tag"
        v-bind="tagData.params"
        class="transition ease-in hover:bg-opacity-80 inline-flex items-center justify-center whitespace-nowrap gap-5 rounded-xl bg-primary px-5 py-4 text-white font-medium cursor-pointer">
        <slot/>
    </component>
</template>

<style scoped>

</style>