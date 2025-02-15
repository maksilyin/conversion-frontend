<script setup>
import documentIcon from "assets/icons/download_file_document.svg";

const props = defineProps({
    for: {
        type: String,
        default: 'input-file',
    },
})

const isActive = ref(false);
const isDragging = ref(false);
const dragElement = ref(null);
let dragLeaveTimeout = null;

const onDragOver = (event) => {
    event.preventDefault();
    clearTimeout(dragLeaveTimeout);
    isActive.value = true;
    isDragging.value = true;
}

const onDragEnter = (event) => {
    event.preventDefault();
    isActive.value = true;
    isDragging.value = true;
}
const onDragLeave = (event) => {
    event.preventDefault();
    dragLeaveTimeout = setTimeout(() => {
        isDragging.value = false;
    }, 2000);
}
const onDrop = (event) => {
    event.preventDefault();
    isDragging.value = false;
    isActive.value = false;

    const files = event.dataTransfer.files;

    if (files.length > 0) {
        const input = document.getElementById(props.for);

        if (input) {
            const dataTransfer = new DataTransfer();

            for (const file of files) {
                dataTransfer.items.add(file);
            }
            input.files = dataTransfer.files;

            const event = new Event('change', { bubbles: true });
            input.dispatchEvent(event);
        }
    }
}

onMounted(() => {
    document.body.addEventListener("dragover", onDragOver)
    document.body.addEventListener("dragleave", onDragLeave)
    document.body.addEventListener("drop", onDrop)
})

</script>

<template>
    <div
        v-if="isActive"
        ref="dragElement"
        class="drop-area"
        :class="{
            active: isDragging,
        }"
    >
        <div>
            <div class="font-bold text-2xl text-center text-white mt-8">
                <UIcon name="tdesign:add" class="text-blue-400 w-48 h-48"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.drop-area {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(44, 105, 210, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1000;
}

.drop-area.active {
    opacity: 1;
}

.drop-area p {
    font-size: 18px;
    color: white;
}
.animated-box {
    width: 100%;
    height: 100%;
    opacity: 1;
    animation: grow-disappear .7s infinite ease-in;
}

@keyframes grow-disappear {
    0% {
        height: 100%;
        opacity: 1;
    }
    99% {
        height: 0;
        opacity: 1;
    }
    100% {
        opacity: 0;
    }

}
</style>