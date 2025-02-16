<script setup lang="ts">
const querySearch = ref<string>('');
const isOpen = ref<boolean>(false);
const inputElement = ref<HTMLInputElement|null>(null);
const inputMobile = ref<HTMLInputElement|null>(null);
const localePath = useLocalePath();
const isShowMobile = ref(false);
const isSetMobileClass = ref(false);
const isMobile = ref(false);

const clickHandler = () => {
    if (isMobile.value) {
        showMobile();
        return;
    }
    else if (!isOpen.value) {
        openInput();
        return;
    }
    search()
}

const showMobile = () => {
    isShowMobile.value = true;

    setTimeout(() => {
        isSetMobileClass.value = true;
    });
}

const closeMobile = () => {
    isSetMobileClass.value = false;

    setTimeout(() => {
        isShowMobile.value = false;
    }, 300)
}

onMounted(() => {
    if (window.innerWidth < 1024) {
        isMobile.value = true;
    }
    window.addEventListener('resize', () => {
        if (window.innerWidth < 1024) {
            isMobile.value = true;
        }
        else {
            isMobile.value = false;
        }
        if (!isMobile.value && isShowMobile.value) {
            closeMobile();
        }
    })
})

const openInput = () => {
    if (inputElement.value) {
        const width = inputElement.value.clientWidth;
        inputElement.value.style.maxWidth = '0';
        isOpen.value = true;

        setTimeout(() => {
            if (inputElement.value) {
                inputElement.value.classList.remove('invisible')
                inputElement.value.classList.remove('opacity-0')
                inputElement.value.style.maxWidth = width + 'px';
            }
        });

        setTimeout(() => {
            if (inputElement.value) {
                inputElement.value.focus();
            }
        }, 200)
    }
}

const search = () => {
    if (querySearch.value.length > 2) {
        const route = localePath({name: 'search', query: {q: querySearch.value}});
        closeMobile();
        return navigateTo(route);
    }
}
</script>

<template>
    <div class="flex items-center gap-2 px-3 dark:text-gray-400">
        <input
            ref="inputElement"
            class="border-box invisible opacity-0 border rounded outline-secondary px-2 py-2 text-sm overflow-hidden w-full transition-all duration-300"
            :class="{visible: isOpen, hidden: isMobile}"
            :placeholder="$t('search')"
            type="text"
            v-model="querySearch"
            @keyup.enter="search()"
        >
        <button class="hover:text-secondary dark:text-gray-400 dark:hover:text-secondary" @click="clickHandler()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
        </button>
    </div>
    <div v-if="isShowMobile" class="overflow-hidden">
        <div @click="closeMobile()" class="bg-black z-10 fixed top-0 left-0 w-full h-full transition-opacity" :class="{'opacity-50': isSetMobileClass, 'opacity-0': !isSetMobileClass}"></div>
        <div class="px-7 py-10 fixed top-0 left-0 w-full bg-white dark:bg-black-900 z-10 transition-all" :class="{'translate-y-0': isSetMobileClass, 'translate-y-[-100%]': !isSetMobileClass}" ref="inputMobile">
            <div class="flex items-center relative">
                <input
                    class="border-box border outline-0 px-2 pr-8 py-2 text-sm overflow-hidden w-full duration-300"
                    :placeholder="$t('search')"
                    type="text"
                    v-model="querySearch"
                    @keyup.enter="search()"
                >
                <button class="hover:text-secondary dark:text-gray-400 dark:hover:text-secondary absolute right-2 transition-all" @click="search()">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            </div>
            <svg @click="closeMobile()" class="size-5 absolute top-2 right-2 cursor-pointer text-gray-500 dark:text-gray-400 hover:text-secondary dark:hover:text-secondary transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </div>
    </div>
</template>

<style scoped>

</style>