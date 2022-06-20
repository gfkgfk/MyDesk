<template>
    <div class="header">
        <div class="header-info"></div>
        <el-avatar class="avatar"> {{userName}} </el-avatar>
    </div>
</template>

<script>
export default {
    props: {
        userName: {
            type: String,
            default: 'K'
        }
    }
}
</script>

<style lang="scss" scoped>
.header {
    box-sizing: border-box;
    padding: 0px 20px;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    // background-color: #ffd04b;
    background: linear-gradient(75deg, #434a50,#ffd04b);
}
.avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 4px solid #434a50;
}
.header-info {
    display: flex;
    flex: 1;
    height: 100%;
}
</style>