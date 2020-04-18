<template>
    <div class="comments">
        <div class="title">
            评论
        </div>
        <div class="edit">
            <van-cell-group :border="false">
               <van-field
                v-model="commentVal"
                rows="2"
                autosize
                type="textarea"
                maxlength="140"
                placeholder="请输入评论内容"
                show-word-limit
                class="textarea"
                :border="false"
                />
                <div class="btn-wrap">
                    <van-button class="btn" type="primary" size="normal" color="#1989fa">发表</van-button>
                </div>
            </van-cell-group>
        </div>
        <div class="comments-list">
            <div class="item" v-for="(v, k) in 10" :key="k">
                <div class="header">
                     <div class="avatar">
                    <van-image
                        width="100%"
                        height="100%"
                        fit="cover"
                        src="https://img.yzcdn.cn/vant/cat.jpeg"
                        />
                        <!-- <div class="commenter">
                            <span>李四：</span>
                        </div> -->
                    </div>
                    <div class="commenter">
                        <span class="name">李四</span>
                        <span>回复</span>
                        <span class="name">@张三</span>
                        <span>:</span>
                    </div>
                </div>
                <div class="content">而他也容易人员额ear有二五眼二五眼惹我所业务容易人员额ear有二五眼二五眼惹我所业务容易人员额ear有二五眼二五眼惹我所业务容易人员额ear有二五眼二五眼惹我所业务员首页</div>
                <div class="bottom">
                    <div class="time">2019-125- 5454645</div>
                    <div class="btn">回复</div>
                </div>
            </div>
            <van-pagination
            v-model="currentPage"
            :total-items="125"
            :show-page-size="3"
            force-ellipses
            class="page"
            />
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            commentVal:"",
            currentPage:""
        }
    }
}
</script>

<style lang="less" scoped>
    .comments{
        background: #fff;
        .title{
            font-size: 0.5rem;
            color: #666;
            padding: 0.3rem 0.3rem 0;
        }
        .edit{
            padding: 0.3rem;
            box-sizing: border-box;
            
            .textarea{
                font-size: 0.35rem;
                color: #666;
                margin-bottom: 0.3rem;
                border: 1px solid #f2f2f2;
                border-radius: 0.2rem;
                &:focus{
                    border-color: #ff6600;
                }
            }
            .btn-wrap{
                display: flex;
                justify-content: flex-end;
                .btn{
                    border-radius: 0.2rem;
                    padding: 0 0.6rem;
                    font-size: 0.35rem;
                }
            }
        }
        .comments-list{
            margin: 0.3rem;
            .item{
                border-top: 1px solid #f2f2f2;
                padding: 0.3rem 0;
                .header{
                    display: flex;
                    align-items: center;
                    .avatar{
                        width: 0.8rem;
                        height: 0.8rem;
                        border-radius: 50%;
                        overflow: hidden;
                    }
                    .commenter{
                        font-size: 0.35rem;
                        color: #666;
                        padding-left: 0.2rem;
                        .name{
                            color: #ff6600;
                            font-style: italic;
                        }
                    }
                }
                .content{
                    font-size: 0.35rem;
                    color: #666;
                    padding: 0.2rem 0;
                }
                .bottom{
                    font-size: 0.35rem;
                    color: #666;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .btn{
                        border-radius: 0.2rem;
                        font-size: 0.3rem;
                        color: #1989fa;
                        padding: 0.2rem 0.3rem;
                    }
                }
            }
            .page{
                border-top: 1px solid #f2f2f2;
                padding: 0.3rem 0;
            }
        }
    }
</style>