<script setup lang="ts">

const sections = [
    {
        id: 1,
        label: 'Конвертировать',
        links: [
            {
                label: 'Конвертировать изображения',
                icon: 'material-symbols:imagesmode-outline-rounded',
                to: '/convert-img',
                iconClass: "w-5 h-5"
            },
        ]
    },
]

</script>

<template>
    <div class="flex gap-2">
        <div v-for="section in sections" :key="section.id">
            <span class="flex font-medium text-md items-center px-2 pb-3 gap-1">
                {{ section.label }}
            </span>
            <UDivider class="pb-2"/>
            <UVerticalNavigation :links="section.links" />
        </div>
    </div>
</template>

<style scoped>

</style>