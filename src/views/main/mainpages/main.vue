<template>
    <div class="main">
        <!-- 主界面 -->
        http://110.40.220.207:8081/#/heart
    </div>
</template>

<script>
import './js/digitalrain'
export default {
    created() {
        //TODO:remove the element to avoid the effect of heart page(three.js) 
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
    z-index: 1;
}
/* find the digital rain background div */
#divmark {
    z-index: 1;
}
</style>