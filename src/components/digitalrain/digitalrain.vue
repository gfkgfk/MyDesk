<template>
    <div id="digitalrain" class="digitalrain">
    </div>
</template>

<script>
import { init } from './digitalrain/digitalrain'
export default {
    methods: {
    },
    mounted() {
        init('digitalrain')
    }
}
</script>

<style>
.digitalrain {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    background: black;
}
html,
body {
    margin: 0;
    border: 0;
    padding: 0;
    height: 100%;
    width: 100%;
}
</style>