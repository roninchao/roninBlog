<template>
    <div class="article-list">
        <div class="items-header">
            <div class="item radio">
                <!-- <el-radio-group v-model="radio" size="medium" :fill="activeColor">
                    <el-radio-button label="时间"></el-radio-button>
                    <el-radio-button label="标题"></el-radio-button>
                </el-radio-group> -->
            </div>
            <div class="item search">
                <md-search></md-search>
            </div>
        </div>
        <div class="items" id="items" v-loading="loadingArticleList">
            <div class="item" v-for="(v, k) in articleList" :key='k'>
                <div @click="go(v._id)">
                    <md-artistDesc :article="v"></md-artistDesc>
                </div>
            </div>
        </div>
        <div class="more">{{loadingArticleList?"":"-- 没有更多数据 --"}}</div>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    data(){
        return{
            search:'',
            radio:'',
            activeColor:'#ccc',
            currentPage:1,
            pageSize:10,
        }
    },
    created(){
        this.getArticleList({currentPage:this.currentPage, pageSize:this.pageSize})
        
    },
    updated(){
        this.$nextTick(() => {
            this.scrollLoadMore()
        })
    },
    computed:{
        ...mapState('category', ['articleList', 'loadingArticleList', 'isMore'])
    },
    methods:{
        ...mapActions('category', ['getArticleList']),
        clearSearch(){
            this.search = ''
        },
        go(e){
            this.$router.push({path:"detail", query:{id:e}})
        },
        scrollLoadMore(data){
            document.querySelector('#content').onscroll = () => {
                 //可滚动容器的高度
                let innerHeight = document.querySelector('#items').clientHeight;
                //屏幕尺寸高度
                let outerHeight = document.documentElement.clientHeight;
                //可滚动容器超出当前窗口显示范围的高度
                let scrollTop = document.querySelector('#content').scrollTop;
                if (innerHeight <= (outerHeight + scrollTop)) {
                    //加载更多操作
                    if(!this.loadingArticleList && this.isMore){
                        this.currentPage++;
                        this.getArticleList({currentPage:this.currentPage, pageSize:this.pageSize})
                    }
                }
            }
        }
    }
}
</script>

<style lang='less' scoped>
    @headerHeight:70px;
    @activeColor:#ff6600;
    @padding:20px;
    .article-list{
        height: 100%;
        background: #fff;
        width: 750px;
        .items-header{
            height: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 @padding;
            box-sizing: border-box;
            font-size: 14px;
            color: #666;
            // background: #fff;
            border-top-right-radius: 5px;
        }
        .items{
            background: #fff;
            padding: 0 @padding;
            box-sizing: border-box;
            font-size: 16px;
            color: #333;
            .item{
                padding: @padding 10px;
                box-sizing: border-box;
                border-bottom: 1px dashed #ccc;
                transition: all 0.4s;
                border-radius: 5px;
                cursor: pointer;
                &:hover{
                    background: #f0f0f0;
                    transform: translateX(-10px);
                }
            }
        }
        .more{
            width: 100%;
            font-size: 12px;
            color: #999;
            text-align: center;
            padding: 20px 0;
        }
    }
</style>