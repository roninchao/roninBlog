<template>
    <div class="article">
        <div class="title">{{article.title}}</div>
        <div class="info">
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
        <div class="img" @click="show">
            <van-image
            width="100%"
            height="100%"
            fit="cover"
            :src="article.imgUrl"
            />
        </div>
        <div class="content" v-html="article.content"></div>
    </div>
</template>

<script>
import { ImagePreview } from 'vant';
export default {
    props:{
        article:""
    },
    methods:{
        show(){
            let arr = []
            arr.push(this.article.imgUrl)
            ImagePreview(arr);
        }
    }
}
</script>

<style lang="less" scoped>
    .article{
        padding: 0.3rem;
        box-sizing: border-box;
        background: #fff;
        .title{
            font-size: 0.5rem;
            color: #666;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: 0.15rem 0;
        }
        .info{
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.3rem;
            color: #666;
            .icon{
                display: flex;
                align-items: center;
                padding: 0 0.15rem;
                span{
                    padding-left: 1px;
                }
            }
        }
        .img{
            width: 100%;
            height: 5rem;
            margin: 0.3rem 0;
            border-radius: 0.2rem;
            overflow: hidden;
        }
        .content{
            font-size: 0.35rem;
        }
    }
</style>