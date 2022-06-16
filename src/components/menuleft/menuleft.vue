<template>
    <div class="menu-left">
        <el-col :span="24">
            
            <el-menu default-active="1" class="left-container" :collapse="isCollapse" @select="handleSelect" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff"
                active-text-color="#ffd04b">
               
                <el-menu-item index="1" class="item-container">
                    <i class="el-icon-menu"></i>
                    <span slot="title" class="item-container-text">主页</span>
                </el-menu-item>

                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span class="item-container-text">导航二</span>
                    </template>
                    <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="2-1">选项1</el-menu-item>
                        <el-menu-item index="2-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="2-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="2-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="2-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-menu-item index="3" disabled>
                    <i class="el-icon-document"></i>
                    <span slot="title" class="item-container-text">导航三</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title" class="item-container-text">导航四</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </div>
</template>

<script>
export default {
    created() {},
    methods: {
        collapse(status) {
            this.isCollapse = status
            console.log('object', status)
        },
        handleSelect(key, keyPath) {
            switch (key) {
                case '1':
                    this.$router.push('/console/consolemain')
                    break
                default:
                    break
            }
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath)
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath)
        }
    },
    data() {
        return {
            isCollapse: false
        }
    }
}
</script>

<style>
.menu-left {
    overflow-y: hidden;
    height: 100%;
    margin: 0;
}
.toggle{
    z-index: 1;
    position: absolute;
    right: 3px;
    top: 3px;

    color: white;
}
.item-container {
    width: 200px;
}
.item-container-text {
    padding-left: 10px;
}
.left-container {
    border: 0px;
}
</style>