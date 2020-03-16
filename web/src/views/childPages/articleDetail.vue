<template>
    <div class="detail">
        <div class="article">
            <div @click="goBack" class="back"><i class="el-icon-back icon"></i>返回</div>
            <div class="header">
                <h4 class="title">{{article.title}}</h4>
                <div class="desc">
                    <span><i class="el-icon-document"></i>{{article.category?article.category.category:''}}</span>
                    <span><i class="el-icon-view"></i>{{article.visits}}</span>
                    <span><i class="el-icon-chat-line-round"></i>1232</span> 
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
        },
        goBack() {
            this.$router.go(-1)
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
            .back{
                cursor: pointer;
                font-size: 14px;
                color: #666;
                transition: all 0.4s;
                border: 1px solid #ccc;
                border-radius: 5px;
                width: 60px;
                padding: 8px;
                text-align: center;
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
            .header{
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