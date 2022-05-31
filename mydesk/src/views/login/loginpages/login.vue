<template>
    <div>

        <div class="red">登录页面</div>
        <button @click="testBtn">测试按钮</button>
    </div>
</template>

<script>
export default {
    methods: {
        testBtn() {
            console.log('测试')
            let url = "/try/ajax/json_demo.json";
            this.$http
                .get('/api' + url)
                .then(response => {
                    console.log('success');
                    console.log(response)
                })
                .catch(function(error) {
                    console.log('error');
                    console.log(error)
                })
        }
    }
}
</script>

<style lang='scss' scoped>
.red {
    color: red;
}
</style>