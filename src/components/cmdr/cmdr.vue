<template>
    <div id="container" class="cmd-container"></div>
</template>

<script>
export default {
    props: {
        theme: {
            type: String,
            default: 'custom'
        }
    },
    mounted() {
        var cmdr = require('./cmdr/cmdr.js')
        let node = document.getElementById('container')
        var terminal = new cmdr.Terminal(node, { theme: 'custom' })
        let that = this
        terminal.shell.addCommand({
            name: 'HELP',
            main: function() {
                var terminal = this.terminal
                var cancelToken = this.cancelToken
                var commandLine = this.commandLine
                return new Promise(function(resolve) {
                    that.$emit('cmdCallback', commandLine, terminal, cancelToken, resolve)
                })
            },
            description: 'show help info'
        })
        terminal.shell.addCommand({
            name: 'LOGIN',
            main: function() {
                var terminal = this.terminal
                var cancelToken = this.cancelToken
                var commandLine = this.commandLine
                return new Promise(function(resolve) {
                    that.$emit('cmdCallback', commandLine, terminal, cancelToken, resolve)
                })
            },
            description: 'user login'
        })
    }
}
</script>

<style lang="scss">
@import './cmdr/cmdr.scss';
</style>