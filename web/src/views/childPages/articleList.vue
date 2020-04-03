<template>
    <div>
        <div class="swiper  wow fadeInUp">
            <md-articleSwiper :articleSwiper="articleSwiper"></md-articleSwiper>
        </div>
        <!-- 文章列表 -->
        <div class="article-list">
            <div class="title wow fadeInUp" data-wow-duration ="1s" data-wow-delay ="0.3s"></div>
            <div v-for="(v, k) in articleList" :key="k">
                <md-articleDesc :article="v"></md-articleDesc>
            </div>
            <div class="load-more wow fadeInUp"  data-wow-duration ="1s" data-wow-delay ="0.3s">
                <span>加载更多</span>
            </div>
        </div>
    </div>
</template>

<script>
import {WOW} from 'wowjs'
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
    data() {
        return {}
    },
    created(){
        this.getArticleList()
    },
    mounted(){
        // 在项目加载完成之后初始化wow
        this.$nextTick(() => {
            let wow = new WOW({
                live:true
            })
            wow.init()
        })
    },
    computed:{
        ...mapState('category', ['articleList','articleSwiper'])
    },
    methods:{
        ...mapActions('category', ['getArticleList']),
    }
}
</script>

<style lang='less' scoped>
    .swiper{
        width: 100%;
        height: 250px;
        background: #fff;
        border-radius: 5px;
    }
    .article-list{
        .title{
            width: 100%;
            height: 40px;
            margin: 15px 0;
            background: #fff;
            border-radius: 5px;
        }
        .load-more{
            width: 100%;
            height: 40px;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: #666;
            cursor: pointer;
        }
    }
</style>