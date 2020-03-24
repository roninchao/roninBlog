<template>
    <div class="comments">
        <div v-if="$cookie.get('token')">
            <div class="header">评论<span>（{{total}}条）</span></div>
            <div class="send-comments">
                <div class="head">
                    <div class="left">
                        <div class="image">
                            <i class="el-icon-user"></i>
                        </div>
                        <div class="username">用户名：{{$cookie.get('username')}}</div>
                    </div>
                    <div>
                        <div class="btn" @click="submitComment()">发表</div>
                    </div>
                </div>
                <div class="comment-input">
                    <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    :autosize="{ minRows: 4, maxRows: 10}"
                    v-model="commentVal"
                    maxlength="140"
                    show-word-limit>
                    </el-input>
                </div>
                <div class="comment-content" v-if="commentsList.length>0" v-loading="commentListLoading">
                    <div class="item" >
                        <div class="item-item"  v-for="(v,k) in commentsList" :key="k">
                            <div class="item-head">
                                <div class="image">
                                    <i class="el-icon-user"></i>
                                </div>
                                <div class="username"><span>{{v.reviewerId.username}}</span>
                                    <i v-if="v.commentatorId">
                                        回复 <span>{{v.commentatorId.username}}</span>
                                    </i>
                                ：</div>
                            </div>
                            <div class="item-content">{{v.content}}</div>
                            <div class="btn-box">
                                <div class="btn" @click="openCommentsBox(v.reviewerId._id)">回复</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pages">
                    <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :total="total">
                    </el-pagination>
                </div>
                <el-dialog
                title = '回复评论'
                :visible.sync="dialogVisible"
                top="25vh"
                width="40%"
                :before-close="handleClose">
                    <div class="comment-input">
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        :autosize="{ minRows: 4, maxRows: 10}"
                        v-model="commentVal2"
                        maxlength="140"
                        show-word-limit>
                        </el-input>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="submitComment">确 定</el-button>
                    </span>
                </el-dialog>
            </div>
        </div>
        <div v-else>
            <div class="not-login">
                <div class="text">评论</div>
                <div class="btn" @click="$router.push('/login')">您还没有登录，赶快去登录吧！</div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
    data(){
        return{
            commentVal:'',
            commentVal2:'',
            dialogVisible:false,
            commentatorId:'',
            currentPage:1,
            pageSize:10
        }
    },
    created(){
        this.getCommentList({articleId:this.article._id, currentPage:this.currentPage, pageSize:this.pageSize})
    },
    computed:{
        ...mapState('category',['article']),
        ...mapState('comments',['commentsList', 'commentListLoading','total']),
    },
    methods:{
        ...mapActions('comments', ['addComment', 'getCommentList']),
        openCommentsBox(e) {
            this.dialogVisible = true
            this.commentatorId = e
        },
        handleCurrentChange(e){
            this.currentPage = e
            this.getCommentList({articleId:this.article._id, currentPage:this.currentPage, pageSize:this.pageSize})
        },
        handleClose() {
            this.commentVal2 = ''
            this.dialogVisible = false
        },
        //发表评论
        submitComment() {
            console.log(this.commentsList)
            if(!this.$cookie.get('token')) return this.$message({
                type:'warning',
                message:'请登录后再评论'
            })
            let content = ""
            if(this.commentatorId){
                content = this.commentVal2
                if(this.commentVal2 == '') return this.$message({
                    type:'warning',
                    message:'请输入评论内容'
                })
            }else{
                content = this.commentVal
                if(this.commentVal == '') return this.$message({
                    type:'warning',
                    message:'请输入评论内容'
                })
            }
            this.addComment({articleId:this.article._id, reviewerId:this.$cookie.get('userID'), commentatorId:this.commentatorId, content})
            if(this.commentatorId){
                this.commentVal2 = ''
            }else{
                this.commentVal = ''
            }
            this.commentatorId = ''
            this.dialogVisible = false
            this.getCommentList({articleId:this.article._id, currentPage:this.currentPage, pageSize:this.pageSize})
        }
    }
}
</script>

<style lang='less' scoped>
    .comments{
        .header{
            font-size: 24px;
            color: #666;
            span{
                font-size: 14px;
            }
        }
        .send-comments{
            .head{
                font-size: 30px;
                color: #333;
                display: flex;
                justify-content: space-between;
                padding: 20px 0 10px;
                .left{
                    display: flex;
                    align-items: center;
                    .image{
                        border: 1px solid #999;
                        width: 35px;
                        height: 35px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 5px;
                    }
                    .username{
                        font-size: 14px;
                        padding: 5px 0;
                        color: #666;
                        box-sizing: border-box;
                        padding: 0 10px;
                    }
                }
                .btn{
                    font-size: 14px;
                    color: #666;
                    padding: 8px 29px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    text-align: center;
                    cursor: pointer;
                    user-select: none;
                    transition: all 0.4s;
                    &:hover{
                        background: #f0f0f0;
                    }
                }
            }
            .comment-input{
                margin-bottom: 20px;
            }
            .comment-content{
                .item{
                    margin: 10px 0;
                    padding: 10px 10px 0;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    .item-item{
                        border-bottom: 1px dashed #ccc;
                        padding: 10px;
                        transition: all 0.4s;
                        &:last-child{
                            border-bottom:none;
                        }
                        &:hover .btn{
                            transform: translateY(0px);
                            opacity: 1;
                        }
                        .btn-box{
                            display: flex;
                            justify-content: flex-end;
                        }
                        .btn{
                            transition: all 0.4s;
                            transform: translateY(50px);
                            opacity: 0;
                            width: 70px;
                            box-sizing: border-box;
                            font-size: 14px;
                            color: #666;
                            padding: 5px 0;
                            background: #fff;
                            border: 1px solid #ccc;
                            border-radius: 5px;
                            cursor: pointer;
                            user-select: none;
                            text-align: center;
                            transition: all 0.4s;
                            &:hover{
                                background: #f0f0f0;
                            }
                        }
                    }
                    .item-head{
                        display: inline-block;
                        font-size: 16px; 
                        color: #333;
                        .image{
                            border: 1px solid #999;
                            width: 25px;
                            height: 25px;
                            display: inline-block;
                            text-align: center;
                            line-height: 25px;
                            border-radius: 5px;
                            display: inline-block;
                            background: #fff;
                        }
                        .username{
                            font-size: 14px;
                            line-height: 25px;
                            display: inline-block;
                            color: #666;
                            box-sizing: border-box;
                            padding-left: 5px;
                            span{
                            display: inline-block;

                                color: #ff6743;
                            }
                        }
                        
                    }
                    .item-content{
                        display: inline;
                        font-size: 14px;
                        color: #666;
                        line-height: 25px;
                        word-wrap:break-word
                    }
                }
            }
            .pages{
               display: flex;
               justify-content: center;
            }
        }
        .not-login{
            font-size: 24px;
            color: #666;
            .btn{
                font-size: 14px;
                padding-top: 10px;
                display: inline-block;
                cursor: pointer;
                &:hover{
                    text-decoration: underline;
                }
            }
        }
    }
</style>