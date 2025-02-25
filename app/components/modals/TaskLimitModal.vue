<script setup lang="ts">
const modal = useModal();
</script>

<template>
    <UModal
        :ui="{
            width: 'w-full sm:max-w-2xl',
            overlay: {
                background: 'bg-black/50 dark:bg-gray-800/75'
            }
        }"
    >
        <UCard
            :ui="{
                base: 'h-full flex flex-col',
                divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                body: {
                    base: 'grow'
                }
            }"
        >
            <template #header>
                <div class="flex items-center justify-between">
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="ml-auto" @click="modal.close()"/>
                </div>
                <div class="text-lg text-center">
                    {{ $t('modal.limit') }}
                </div>
            </template>
        </UCard>
    </UModal>
</template>

<style scoped>

</style>