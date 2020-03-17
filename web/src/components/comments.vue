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
                    <div class="btn">发表</div>
                </div>
            </div>
            <div class="comment-input">
                <el-input
                type="textarea"
                placeholder="请输入内容"
                :autosize="{ minRows: 3, maxRows: 4}"
                v-model="commentVal"
                maxlength="140"
                show-word-limit>
                </el-input>
            </div>
            <div class="comment-content">
                <div class="item">
                    <div class="item-head">
                        <div class="image">
                            <i class="el-icon-user"></i>
                        </div>
                        <div class="username">pengchao：</div>
                    </div>
                     <div class="item-content">撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事</div>
                </div>
                <div class="item">
                    <div class="item-head">
                        <div class="image">
                            <i class="el-icon-user"></i>
                        </div>
                        <div class="username">admin 回复@pengchao:</div>
                        <!-- <div class="username"></div> -->
                    </div>
                     <div class="item-content">撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事撒地方撒发撒地方萨嘎噶事</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            commentVal:''
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
                padding: 20px 0;
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
                    border: 1px solid #f0f0f0;
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
            .comment-content{
                .item{
                    margin: 10px 0;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    // display: flex;
                    background: #f0f0f0;
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