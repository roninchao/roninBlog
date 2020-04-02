<template>
    <el-carousel trigger="click" height="250px">
        <el-carousel-item v-for="(v, k) in list" :key="k">
            <div class="img" :style="{backgroundImage:`url(${v.url})`}"></div>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
export default {
    data() {
        return {
            list:[
                {
                    url:'https://static.surmon.me/FrkYADJJj0kFwHEkUXl14ZHj5YMS?x-oss-process=style/blog.list.item.pc'
                },
                {
                    url:'https://static.surmon.me/thumbnail/cloud-logo-thumb.jpg'
                },
                {
                    url:'https://static.surmon.me/Fn3cbhQGzyjdeRF6CvI2VpUjMazF'
                }
            ]
        }
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
    }
</style>