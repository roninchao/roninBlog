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
                    v-model="password1"
                    clearable
                    required
                    label="密码"
                    :right-icon="isShowPwd1?'eye-o':'closed-eye'"
                    :type="isShowPwd1?'':'password'"
                    placeholder="请输入密码"
                    label-width="1.5rem"
                    @click-right-icon="showPwd(1)"
                    class="input"
                />
                 <van-field
                    v-model="password2"
                    clearable
                    required
                    label="密码"
                    :right-icon="isShowPwd2?'eye-o':'closed-eye'"
                    :type="isShowPwd2?'':'password'"
                    placeholder="请再次输入密码"
                    label-width="1.5rem"
                    @click-right-icon="showPwd(2)"
                    class="input"
                />
            </van-cell-group>
            <van-button class="btn" type="primary" size="large" color="#1989fa">注册</van-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            username:'',
            password1:'',
            password2:'',
            isShowPwd1: false,
            isShowPwd2: false,
            isKeep:false
        }
    },
    methods:{
        showPwd(e){
            if(e == 1){
                this.isShowPwd1 = !this.isShowPwd1
            }else if(e == 2) {
                this.isShowPwd2 = !this.isShowPwd2
            }
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
        }
        .btn{
            border-radius: 0.2rem;
            font-size: 0.45rem;
        }
    }
</style>