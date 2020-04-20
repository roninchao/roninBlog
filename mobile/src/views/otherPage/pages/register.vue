<template>
    <div class="login">
        <div class="box">
            <van-cell-group class="form">
                <van-field
                    v-model="form.username"
                    label="用户名"
                    clearable
                    required
                    placeholder="请输入用户名"
                    autofocus
                    label-width="1.5rem"
                    class="input"
                />
                <van-field
                    v-model="form.password1"
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
                    v-model="form.password2"
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
            <van-button class="btn" type="primary" size="large" color="#1989fa" @click="submit">注册</van-button>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    data(){
        return{
            form:{
                username:'',
                password1:'',
                password2:'',
            },
            isShowPwd1: false,
            isShowPwd2: false,
            isKeep:false
        }
    },
    methods:{
        ...mapActions('users', ['register']),
        showPwd(e){
            if(e == 1){
                this.isShowPwd1 = !this.isShowPwd1
            }else if(e == 2) {
                this.isShowPwd2 = !this.isShowPwd2
            }
        },
        submit() {
            if(this.form.username == '') return this.$notify({ type: 'danger', message: '请输入用户名' });
            let reg = /^[A-Za-z0-9]{6,20}$/
            if(this.form.password1 == '') return this.$notify({ type: 'danger', message: '请输入密码' });
            if(!reg.test(this.form.password1)) return this.$notify({ type: 'danger', message: '密码为6~20位数字字母下划线' });
            if(this.form.password2 == '') return this.$notify({ type: 'danger', message: '请再次输入密码' });
            if(!reg.test(this.form.password2)) return this.$notify({ type: 'danger', message: '密码为6~20位数字字母下划线' });
            if(this.form.password1 !== this.form.password2) return this.$notify({ type: 'danger', message: '两次输入密码不一致' });
            this.register({username:this.form.username,password:this.form.password2})
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