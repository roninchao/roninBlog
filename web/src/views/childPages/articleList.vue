<template>
    <div>
        <div class="swiper">
            <md-articleSwiper :articleSwiper="swiper"></md-articleSwiper>
        </div>
        <!-- 文章列表 -->
        <div class="article-list">
            <div class="title"></div>
            <div v-for="(v, k) in articleList" :key="k">
                <md-articleDesc :article="v"></md-articleDesc>
            </div>
            <div>
                <div class="load-more" :class="isMore?'':'not-data'" @click="addMore">
                    <span>{{isMore?'加载更多':'已经到底了'}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {WOW} from 'wowjs'
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
    data() {
        return {
         
        }
    },
    created(){
        if(!this.isFrom){
            this.getArticleList()
            this.getSwiper()
        }
        this.setIsFrom(false)
    },
    computed:{
        ...mapState('category', ['articleList', 'selectedCateID', 'swiper', 'currentPage', 'pageSize', 'isMore', 'isFrom']),
    },
    watch:{
        selectedCateID(v1, v2){
            if(v1 != v2){
                this.getArticleList()
            }
        }
    },
    methods:{
        ...mapActions('category', ['getArticleList', 'getSwiper']),
        ...mapMutations('category', ['setPage','setIsFrom']),
        addMore() {
            if(this.isMore){
                let currentPage = this.currentPage+1
                let pageSize =  this.pageSize
                this.setPage({currentPage, pageSize})
                // window.scrollTo(0,0)
                this.getArticleList()
            }else{
                this.$message({
                    type:'warning',
                    message:'已经到底啦！'
                })
            }
        }
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
        min-height: 800px;
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
            user-select: none;
            cursor: pointer;
            transition: all .3s;
            &:hover{
                background: #ccc;
                color: #fff;
            }
            &:active{
                opacity: 0.6;
            }
        }
        .not-data{
            // cursor: pointer;
            pointer-events: none;
        }
    }
</style>