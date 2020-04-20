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
                    maxlength=20
                    autofocus
                    label-width="1.5rem"
                    class="input"
                />
                <van-field
                    v-model="form.password"
                    clearable
                    required
                    label="密码"
                    :right-icon="isShowPwd?'eye-o':'closed-eye'"
                    :type="isShowPwd?'':'password'"
                    placeholder="请输入密码"
                    maxlength=20
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
            <van-button class="btn" type="primary" size="large" color="#1989fa" @click="submit">登录</van-button>
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
                password:'',
            },
            isShowPwd: false,
            isKeep:false
        }
    },
    computed:{
    },
    created(){
        this.autofill()
    },
    methods:{
        ...mapActions('users', ['login']),
        showPwd(){
            this.isShowPwd = !this.isShowPwd
        },
        submit(){
            if(this.form.username == '') return this.$notify({ type: 'danger', message: '请输入用户名' });
            if(this.form.password == '') return this.$notify({ type: 'danger', message: '请输入密码' });
            let reg = /^[A-Za-z0-9]{6,20}$/
            if(!reg.test(this.form.password)) return this.$notify({ type: 'danger', message: '密码为6~20位数字字母下划线' });
            this.login({username:this.form.username,password:this.form.password}).then(() => {
                if(this.isKeep){
                    this.$cookie.set('isKeep', this.isKeep)
                    this.$cookie.set('username', this.form.username)
                    this.$cookie.set('password', this.form.password)
                }else{
                    this.$cookie.remove('isKeep')
                    this.$cookie.remove('password')
                }
            })
        },
         //自动填写表单
        autofill(){
            let username = this.$cookie.get('username')
            let password = this.$cookie.get('password')
            console.log(password)
            let isKeep = this.$cookie.get('isKeep')
            if(!(username == undefined)){
                this.form.username = username
            }
            if(!(password == undefined)){
                this.form.password = password
            }
            if(!(isKeep == undefined)){
                this.isKeep = JSON.parse(isKeep)
            }
        },
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