<template>
    <div class="console-container">
        <el-container class="container">
            <el-aside class="left" style="width:auto">
                <menuleft></menuleft>
            </el-aside>
            <el-container>
                <el-header>Header</el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import menuleft from '@/components/menuleft/menuleft'
export default {
    components: {
        menuleft
    }
}
</script>

<style lang="scss" >
.console-container {
    height: 100%;
}
.container {
    height: 100%;
}
.el-header,
.el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
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