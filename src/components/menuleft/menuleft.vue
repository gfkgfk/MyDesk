<template>
    <div class="menu-left">
        <el-col :span="24">
            <el-menu default-active="1" class="left-container" :collapse="isCollapse" @select="handleSelect" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item index="1" :class="isCollapse?'':'item-container'">
                    <i class="el-icon-menu"></i>
                    <span slot="title" class="item-container-text">主页</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title" class="item-container-text">内容</span>
                </el-menu-item>

                <el-menu-item index="3" disabled>
                    <i class="el-icon-document"></i>
                    <span slot="title" class="item-container-text">导航三</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title" class="item-container-text">导航四</span>
                </el-menu-item>
                <el-submenu index="99">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span class="item-container-text">导航二</span>
                    </template>
                    <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="99-1">选项1</el-menu-item>
                        <el-menu-item index="99-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="99-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="99-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="99-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>
            </el-menu>
        </el-col>
        <div class="side-bar">
            <div class="side-bar-content" @click="collapse(!isCollapse)">
                <div class="side-bar-icon-right" v-if="!isCollapse"></div>
                <div class="side-bar-icon-left" v-if="isCollapse"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created() {},
    methods: {
        collapse(status) {
            this.isCollapse = status
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
    background-color: #545c64;
    overflow-y: hidden;
    height: 100%;
    display: flex;
}
.item-container {
    width: 200px;
}
.item-container-text {
    padding-left: 12px;
}
.left-container {
    border: 0px;
}
.side-bar {
    margin-left: -1px;
    width: 10px;
    background-color: #545c64;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    overflow: hidden;
}
.side-bar-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
}
.side-bar:hover {
    background-color: #434a50;
}
.side-bar-icon-right {
    margin-left: -2px;
    width: 0;
    height: 0;
    line-height: 0;
    font-size: 0;
    color: white;
    border: 4px solid transparent;
    border-right-color: white;
}
.side-bar-icon-left {
    width: 0;
    height: 0;
    line-height: 0;
    font-size: 0;
    margin-left: 3px;
    color: white;
    border: 4px solid transparent;
    border-left-color: white;
}
</style>