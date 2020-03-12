<template>
    <div class="desc">
        <h4 class="item-title">{{article.title}}</h4>
        <p class="item-content" v-html="article.content"></p>
        <div class="icon-box">
            <div class="icon">
                <i class="el-icon-document"></i>
                <span>111</span>
            </div>
            <div class="icon">
                <i class="el-icon-view"></i>
                <span>111</span>
            </div>
            <div class="icon">
                <i class="el-icon-chat-line-round"></i>
                <span>111</span>
            </div>  
            <div class="icon">
                <i class="el-icon-timer"></i>
                <span>{{article.time}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        article:{
            type:Object
        }
    },
    methods:{
    }
}
</script>

<style lang='less' scoped>
    .item-title{
        font-size: 16px;
        color: #333;
        font-weight: normal;
    }
    .item-content{
        font-size:14px;
        color: #666;
        display:-webkit-box;
        -webkit-line-clamp:3;
        -webkit-box-orient:vertical;
        overflow:hidden;
        text-overflow:ellipsis;
        line-height: 24px;
        max-height: 72px;
        margin: 10px 0;
    }
    .icon-box{
        font-size: 16px;
        color: #999;
        display: flex;
        align-items: center;
        .icon{
            display: flex;
            padding-right: 10px;
            span{
                font-size: 12px;
                color: #999;
            }
        }
    }
</style>