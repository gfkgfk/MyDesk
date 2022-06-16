<template>
    <div id="app" class="app">
        <router-view v-if="isRouterAlive" />
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            isRouterAlive: true
        }
    },
    provide() {
        return {
            reload: this.reload
        }
    },
    methods: {
        reload() {
            this.isRouterAlive = false
            this.$nextTick(() => {
                this.isRouterAlive = true
            })
        }
    }
}
</script>


<style lang="scss" >
.app {
    height: 100%;
}
</style>