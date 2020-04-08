<template>
    <div>
        <div class="swiper">
            <md-articleSwiper :articleSwiper="swiper"></md-articleSwiper>
        </div>
        <!-- 文章列表 -->
        <div class="article-list">
            <div class="title">
                <div class="item">文章列表</div>
                <!-- <div class="item"></div> -->
            </div>
            <div v-for="(v, k) in articleList" :key="k">
                <md-articleDesc :article="v"></md-articleDesc>
            </div>
            <div>
                <div class="load-more" :class="isMore?'':'not-data'" @click="addMore">
                    <span v-if="articleList.length>0">{{isMore?'加载更多':'已经到底了'}}</span>
                    <span v-else class="no-data">
                        <i class="el-icon-document"></i>
                        <span>暂无数据</span>
                    </span>
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
        ...mapState('category', ['categoryList','articleList', 'selectedCateID', 'swiper', 'currentPage', 'pageSize', 'isMore', 'isFrom']),
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
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 15px;
            box-sizing: border-box;
            .item{
                border-left: 3px solid #ff6600;
                padding-left: 5px;
                font-weight: bold;
                cursor: default;
            }
        }
        .load-more{
            width: 100%;
            padding: 10px 0;
            border-radius: 5px;
            // height: 40px;
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
            .no-data{
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                i{
                    font-size: 48px;
                }
            }
        }
        .not-data{
            // cursor: pointer;
            pointer-events: none;
        }
    }
</style>