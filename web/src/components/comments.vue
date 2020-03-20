<template>
    <div class="comments">
        <div class="header">评论<span>（6条）</span></div>
        <div class="send-comments">
            <div class="head">
                <div class="left">
                    <div class="image">
                        <i class="el-icon-user"></i>
                    </div>
                    <div class="username">用户名：pengchao</div>
                </div>
                <div>
                    <div class="btn" @click="submitComment">发表</div>
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
            <div class="comment-content">
                <div class="item">
                    <div class="item-item">
                        <div class="item-head">
                            <div class="image">
                                <i class="el-icon-user"></i>
                            </div>
                            <div class="username"><span>pengchao</span>：</div>
                        </div>
                        <div class="item-content">撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事</div>
                         <div class="btn-box">
                             <div class="btn" @click="openCommentsBox()">回复</div>
                        </div>
                    </div>
                    <div class="item-item">
                        <div class="item-head">
                            <div class="image">
                                <i class="el-icon-user"></i>
                            </div>
                            <div class="username"><span>admin</span> 回复 <span>pengchao</span>：</div>
                        </div>
                        <div class="item-content">撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事</div>
                        <div class="btn-box">
                             <div class="btn">回复</div>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="item-item">
                        <div class="item-head">
                            <div class="image">
                                <i class="el-icon-user"></i>
                            </div>
                            <div class="username">admin：</div>
                        </div>
                        <div class="item-content">撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事</div>
                    </div>
                </div>
                <el-pagination
                background
                layout="prev, pager, next"
                :total="1000">
                </el-pagination>
            </div>
            <el-dialog
            title="回复pengchao"
            :visible.sync="dialogVisible"
            top="25vh"
            width="40%"
            :before-close="handleClose">
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
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
    data(){
        return{
            commentVal:'',
            dialogVisible:false
        }
    },
    created(){
        // this.nextTick(() => {
        //     if(this.$cookie.get('token')){
        //         this.getCommentList()
        //     }
        // })
        if(this.$cookie.get('token')){
            this.getCommentList()
        }
    },
    computed:{
        ...mapState('category',['article']),
    },
    methods:{
        ...mapActions('comments', ['addComment, getCommentList']),
        openCommentsBox() {
            this.dialogVisible = true
        },
        handleClose() {},
        //发表评论
        submitComment() {
            if(!this.$cookie.get('token')) return this.$message({
                type:'warning',
                message:'请登录后再评论'
            })
            if(this.commentVal == '') return this.$message({
                type:'warning',
                message:'请输入评论内容'
            })
            this.addComment({articleId:this.article._id, reviewerId:this.$cookie.get('userID'), commentatorId:'', content:this.commentVal})
        }
    }
}
</script>

<style lang='less' scoped>
    .comments{
        // height: 500px;
        .header{
            font-size: 24px;
            font-size: #666;
            span{
                font-size: 14px;
            }
        }
        .send-comments{
            // margin-top: 20px;
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
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    background: #f0f0f0;
                    .item-item{
                        border-bottom: 1px dashed #ccc;
                        padding: 10px 0;
                        &:last-child{
                            border-bottom:none;
                        }
                        .btn-box{
                            display: flex;
                            justify-content: flex-end;
                        }
                        .btn{
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
                        // align-items: center;
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
                    }
                }
            }
            
        }
    }
</style>