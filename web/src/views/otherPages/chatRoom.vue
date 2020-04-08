<template>
    <div class="chat-room">
        <div class="box">
            <div class="left">
                <div class="top">在线聊天室</div>
                <div class="bottom">
                    <div class="item"  v-for="(v, k) in 5" :key="k">
                        <div class="head">
                            <img src="" alt="">
                        </div>
                        <div class="name">
                            <p>在线聊天室在线聊天室在线聊天室在线聊天室</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="content">
                    <div class="top"></div>
                    <div class="bottom"></div>
                </div>
                <div class="edit"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
    .chat-room{
        width: 100%;
        height: 100vh;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        .box{
            width: 1000px;
            height: 750px;
            border-radius: 5px;
            overflow: hidden;
            box-shadow: 0 0 5px #ccc;
            display: flex;
            .left{
                width: 300px;
                height: 100%;
                .top{
                    width: 100%;
                    height: 85px;
                    background: #354052;
                    font-size: 18px;
                    color: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    letter-spacing: 5px;
                    cursor: default;
                }
                .bottom{
                    height: calc(100% - 85px);
                    // background: #EDEDED;
                    overflow-y: auto;
                    /*定义滚动条的整体样式使其变窄*/
                    &::-webkit-scrollbar{
                        width: 6px;
                        height: 1px;
                    }
                    /*定义滚动条的滑块的样式有圆角和阴影以及自定义的背景色*/
                    &::-webkit-scrollbar-thumb{
                        border-radius: 6px;
                        background: #999;
                    }
                    /*定义滚动条所在轨道的样式。有圆角和阴影以及淡色系的背景色*/
                    &::-webkit-scrollbar-track{
                        border-radius: 6px;
                        background: #f0f0f0;
                    }
                    .item{
                        width: 100%;
                        height: 70px;
                        // border-bottom: 1px solid #ccc;
                        display: flex;
                        // justify-content: ;
                        align-items: center;
                        padding: 0 15px;
                        box-sizing: border-box;
                        cursor: pointer;
                        &:hover{
                            background: #d0d0d0;
                        }
                        .head{
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                            background: #ccc;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .name{
                            font-size: 14px;
                            color: #666;
                            padding-left: 15px;
                            p{
                                width: 200px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                        }
                    }
                }
            }
            .right{
                width: 700px;
                height: 100%;
                .content{
                    width: 100%;
                    height: 75%;
                    .top{
                        width: 100%;
                        height: 85px;
                        background: #3E4959;
                    }
                    .bottom{
                        height: calc(100% - 85px);
                        background: #fff;
                    }
                }
                .edit{
                    width: 100%;
                    height: 25%;
                    background: #d0d0d0;
                }
            }
        }
    }
</style>