<template>
    <div class="article-item">
        <div class="img-box" @click="go(article._id)">
            <van-image
            width="100%"
            height="100%"
            fit="cover"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
            <!-- <div class="img" :style="{backgroundImage:`url(${article.imgUrl})`}"></div>   -->
        </div>
        <div class="article">
            <div class="article-desc">
                <p class="top" @click="go(article._id)">article.title</p>
                <p class="bottom">111111111</p>
            </div>
            <div class="article-other">
                <div class="icon">
                    <van-icon name="description" />
                    <span>category</span>
                </div>
                <div class="icon">
                    <van-icon name="browsing-history-o" />
                    <span>111</span>
                </div>
                <div class="icon">
                    <van-icon name="comment-o" />
                    <span>222</span>
                </div>  
                <div class="icon">
                    <van-icon name="underway-o" />
                    <span>2019-05-05 01535743</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props:{
        article:{}
    },
    data() {
        return {}
    },
    mounted(){
      
    },
    methods:{
        go(e){
            this.$router.push({path:'/detail', query:{id:e}})
        }
    }
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
                    overflow : hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
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