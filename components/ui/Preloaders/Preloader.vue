<script setup lang="ts">

</script>

<template>
    <!-- preloader -->
    <div class="preloader bg-white-opacity-60 dark:bg-black-opacity-60">
        <div class="loader">
            <span class="dot"></span>
            <div class="dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
    <!-- /preloader -->
</template>

<style scoped>
/* preloader */
.preloader {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
}
.preloader .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 142px;
    height: 40px;
    margin: -20px 0 0 -71px;
    background: transparent;
}
.preloader .loader .dot {
    position: absolute;
    width: 16px;
    height: 16px;
    top: 12px;
    left: 15px;
    background: #ff6f00;
    border-radius: 50%;
    transform: translateX(0);
    -webkit-animation: dot 2.8s infinite;
    animation: dot 2.8s infinite;
}
.preloader .loader .dots {
    transform: translateX(0);
    margin-top: 12px;
    margin-left: 31px;
    -webkit-animation: dots 2.8s infinite;
    animation: dots 2.8s infinite;
}
.preloader .loader .dots span {
    display: block;
    float: left;
    width: 16px;
    height: 16px;
    margin-left: 16px;
    background: #ff6f00;
    border-radius: 50%;
}
@-webkit-keyframes dot {
    50% {
        transform: translateX(96px);
    }
}
@keyframes dot {
    50% {
        transform: translateX(96px);
    }
}
@-webkit-keyframes dots {
    50% {
        transform: translateX(-31px);
    }
}
@keyframes dots {
    50% {
        transform: translateX(-31px);
    }
}
</style>