<template>
    <div class="content-asider">
        <div class="item">
            <el-calendar v-model="value">
            </el-calendar>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: new Date()
        }
    }
}
</script>

<style lang='less' scoped>
    @activeColor:#ff6600;
    @padding:20px;
    .content-asider{
        width: 100%;
        padding: 0 @padding;
        box-sizing: border-box;
        .item{
            margin-bottom: @padding;
            background: #fff;
            border-radius: 5px;
            // box-shadow: 0 0 5px #ccc;
            padding: 10px;
            box-sizing: border-box;
        }
    }
</style>