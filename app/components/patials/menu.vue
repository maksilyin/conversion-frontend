<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const localePath = useLocalePath();

const items = [
    {
        name: t('home'),
        link: '/',
        children: [],
    },
    {
        name: t('categories'),
        link: '/categories/',
        children: [],
    }
];
</script>

<template>
    <ul class="flex ml-auto">
        <li :class="{dropdown: item.children.length}" v-for="item in items" :key="item.link">
            <nuxt-link
                class="nav-link uppercase text-black text-lg px-4 py-3 inline-block"
                :class="{'dropdown-toggle': item.children.length}"
                :to="localePath(item.link)"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                {{ item.name }}
            </nuxt-link>
            <div v-if="item.children.length" class="dropdown-menu" aria-labelledby="navbarDropdown">
                <nuxt-link class="dropdown-item" :to="localePath(subItem.link)" v-for="subItem in item.children">
                    {{ subItem.name }}
                </nuxt-link>
            </div>
        </li>
    </ul>
</template>

<style scoped>

</style>