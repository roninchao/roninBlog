<template>
    <div class="chatroom">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <div class="chat-list" ref="chatList">
                <div class="item" v-for="(v,k) in chatList" :key="k">
                    <div class="me"  v-if="v.nameId == $cookie.get('userID')">
                        <div class="content" v-html="v.content"></div>
                        <div class="avatar">
                            <van-image
                                width="100%"
                                height="100%"
                                fit="cover"
                                :src="v.avatar"
                                v-if="v.avatar"
                                />
                            <van-icon name="user-o" v-else/>
                        </div>
                    </div>
                    <div class="other" v-else>
                        <div class="avatar">
                            <van-image
                                width="100%"
                                height="100%"
                                fit="cover"
                                :src="v.avatar"
                                v-if="v.avatar"
                                />
                            <van-icon name="user-o" v-else/>
                        </div>
                        <div class="content" v-html="v.content"></div>
                    </div>
                    <div class="time">{{v.time}}</div>
                </div>
            </div>
        </van-pull-refresh>
        <div class="edit">
            <van-field
            v-model="val"
            rows="1"
            autosize
            :border="false"
            type="textarea"
            class="textarea"
            maxlength="140"
            />
            <van-button class="btn" type="primary"  size="normal" color="#1989fa" @click="send">发表</van-button>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    data(){
        return{
            val:"",
            currentPage:1,
            pageSize:15,
            isLoading:false
        }
    },
    created(){
        this.getChatList({currentPage:this.currentPage, pageSize:this.pageSize}).then(() => {
            this.$refs.chatList.scrollTop = this.$refs.chatList.scrollHeight
        })
    },
    computed:{
        ...mapState('chatroom', ['chatList', 'isMore'])
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
            this.$refs.chatList.scrollTop = this.$refs.chatList.scrollHeight
        },
        close(){
            console.log("socket已经断开连接");
        },
    },
    mounted () {
        this.$socket.emit('connection')
        setTimeout(() => {
            this.$refs.chatList.scrollTop = this.$refs.chatList.scrollHeight
        }, 200)
    },
    destroyed(){
        this.$socket.emit('close')
    },
    methods:{
        ...mapMutations('chatroom', ['addChatItem']),
        ...mapActions('chatroom', ['getChatList']),
        onRefresh(){
            if(this.isMore){
                this.$toast.loading({
                    message: '加载中...',
                    forbidClick: true,
                });
                this.currentPage++
                this.isLoading = true
                this.getChatList({currentPage:this.currentPage, pageSize:this.pageSize}).then(() => {
                    this.isLoading = false
                    this.$toast.clear()
                })
            }else{
                this.$notify({ type: 'primary', message: '没有更多数据' });
                this.isLoading = false
            }
        },
        send(){
            if(this.val == "") return this.$notify({ type: 'warning', message: '发送内容不能为空！' })
            let token = this.$cookie.get('mobileToken')
            this.$socket.emit('message', {token, val:this.val});
            this.val=""
        },
    }
}
</script>

<style lang="less" scoped>
    .chatroom{
        width: 100%;
        padding: 1.2rem 0 3rem;
        .chat-list{
            width: 100%;
            height: 100%;
            background: #f0f0f0;
            padding: 0.3rem;
            // padding-bottom: 1.5rem;
            box-sizing: border-box;
            .item{
                .avatar{
                    width: 1rem;
                    height: 1rem;
                    border-radius: 0.1rem;
                    overflow: hidden;
                    background: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .van-icon{
                        font-size: 0.6rem;
                        color: #666;
                    }
                }
                .content{
                    max-width: 6.2rem;
                    background: #fff;
                    color: #333;
                    font-size: 0.35rem;
                    border-radius: 0.1rem;
                    padding: 0.27rem 0.3rem;
                    margin-left: 0.3rem;
                }
                .me,.other{
                    display: flex;
                    align-items: flex-start;
                    margin-bottom: 0.3rem;
                }
                .me{
                    justify-content: flex-end;
                    .content{
                        margin-right: 0.3rem;
                        background: #07c160;
                    }
                }
                .other{
                    justify-content: flex-start;
                }
            }
            .time{
                display: flex;
                justify-content: center;
                font-size: 0.3rem;
                color: #999;
                margin-bottom: 0.3rem;
            }
        }
        .edit{
            display: flex;
            justify-content: center;
            align-items: flex-end;
            position: fixed;
            left: 0;
            right: 0;
            bottom: 1.5rem;
            background: #fff;
            padding: 0.3rem;
            .textarea{
                border: 1px solid #f2f2f2;
                border-radius: 0.2rem;
            }
            .btn{
                width: 2.5rem;
                border-radius: 0.2rem;
                margin-left: 0.3rem;
            }
        }
    }
</style>