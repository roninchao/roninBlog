<template>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(v,k) in swiper" :key="k" @click="$router.push({path:'/childPage/articleDetail',query:{id:v._id}})">
            <van-image
            width="100%"
            height="100%"
            fit="cover"
            :src="v.imgUrl"
            />
        </van-swipe-item>
    </van-swipe>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
    data(){
        return{}
    },
    created(){
        this.getSwiper()
    },
    computed:{
        ...mapState('article', ['swiper'])
    },
    methods:{
        ...mapActions('article', ['getSwiper'])
    }
}
</script>

<style lang="less" scoped>
    .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 0.8rem;
        line-height: 4rem;
        height: 4rem;
        text-align: center;
        // background-color: #39a9ed;
    }
</style>