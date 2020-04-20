<template>
    <div class="classify">
        <md-swiper></md-swiper>
        <van-tabs animated sticky class="van-tabs" offset-top="45" color="#ff6600" @click="changeCate">
            <van-tab v-for="(v, k) in categoryList" :key="k" :title="v.category"  :name="v._id"
            >
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                    <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        offset = 10
                        @load="onLoad"
                    >
                        <div  v-for="(v2,k2) in articleList" :key="k2" @click="$router.push({path:'/childPage/articleDetail', query:{id:v2._id}})">
                            <md-articleDesc :article="v2"></md-articleDesc>
                        </div>
                    </van-list>
                </van-pull-refresh>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            refreshing: false,
            currentPage:1,
            pageSize:5,
            currentCateID:0
        };
    },
    created(){
        this.getCategoryList()
    },
    computed:{
        ...mapState('article', ['categoryList','articleList','isMore'])
    },
    methods: {
        ...mapMutations('article', ['clearArticleList']),
        ...mapActions('article', ['getCategoryList','getArticleList']),
        changeCate(name,title){
            this.currentCateID = name
            this.onRefresh()
        },
        onLoad() {
            setTimeout(() => {
                if (this.refreshing) {
                    this.clearArticleList()
                    this.refreshing = false;
                }
                // console.log(this.currentPage)
                if(this.isMore){
                    this.getArticleList({id:this.currentCateID, currentPage:this.currentPage, pageSize:this.pageSize})
                    this.loading = false
                    this.currentPage++
                }else{
                    this.finished = true
                }
            }, 1000)
        },
        onRefresh() {
            this.currentPage = 1
            this.pageSize = 5
            // 清空列表数据
            this.clearArticleList()
            this.finished = false;
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true;
            // 重新加载数据
            this.onLoad();
        },
    },
}
</script>

<style lang="less" scoped>
    .classify{
        width: 100%;
        padding: 1.2rem 0 1.5rem;
        .my-swipe .van-swipe-item {
            color: #fff;
            font-size: 0.8rem;
            line-height: 4rem;
            text-align: center;
            background-color: #39a9ed;
        }
    }
</style>