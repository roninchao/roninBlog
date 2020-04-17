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
                />
            </van-cell-group>
            <div class="text">
                <div></div>
                <div></div>
            </div>
            <van-button class="btn" type="primary" size="large">登录</van-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            username:'',
            password:'',
            isShowPwd: false
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
        // background: ;
        .form{
            margin: 0.5rem 0;
            border-radius: 0.2rem;
            overflow: hidden;
        }
        .btn{
            border-radius: 0.2rem;
        }
    }
</style>