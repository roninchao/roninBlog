<template>
    <el-carousel trigger="click" height="250px">
        <el-carousel-item v-for="(v, k) in articleSwiper" :key="k">
            <div class="img" :style="{backgroundImage:`url(${v.imgUrl})`}"></div>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
export default {
    props:{
        articleSwiper:[]
    },
    data() {
        return {}
    }
}
</script>

<style lang='less' scoped>
    .el-carousel{
        border-radius: 5px;
    }
    .img{
        width: 100%;
        height: 100%;
        background-position: center;
        background-size: cover;
        cursor: pointer;
        transition: all 0.3s;
        &:hover{
            transform: scale(1.05);
        }
    }
</style>