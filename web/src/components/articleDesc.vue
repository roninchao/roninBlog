<template>
    <div class="article-item wow fadeInUp"  data-wow-duration ="1s" data-wow-delay ="0s">
        <div class="img-box">
            <div class="img" :style="{backgroundImage:`url(${article.imgUrl})`}"></div>  
        </div>
        <div class="article">
            <div class="article-desc">
                <p class="top">{{article.title}}</p>
                <p class="bottom">{{article.desc}}</p>
            </div>
            <div class="article-other">
                <div class="icon">
                    <i class="el-icon-document"></i>
                    <span>{{article.category.category}}</span>
                </div>
                <div class="icon">
                    <i class="el-icon-view"></i>
                    <span>{{article.visits}}</span>
                </div>
                <div class="icon">
                    <i class="el-icon-chat-line-round"></i>
                    <span>{{article.comments}}</span>
                </div>  
                <div class="icon">
                    <i class="el-icon-timer"></i>
                    <span>{{article.time}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {WOW} from 'wowjs'
export default {
    props:{
        article:{}
    },
    data() {
        return {}
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
}
</script>

<style lang='less' scoped>
    .article-item{
        width: 100%;
        height: 150px;
        background: #fff;
        margin-bottom: 15px;
        border-radius: 5px;
        display: flex;
        transition: all 0.3s;
        &:hover{
            background: #ccc;
            .img{
                transform: scale(1.1);
            }
        }
        .img-box{
            width: 170px;
            height: cale(100% - 30px);
            margin: 15px;
            box-sizing: border-box;
            border-radius: 5px;
            overflow: hidden;
            .img{
                width: 100%;
                height: 100%;
                background-color: #f0f0f0;
                background-position:center;
                background-size: cover;
                cursor: pointer;
                transition: all 0.3s;
            }
        }
        .article{
            width: 500px;
            padding: 15px;
            padding-left: 0;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            .article-desc{
                font-size: 14px;
                color: #666;
                .top{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-weight: bold;
                    padding-bottom: 10px;
                    cursor: pointer;
                    &:hover{
                        text-decoration: underline;
                    }
                }
                .bottom{
                    overflow : hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                }
            }
            .article-other{
                display: flex;
                align-items: center;
                // justify-content: space-between;
                .icon{
                    font-size: 12px;
                    color: #999;
                    padding-right: 15px;
                    // width: 80px;
                }
                // justify-content: space-between; 
            }
        }
    }
</style>