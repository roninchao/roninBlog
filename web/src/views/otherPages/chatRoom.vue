<template>
    <div class="chat-room">
        <div class="box">
            <div class="top">
                <div class="title">在线聊天室</div>
                <div class="count">
                    <!-- 在线人数：{{count}} -->
                </div>
            </div>
            <div class="middle" ref="chatContent">
                <div class="item" v-for="(v,k) in chatList" :key="k">
                    <div class="me item-item" v-if="v.nameId == $cookie.get('userID')">
                        <div class="text">{{v.content}}</div>
                        <div class="user">{{v.name}}</div>
                    </div>
                    <div class="others item-item" v-else>
                        <div class="user">{{v.name}}</div>
                        <div class="text">{{v.content}}</div>
                    </div>
                    <div class="time" v-if="v.time">
                        <span>{{v.time}}</span>
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
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
    data(){
        return{
            socket:"",
            val:"",
            currentPage:1,
            pageSize:20
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
            this.addChatItem(data)
            setTimeout(()=>{
                this.$refs.chatContent.scrollTop = this.$refs.chatContent.scrollHeight
            },0)
        },
        close(){
            console.log("socket已经断开连接");
        },
    },
    mounted () {
        this.$socket.emit('connection')
        setTimeout(() => {
            this.$refs.chatContent.scrollTop = this.$refs.chatContent.scrollHeight
        }, 200)
    },
    created(){
        this.getChatList({currentPage:this.currentPage, pageSize:this.pageSize})
    },
    updated(){
        let ele = this.$refs.chatContent
        ele.onscroll = () => {
            if(this.$refs.chatContent.scrollTop <= 0 && this.isMore){
                this.currentPage++
                this.getChatList({currentPage:this.currentPage, pageSize:this.pageSize})
            }
        }
    },
    destroyed(){
        this.$socket.emit('close')
    },
    computed:{
        ...mapState('chatroom', ['chatList', 'isMore'])
    },
    methods:{
        ...mapMutations('chatroom', ['addChatItem']),
        ...mapActions('chatroom', ['getChatList']),
        sendMessage(){
            if(this.val == "") return this.$message.warning('发送内容不能为空！')
            let token = this.$cookie.get('webToken')
            this.$socket.emit('message', {token, val:this.val});
            this.val=""
        },
        // scrollBottomOrTop(e) {
        //     var clients = e.innerHeight || e.clientHeight
        //     var scrollTop = e.scrollTop;
        //     // 这里存在兼容问题，会把body当成div来处理，如果用document.body.scrollHeight就得不到正确的高度，用body时需要把doctype后面的html去掉
        //     // 这里没用body，而是用到documentElement
        //     var wholeHeight = e.scrollHeight;
        //     if (clients + scrollTop >= wholeHeight) {
        //         alert("我到底部了");
        //         // 在实际应用中可以通过请求后台获取下一页的数据，然后显示到当前位置，就能达到按页加载的效果。
        //     }
        //     if (scrollTop == 0) {
        //         alert("我到顶部了");
        //     }
        // }
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
                    font-family: "Microsoft YaHei";
                }
                .count{
                    font-size: 14px;
                    color: #fff;
                    user-select: none;
                    font-family: "Microsoft YaHei";
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
                            width: 80px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            background: #ccc;
                            color: #fff;
                            border-radius: 5px;
                            font-size: 14px;
                            cursor: default;
                            padding: 0 10px;
                            height: 40px;
                            text-align: center;
                            line-height: 40px;
                            font-family: "Microsoft YaHei";
                        }
                        .text{
                            max-width: 505px;
                            background: #fff;
                            border-radius: 5px;
                            color: #666;
                            font-size: 14px;
                            font-family: "Microsoft YaHei";
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
                            background: #00CD66;
                            color: #fff;
                        }
                    }
                    .time{
                        margin: 0 auto;
                        margin-top: 15px;
                        text-align: center;
                        span{
                            background: rgba(0,0,0,0.1);
                            font-size: 12px;
                            color: #fff;
                            display: inline-block;
                            padding: 3px 10px;
                            border-radius: 3px;
                            font-family: "Microsoft YaHei";
                        }
                    }
                }
            }
            .bottom{
                width: 100%;
                background: #fff;
                padding: 15px;
                box-sizing: border-box;
                .item:last-child{
                    display: flex;
                    justify-content: flex-end;
                    padding-top: 5px;
                }
                textarea{
                    width: 100%!important;
                    height: 120px!important;
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