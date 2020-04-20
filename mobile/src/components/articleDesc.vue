<template>
    <div class="article-item">
        <div class="img-box">
            <van-image
            width="100%"
            height="100%"
            fit="cover"
            :src="article.imgUrl"
            />
            <!-- <div class="img" :style="{backgroundImage:`url(${article.imgUrl})`}"></div>   -->
        </div>
        <div class="article">
            <div class="article-desc">
                <p class="top">{{article.title}}</p>
                <p class="bottom">{{article.desc}}</p>
            </div>
            <div class="article-other">
                <div class="icon">
                    <van-icon name="description" />
                    <span>{{article.category.category}}</span>
                </div>
                <div class="icon">
                    <van-icon name="browsing-history-o" />
                    <span>{{article.visits}}</span>
                </div>
                <div class="icon">
                    <van-icon name="comment-o" />
                    <span>{{article.comments}}</span>
                </div>  
                <div class="icon">
                    <van-icon name="underway-o" />
                    <span>{{article.time}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props:{
        article:""
    },
}
</script>

<style lang='less' scoped>
    .article-item{
        height: 2rem;
        margin: 0.3rem 0.3rem 0;
        padding: 0.2rem;
        background: #fff;
        border-radius: 0.1rem;
        display: flex;
        overflow: hidden;
        &:active{
            opacity: 0.6;
        }
        .img-box{
            width: 2.5rem;
            height: 100%;
            border-radius: 0.1rem;
            overflow: hidden;
        }
        .article{
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            margin-left: 0.2rem;
            width: 6.5rem;
            .article-desc{
                font-size: 0.3rem;
                color: #666;
                .top{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-weight: bold;
                }
                .bottom{
                    overflow:hidden; 
                    text-overflow:ellipsis;
                    display:-webkit-box; 
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp:2; 
                }
            }
            .article-other{
                display: flex;
                align-items: center;
                .icon{
                    display: flex;
                    align-items: center;
                    font-size: 0.3rem;
                    color: #999;
                    margin-right: 0.2rem;
                    span{
                        font-size: 0.2rem;
                        margin-left: 1px;
                    }
                }
            }
        }
    }
</style>