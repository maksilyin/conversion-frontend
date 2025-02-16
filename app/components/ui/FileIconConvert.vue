<script setup lang="ts">
const defaultColor = '#ed981e';

const props = defineProps({
    color: {
        default: defaultColor
    },
    label: {
        required: true,
        type: String,
    }
})

const styles = computed(() => {
    const color = props.color !== '' ? props.color : defaultColor;
    const fontSize = props.label?.length > 4 ? '12' : '14';
    return `font-size: ${fontSize}px;`
})

const iconColor = computed(() => {
    return props.color !== '' ? props.color : defaultColor
})

</script>

<template>
    <div class="relative">
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13">
            <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1-2">
                    <path class="cls-1" :fill="iconColor" :stroke="iconColor" d="M13,5.19v3.6c0,3-1.2,4.21-4.21,4.21H5.21C2.21,13,1,11.8,1,8.79V5.19C1,2.2,2.2,1,5.21,1h3.6C11.8,1,13,2.2,13,5.19Z" transform="translate(-0.5 -0.5)"/>
                </g>
            </g>
        </svg>
        <span
            class="absolute w-full h-full inset-0 font-medium text-sm leading-[8px] text-white flex justify-center items-center"
            :style="styles"
        >
            {{label}}
        </span>
    </div>
</template>

<style scoped>
.cls-1{stroke-linecap:round;stroke-linejoin:round;stroke-width: 0.4px}
</style>