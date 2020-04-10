<template>
    <div class="chat-room">
        <div class="box">
            <div class="top">
                <div class="title">在线聊天室</div>
                <div class="count">
                    （在线人数：22）
                </div>
            </div>
            <div class="middle">
                <div class="item" v-for="(v,k) in List" :key="k">
                    <div class="others item-item">
                        <div class="user">{{$cookie.get('username')}}</div>
                        <div class="text">{{v}}</div>
                    </div>
                    <div class="me item-item">
                        <div class="text">{{v}}</div>
                        <div class="user">{{$cookie.get('username')}}</div>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="edit">
                    <div class="item">
                        <textarea name="" id="" cols="30" rows="5" v-model="val"></textarea>
                    </div>
                    <div class="item">
                        <div class="btn" @click="sendMessage">发送</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            socket:"",
            val:"",
            List:[]
        }
    },
    sockets: {
        connection () {
            console.log('socket已经连接');
        },
        message (data) {
            this.$socket.emit('message', data);
        },
        notice (data) {
            this.List.push(data)
        },
        close(){
            console.log("socket已经断开连接");
        }
    },
    mounted () {
        this.$socket.emit('connection')
    },
    created(){
    },
    methods:{
        sendMessage(){
            this.$socket.emit('message', this.val);
            this.val=""
        }
    }
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
            width: 800px;
            border-radius: 5px;
            overflow: hidden;
            box-shadow: 0 0 5px #ccc;
            .top{
                width: 100%;
                height: 85px;
                background: #354052;
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                .title{
                    font-size: 24px;
                    color: #fff;
                    letter-spacing: 5px;
                    padding-bottom: 10px;
                    user-select: none;
                }
                .count{
                    font-size: 14px;
                    color: #fff;
                    user-select: none;
                }
            }
            .middle{
                width: 100%;
                height: 600px;
                background: #fafafa;
                overflow: auto;
                padding: 15px;
                box-sizing: border-box;
                /*定义滚动条的整体样式使其变窄*/
                &::-webkit-scrollbar{
                    width: 6px;
                    height: 1px;
                }
                /*定义滚动条的滑块的样式有圆角和阴影以及自定义的背景色*/
                &::-webkit-scrollbar-thumb{
                    border-radius: 6px;
                    background: #ccc;
                }
                /*定义滚动条所在轨道的样式。有圆角和阴影以及淡色系的背景色*/
                &::-webkit-scrollbar-track{
                    border-radius: 6px;
                    background: #fff;
                }
                .item{
                    display: flex;
                    margin-bottom: 15px;
                    flex-direction: column;
                    .item-item{
                        display: flex;
                        .user{
                            // display: inline-block;
                            background: #ccc;
                            color: #fff;
                            border-radius: 5px;
                            font-size: 14px;
                            cursor: default;
                            padding: 10px;
                            height: 20px;
                        }
                        .text{
                            // display: inline-block;
                            background: #fff;
                            border-radius: 5px;
                            color: #666;
                            font-size: 14px;
                            cursor: default;
                            padding: 10px;
                        }
                    }
                    .others{
                        align-self: flex-start;
                        .text{
                            margin-left: 15px;
                        }
                    }
                    .me{
                        align-self: flex-end;
                        .text{
                            margin-right: 15px;
                        }
                    }
                    
                }
            }
            .bottom{
                width: 100%;
                // height: 200px;
                background: #fff;
                padding: 15px;
                box-sizing: border-box;
                // display: flex;
                .item:last-child{
                    display: flex;
                    justify-content: flex-end;
                    padding-top: 5px;
                }
                textarea{
                    width: 100%!important;
                    height: 120px!important;
                    // padding: 15px;
                    overflow: auto;
                    box-sizing: border-box;
                    resize: none;
                    font-size: 16px;
                    color: #666;
                    outline: none;
                    border: 0;
                    font-family: "Microsoft YaHei";
                    letter-spacing: 2px; 
                    /*定义滚动条的整体样式使其变窄*/
                    &::-webkit-scrollbar{
                        width: 6px;
                        height: 1px;
                    }
                    /*定义滚动条的滑块的样式有圆角和阴影以及自定义的背景色*/
                    &::-webkit-scrollbar-thumb{
                        border-radius: 6px;
                        background: #ccc;
                        cursor: pointer!important;
                    }
                    /*定义滚动条所在轨道的样式。有圆角和阴影以及淡色系的背景色*/
                    &::-webkit-scrollbar-track{
                        border-radius: 6px;
                        background: #fff;
                    }
                }
                .btn{
                    width: 100px;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #354052;
                    font-size: 14px;
                    color: #fff;
                    border-radius: 5px;
                    user-select: none;
                    cursor: pointer;
                    &:active{
                        opacity: 0.6;
                    }
                }
            }
        }
    }
</style>