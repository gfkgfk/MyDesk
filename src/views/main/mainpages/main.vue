<template>
    <div class="main">
        <!-- 主界面 -->
        http://110.40.220.207:8081/#/heart
        <div @click="test">测试</div>
    </div>
</template>

<script>
import './js/digitalrain'
export default {
    methods: {
        test(){
            console.log('测试');
        }
    },
    created() {
        let a = document.getElementsByTagName('body')
        console.log('style',a[0].style.position);
        //TODO:remove the element to avoid the effect of heart page(three.js)
    }
}
</script>

<style lang="scss" >
.main {
    position: relative;
    z-index: 1;
    color: white;
}

/* find the digital rain background canvas */
#canvasmark {
}
/* find the digital rain background div */
#divmark {
}
</style>