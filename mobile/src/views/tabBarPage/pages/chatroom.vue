<template>
    <div class="chatroom">
        <div class="chat-list">
            <div class="item" v-for="(v,k) in 20" :key="k">
                <div class="other">
                    <div class="avatar">
                        <van-image
                            width="100%"
                            height="100%"
                            fit="cover"
                            src="https://img.yzcdn.cn/vant/cat.jpeg"
                            />
                    </div>
                    <div class="content">{{v}}sdafsaddsg对方过后闪电发货</div>
                </div>
                <div class="me">
                    <div class="content">sdafsaddsg对方过后sadf sageagea tgawet迪桑特热人头儿童问题儿童热闪电发货</div>
                    <div class="avatar">
                        <van-image
                            width="100%"
                            height="100%"
                            fit="cover"
                            src="https://img.yzcdn.cn/vant/cat.jpeg"
                            />
                    </div>
                </div>
                <div class="time">2016-10-22 125554</div>
            </div>
        </div>
        <div class="edit">
            <van-field
            v-model="message"
            rows="1"
            autosize
            :border="false"
            type="textarea"
            class="textarea"
            maxlength="140"
            />
            <van-button class="btn" type="primary"  size="normal" color="#1989fa">发表</van-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            message:""
        }
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
            box-sizing: border-box;
            .item{
                .avatar{
                    width: 1rem;
                    height: 1rem;
                    border-radius: 0.1rem;
                    overflow: hidden;
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