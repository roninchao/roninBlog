<template>
    <div class="login">
        <div class="box">
            <van-cell-group class="form">
                <van-field
                    v-model="username"
                    label="用户名"
                    clearable
                    required
                    placeholder="请输入用户名"
                    autofocus
                    label-width="1.5rem"
                    class="input"
                />
                <van-field
                    v-model="password"
                    clearable
                    required
                    label="密码"
                    :right-icon="isShowPwd?'eye-o':'closed-eye'"
                    :type="isShowPwd?'':'password'"
                    placeholder="请输入密码"
                    label-width="1.5rem"
                    @click-right-icon="showPwd"
                    class="input"
                />
                 <div class="text">
                    <div>
                        <van-checkbox v-model="isKeep" checked-color="#1989fa">记住密码</van-checkbox>
                    </div>
                    <div @click="$router.push('/otherPage/register')">
                        没有账号?赶快前往注册吧！
                    </div>
                </div>
            </van-cell-group>
            <van-button class="btn" type="primary" size="large" color="#1989fa">登录</van-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            username:'',
            password:'',
            isShowPwd: false,
            isKeep:false
        }
    },
    methods:{
        showPwd(){
            this.isShowPwd = !this.isShowPwd
        }
    }
}
</script>

<style lang="less" scoped>
    .box{
        padding: 0 0.3rem;
        box-sizing: border-box;
        .form{
            margin: 0.5rem 0;
            border-radius: 0.2rem;
            overflow: hidden;
            .input{
                font-size: 0.3rem;
            }
            .text{
                font-size: 0.3rem;
                color: #666;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin:  0.32rem 0.45rem;
                &>div:last-child{
                    text-decoration: underline;
                }
            }
        }
        .btn{
            border-radius: 0.2rem;
            font-size: 0.45rem;
        }
    }
</style>