<template>
    <div>
        <div class="detail">
            <div @click="goBack" class="back"><i class="el-icon-back icon"></i>返回</div>
            <div class="article-box">
                <div class="header">
                <h4 class="title">{{articleDetail.title}}</h4>
                    <div class="desc">
                        <span><i class="el-icon-document"></i>{{articleDetail.category?articleDetail.category.category:''}}</span>
                        <span><i class="el-icon-view"></i>{{articleDetail.visits}}</span>
                        <span><i class="el-icon-chat-line-round"></i>{{articleDetail.comments}}</span> 
                        <span><i class="el-icon-timer"></i>{{articleDetail.time}}</span>
                    </div>
                </div>
                <div class="img-box">
                    <div class="img" :style="{backgroundImage:`url(${articleDetail.imgUrl})`}"></div>
                </div>
                <div class="content" id="article-content" v-html="articleDetail.content"></div>
            </div>
            <div class="btn">
                <div class="item" @click="next(-1)"><i class="el-icon-d-arrow-left icon"></i>上一篇</div>
                <div class="item" @click="next(1)">下一篇<i class="el-icon-d-arrow-right icon"></i></div>
            </div>
        </div>
        <div>
            <md-comments></md-comments>
        </div>
    </div>
   
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
    data(){
        return{
            isShow:false
        }
    },
    created(){
        if(this.$route.query.id){
            this.getArticleDetail({id:this.$route.query.id})
        }
        window.scroll(0,0)
    },
    computed:{
        ...mapState('category', ['articleDetail',])
    },
    methods:{
        ...mapActions('category', ['getArticleDetail']),
        next(e){

            this.getArticleDetail({id:this.articleDetail._id, next: e})
        },
        goBack() {
            this.$router.go(-1)
        }
    }
}
</script>

<style lang='less' scoped>
  .detail{
    padding: 15px;
    border-radius: 5px;
    border-top-left-radius: 0%;
    background-color: #fff;
    .back{
        cursor: pointer;
        font-size: 14px;
        color: #666;
        transition: all 0.4s;
        border: 1px solid #f0f0f0;
        border-radius: 5px;
        display: inline-block;
        padding: 8px 20px;
        text-align: center;
        user-select: none;
        .icon{
            transition: all 0.4s;
            padding-right: 5px;
        }
        &:hover{
            background: #f0f0f0;
            .icon{   
                transform: translateX(-10px);
            }
        }
    }
    .article-box{
        .header{
            margin: 15px 0;
            padding-top: 15px;
            border-top: 1px dashed #f0f0f0;
            .title{
                font-size: 24px;
                color: #666;
                font-weight: normal;
                text-align: center;
                padding-bottom: 20px;
            }
            .desc{
                margin: 0 auto;
                font-size: 14px;
                color: #999;
                display: flex;
                justify-content: center;
                align-items: center;
                padding-bottom: 10px;
                span{
                    margin-right: 10px;
                }
                i{
                    padding-right: 3px;
                }
            }
        }
        .img-box{
            width: 100%;
            height: 300px;
            .img{
                width: 100%;
                height: 100%;
                background-size: cover;
                background-position: center;
            }
        }
        .content{
            font-size: 14px;
            color: #666;
        }
    }
    .btn{
        display: flex;
        margin-top: 30px;
        padding-top: 20px;
        justify-content: space-between;
        border-top: 1px dashed #f0f0f0;
        .item{
            transition: all 0.4s;
            user-select: none;
            cursor: pointer;
            font-size: 14px;
            color: #666;
            transition: all 0.4s;
            border: 1px solid #f0f0f0;
            border-radius: 5px;
            padding: 8px 10px;
            text-align: center;
            .icon{
                transition: all 0.4s;
                &:first-child{
                    padding-right: 5px;
                }
                &:last-child{
                    padding-left: 5px;
                }
            }
            &:hover{
                background: #f0f0f0;
                .el-icon-d-arrow-left{   
                    transform: translateX(-10px);
                }
                .el-icon-d-arrow-right{   
                    transform: translateX(10px);
                }
            }
        }
    }
  }
</style>