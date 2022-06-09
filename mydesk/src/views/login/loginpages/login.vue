<template>
    <div>
        <div class="red">Login Page</div>
        <div>token:{{this.$store.state.token}}</div>
        <div>userName:{{this.$store.state.userStore.userName}}</div>
        <button @click="testBtn">Refresh Token</button>
        <button @click="testBtn2">Get Request</button>
        <button @click="testBtn3">Auth Refresh Token</button>
        <button @click="testBtn4">Vuex Set Token</button>
        <button @click="testBtn5">Vuex Get Token</button>
        <button @click="testBtn6">Vuex Set Token Action</button>
        <button @click="testBtn7">Vuex Module Get</button>
        <button @click="testBtn8">Get Mock Data</button>
        <button @click="testBtn9">Get Mock Data</button>
        <button @click="testBtn10">Post Request</button>
        <button @click="testBtn11">Send Wrapper Request</button>
        <button @click="testBtn12">Lodash</button>
    </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import qs from 'qs'
import _ from 'lodash'
export default {
    created() {},
    methods: {
        ...mapActions(['setTokenAction']),
        ...mapMutations(['setToken']),
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
        testBtn4() {
            console.log('test4 btn clicked')
            this.$store.commit('setToken', '*******')
        },
        testBtn5() {
            console.log('test5 btn clicked')
            console.log(this.$store.getters.getToken('getters params'))
        },
        testBtn6() {
            console.log('test6 btn clicked')
            this.setTokenAction(8989)
        },
        testBtn7() {
            console.log('test7 btn clicked')
            let a = this.$store.getters['userStore/getUserName']
            console.log(a)
        },
        testBtn8() {
            let url = 'http://www.test.com/api/mock/login'
            this.$http
                .get(url)
                .then(response => {
                    console.log('testBtn8 success')
                    console.log(response)
                })
                .catch(function(error) {
                    console.log('testBtn8 error')
                    console.log(error)
                })
        },
        testBtn9() {
            let url = 'http://localhost:8080/api/mock/login'
            this.$http
                .get(url)
                .then(response => {
                    console.log('testBtn9 success')
                    console.log(response)
                })
                .catch(function(error) {
                    console.log('testBtn9 error')
                    console.log(error)
                })
        },
        testBtn10() {
            let url = '/userList'
            // this.$http
            //     .request({
            //         url: '/local' + url,
            //         method: 'POST',
            //         data: qs.stringify({ name: 'GFK', age: 90 }),
            //         // data: { name: 'GFK', age: 90 },
            //         headers:{
            //             'Content-Type':'application/x-www-form-urlencoded'
            //         }
            //     })
            //     .then(response => {
            //         console.log('testBtn10 success')
            //         console.log(response)
            //     })
            //     .catch(function(error) {
            //         console.log('testBtn10 error')
            //         console.log(error)
            //     })

            this.$http
                .post('/local' + url, { name: 'GFK', age: 90 }) //Auto change Content-Type to application/json
                // .post('/local' + url, qs.stringify({ name: 'GFK', age: 90 })) //Auto change Content-Type to application/x-www-form-urlencoded
                .then(response => {
                    console.log('testBtn10 success')
                    console.log(response)
                })
                .catch(function(error) {
                    console.log('testBtn10 error')
                    console.log(error)
                })
        },
        testBtn11() {
            this.$http
                .send({
                    name: 'test.test',
                    data: { name: 'GFK', age: 90 }
                })
                .then(res => {
                    console.log('then')
                    console.log('res', res)
                })
                .catch(error => {
                    console.log('error')
                    console.log(error)
                })
        },
        testBtn12() {
            console.log('testBtn12 clicked')
            const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
            console.log(this.$lodash.chunk(arr, 2))
            
        }
    }
}
</script>

<style lang='scss' scoped>
.red {
    color: red;
}
</style>