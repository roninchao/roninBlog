<template>
    <div class="login">
        <div class="login-box">
            <el-card shadow="always">
                <div class="title">
                    <p>后台管理登陆</p>
                </div>
                <div class="form">
                    <el-form ref="form" :model="form" label-width="60px">
                        <el-form-item label="用户名">
                            <el-input v-model="form.username" maxlength=20 placeholder="请输入用户名"></el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="form.password" 
                            show-password 
                            minlength=6  
                            maxlength=20 
                            @keyup.enter="login"
                            placeholder="请输入密码">
                            </el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="handle">
                    <el-checkbox v-model="isKeep" @click="setKeep"><span>记住密码</span></el-checkbox>
                    <span  class="clear" @click="clearDetails">清除密码缓存</span>
                </div>
                <div class="btn">
                    <el-button type="primary" @click="login">登录</el-button>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form:{
                username:'',
                password:''
            },
            isKeep:false,
        }
    },
    created(){
        this.autofill()
    },
    methods:{
        //清除密码缓存
        clearDetails(){
            this.$cookie.remove('password')
        },
        //记住密码
        setKeep(){
            this.isKeep = !this.isKeep
        },
        //自动填写表单
        autofill(){
            let username = this.$cookie.get('username');
            let password = this.$cookie.get('password');
            if(!(username==undefined)){
                this.form.username=username
            }
            if(!(password==undefined)){
                this.form.password=password
            }
        },
        //提交表单
        async login(){
            if(this.form.username == '') return this.$message({
                message:'请输入用户名',
                type:'warning'
            })
            if(this.form.password == '') return this.$message({
                message:'请输入密码',
                type:'warning'
            })
            let reg = /^[A-Za-z0-9]{6,20}$/
            if(!reg.test(this.form.password)) return this.$message({
                message:'密码为6~20位数字字母下划线',
                type:'warning'
            })
            if(this.isKeep){
                this.$cookie.set('username', this.form.username)
                this.$cookie.set('password', this.form.password)
            }
            let res = await this.$http.post('/login', this.form)
            if(res.data.code == 0){
                this.$cookie.set('userID', res.data.data.userID)
                this.$cookie.set('username', res.data.data.username)
                this.$cookie.set('token', res.data.data.token)
                this.$router.push('/admin')
            }
        },
    }
}
</script>

<style lang='less' scoped>
    .login{
       width: 100%;
       height: 100vh;
       display: flex;
       justify-content: center;
       background: #f0f0f0;
    }
    .login-box{
        margin-top: 200px;
        .el-card{
            width: 500px;
            font-size: 14px;
            color: #333;
            .title{
                font-size: 24px;
                text-align: center;
            }
            .handle{
                display: flex;
                justify-content: space-between;
                padding-left: 60px;
                margin-bottom: 22px;
                span{
                    transition: all 0.4s;
                    &:hover{
                        color: #409EFF;
                    }
                }
                .clear{
                    cursor: pointer;
                }
            }
            .btn{
                width: 100%;
                display: flex;
                justify-content: center;
                .el-button{
                    width: 50%;
                }
            }
        }
    }
</style>