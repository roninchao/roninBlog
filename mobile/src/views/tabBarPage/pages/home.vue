<template>
    <div class="home">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(v,k) in 4" :key="k">{{v}}</van-swipe-item>
        </van-swipe>
        <van-tabs animated sticky class="van-tabs" offset-top="45" color="#ff6600">
            <van-tab v-for="(v, k) in 8" :key="k" :title="'标签 ' + v" 
            >
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                    <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                    >
                        <div  v-for="(v2,k2) in list" :key="k2" @click="$router.push('/childPage/articleDetail')">
                            <md-articleDesc></md-articleDesc>
                        </div>
                    </van-list>
                </van-pull-refresh>
               
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            refreshing: false,
        };
    },
    methods: {
        onLoad() {
            setTimeout(() => {
                if (this.refreshing) {
                this.list = [];
                this.refreshing = false;
                }
                for (let i = 0; i < 10; i++) {
                this.list.push(this.list.length + 1);
                }
                this.loading = false;

                if (this.list.length >= 40) {
                this.finished = true;
                }
            }, 1000);
        },
        onRefresh() {
            // 清空列表数据
            this.finished = false;

            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true;
            this.onLoad();
        },
    },
}
</script>

<style lang="less" scoped>
    .home{
        width: 100%;
        padding: 1.2rem 0;
        .my-swipe .van-swipe-item {
            color: #fff;
            font-size: 0.8rem;
            line-height: 4rem;
            text-align: center;
            background-color: #39a9ed;
        }
    }
</style>