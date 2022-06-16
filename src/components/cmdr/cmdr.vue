<template>
    <div id="cmdcontainer" class="cmd-container"></div>
</template>

<script>
export default {
    data() {
        return {
            cmdr: '',
            terminal: ''
        }
    },
    methods: {
        active() {
            // active cmd and fix cmd indicator display style
            this.terminal._activateInput()
            //display welcome info
            this.terminal.execute('WELCOME')
        }
    },
    props: {
        theme: {
            type: String,
            default: 'custom'
        }
    },
    mounted() {
        this.cmdr = require('./cmdr/cmdr.js')
        let node = document.getElementById('cmdcontainer')
        this.terminal = new this.cmdr.Terminal(node, { theme: 'custom' })
        let that = this
        this.terminal.shell.addCommand({
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