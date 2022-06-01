<template>
    <div>

        <div class="red">登录页面</div>
        <button @click="testBtn">测试按钮</button>
        <button @click="testBtn2">测试按钮2</button>
    </div>
</template>

<script>
export default {
    methods: {
        testBtn() {
            console.log('测试')
            // let url = "/auth";
            let url = '/getList'
            this.$http
                .get('/local' + url)
                .then(response => {
                    console.log('success')
                    console.log(response)
                })
                .catch(function(error) {
                    console.log('error')
                    console.log(error)
                })
        },
        testBtn2() {
            console.log('测试')
            // let url = "/auth";
            let url = '/getList'
            this.$http.create()
                .get('/local' + url)
                .then(response => {
                    console.log('testBtn2 success')
                    console.log('testBtn2',response)
                })
                .catch(function(error) {
                    console.log('testBtn2 error')
                    console.log('testBtn2',error)
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