<template>
    <div>
        <div class="red">Login Page</div>
        <button @click="testBtn">Test Button1</button>
        <button @click="testBtn2">Test Button2</button>
        <button @click="testBtn3">Test Button3</button>
    </div>
</template>

<script>
export default {
    methods: {
        testBtn() {
            console.log('test btn clicked')
            let url = '/getList'
            this.$http
                .get('/local' + url)
                .then(response => {
                    console.log('testBtn success')
                    console.log(response)
                })
                .catch(function(error) {
                    console.log('testBtn error')
                    console.log(error)
                })
        },

        testBtn2() {
            console.log('test2 btn clicked')
            let url = '/getList'
            this.$http
                .create()
                .get('/local' + url)
                .then(response => {
                    console.log('testBtn2 success')
                    console.log('testBtn2', response)
                })
                .catch(function(error) {
                    console.log('testBtn2 error')
                    console.log('testBtn2', error)
                })
        },
        testBtn3() {
            console.log('test3 btn clicked')
            let url = '/auth'
            this.$http
                .get('/local' + url)
                .then(response => {
                    console.log('testBtn3 success')
                    console.log(response)
                })
                .catch(function(error) {
                    console.log('testBtn3 error')
                    console.log(error)
                })
        },
    }
}
</script>

<style lang='scss' scoped>
.red {
    color: red;
}
</style>