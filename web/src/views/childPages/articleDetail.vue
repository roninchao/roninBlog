<template>
    <div class="detail">
        <div class="article">
            <div class="header">
                <h4 class="title">{{article.title}}</h4>
                <div class="desc">
                    <span><i class="el-icon-document"></i>{{article.category.category}}</span>
                    <span><i class="el-icon-timer"></i>{{article.time}}</span>
                </div>
            </div>
            <div class="content" v-html="article.content"></div>
            <div class="btn">
                <div class="item">&lt;&lt;上一篇</div>
                <div class="item">下一篇&gt;&gt;</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            article:{}
        }
    },
    created(){
        this.getArticle()
    },
    methods:{
        async getArticle(){
            let id = this.$route.query.id
            let res = await this.$http.get(`/article/${id}`)
            if(res.data.code == 0) {
                res.data.article.time = this.$func.getTime(parseInt(res.data.article.time))
                this.article = res.data.article
            }
            console.log(res)
        }
    }
}
</script>

<style lang='less' scoped>
    @activeColor:#ff6600;
    .detail{
        background-color: #fff;
        padding: 20px;
        .article{
            .header{
                .title{
                    font-size: 24px;
                    color: #666;
                    font-weight: normal;
                    text-align: center;
                    padding-bottom: 20px;
                }
                .desc{
                    width: 300px;
                    margin: 0 auto;
                    font-size: 14px;
                    color: #999;
                    display: flex;
                    justify-content: space-between;
                    padding-bottom: 10px;
                }
            }
            .content{
                font-size: 14px;
                color: #666;
            }
            .btn{
                display: flex;
                font-size: 16px;
                color: #333;
                padding-top: 20px;
                justify-content: space-between;
                cursor: pointer;
                
                .item{
                    transition: all 0.4s;
                    user-select: none;
                    &:hover{
                        color: @activeColor;
                    }
                }
            }
        }
    }
</style>