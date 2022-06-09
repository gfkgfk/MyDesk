<template>
    <div class="main">
        主界面
    </div>
</template>

<script>
import './js/digitalrain'
export default {
    created() {
        //TODO:remove the element
        //force refresh to avoid the effect of heart page(three.js) 
        if (location.href.indexOf('#reloaded') <= 0) {
            location.href = location.href + '#reloaded'
            location.reload()
        }
    }
}
</script>

<style>
.main {
    margin-top: 20px;
    position: relative;
    color: white;
}
#app {
    height: 100%;
    width: 100%;
    position: absolute;
}

/* find the digital rain background canvas */
#canvasmark {
    z-index: -9999;
}
/* find the digital rain background div */
#divmark {
    z-index: -9999;
}
</style>