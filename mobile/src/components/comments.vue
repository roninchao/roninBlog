<template>
    <div class="comments">
        <div class="title">评论</div>
        <div class="edit">
            <van-cell-group :border="false">
               <van-field
                v-model="commentVal1"
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
                    <van-button class="btn" type="primary" size="normal" color="#1989fa" @click="send(1)">发表</van-button>
                </div>
            </van-cell-group>
        </div>
        <div class="comments-list" v-if="commentsList">
            <div class="item" v-for="(v, k) in commentsList" :key="k">
                <div class="header">
                    <div class="avatar">
                    <van-image
                        width="100%"
                        height="100%"
                        fit="cover"
                        :src="v.reviewerId.avatar"
                        />
                    </div>
                    <div class="commenter" v-if="!v.commentatorId">
                        <span class="name">{{v.reviewerId.username}}</span>
                        <span>:</span>
                    </div>
                    <div class="commenter" v-else>
                        <span class="name">{{v.reviewerId.username}}</span>
                        <span>回复</span>
                        <span class="name">@{{v.commentatorId.username}}</span>
                        <span>:</span>
                    </div>
                </div>
                <div class="content" v-html="v.content"></div>
                <div class="bottom">
                    <div class="time">{{v.time}}</div>
                    <div class="btn" @click="showPopup(v.reviewerId._id)">回复</div>
                </div>
            </div>
            <van-pagination
            v-model="currentPage"
            :total-items="total"
            :show-page-size="3"
            @change="changePage"
            force-ellipses
            class="page"
            />
            <van-popup v-model="show" position="bottom" round closeable >
                <div class="edit popup">
                    <van-cell-group :border="false">
                    <van-field
                        v-model="commentVal2"
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
                            <van-button class="btn" type="primary" size="normal" color="#1989fa" @click="send(2)">发表</van-button>
                        </div>
                    </van-cell-group>
                </div>
            </van-popup>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions} from 'vuex'
export default {
    data(){
        return {
            commentVal1:"",
            commentVal2:"",
            show:false,
            currentPage:1,
            pageSize:10,
            commentatorId:""
        }
    },
    created(){
        this.getCommentList({articleId:this.$route.query.id, currentPage:this.currentPage, pageSize:this.pageSize})
    },
    computed:{
        ...mapState('comments', ['commentsList','total'])
    },
    methods:{
        ...mapActions('comments', ['getCommentList','addComment']),
        showPopup(e){
            this.show = !this.show
            this.commentatorId = e
        },
        send(e){
            if(e == 1){
                console.log({articleId:this.$route.query.id, reviewerId:this.$cookie.get('userID'), commentatorId:this.commentatorId, content:this.commentVal1})
                this.addComment({articleId:this.$route.query.id, reviewerId:this.$cookie.get('userID'), commentatorId:this.commentatorId, content:this.commentVal1})
                .then(() => {
                    this.commentVal1 = ""
                    this.getCommentList({articleId:this.$route.query.id, currentPage:this.currentPage, pageSize:this.pageSize})
                    this.$notify({ type: 'success', message: '发表成功' });
                })
            }else if(e == 2){
                console.log({articleId:this.$route.query.id, reviewerId:this.$cookie.get('userID'), commentatorId:this.commentatorId, content:this.commentVal2})
                this.addComment({articleId:this.$route.query.id, reviewerId:this.$cookie.get('userID'), commentatorId:this.commentatorId, content:this.commentVal2})
                .then(() => {
                    this.commentVal2 = ""
                    this.show = false
                    this.getCommentList({articleId:this.$route.query.id, currentPage:this.currentPage, pageSize:this.pageSize})
                    this.$notify({ type: 'success', message: '发表成功' });
                })
            }
        },
        changePage(){
            this.getCommentList({articleId:this.$route.query.id, currentPage:this.currentPage, pageSize:this.pageSize})
        }
    }
}
</script>

<style lang="less" scoped>
    .comments{
        background: #fff;
        .title{
            font-size: 0.35rem;
            font-weight: bold;
            color: #666;
            padding: 0.3rem 0.3rem 0;
        }
        .edit{
            padding: 0.3rem;
            box-sizing: border-box;
            &.popup{
                margin-top: 1rem;
            }
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
                        .van-image{
                            display: block;
                        }
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
                    .time{
                        color: #999;
                        font-size: 0.2rem;
                    }
                    .btn{
                        border-radius: 0.2rem;
                        font-size: 0.3rem;
                        color: #1989fa;
                        padding: 0.2rem 0.3rem;
                        // cursor: pointer;
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