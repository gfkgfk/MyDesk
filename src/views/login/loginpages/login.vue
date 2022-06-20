<template>
    <div>
        <div>Login Page</div>
       <button >Test</button>
    </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import qs from 'qs'
import _ from 'lodash'
export default {
    inject: ['reload'],
    beforeDestroy () {
      console.log('beforeDestory');  
    },
    created() {},
    methods: {
    }
}
</script>

<style lang='scss' scoped>
</style>