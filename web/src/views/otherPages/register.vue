<template>
    <div class="login">
        <div class="login-box">
            <el-card shadow="always">
                <div class="title">
                    <p>注册</p>
                </div>
                <div class="form">
                    <el-form ref="form" :model="form" label-width="60px">
                        <el-form-item label="用户名">
                            <el-input v-model="form.username" maxlength=20 placeholder="请输入用户名"></el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="form.password1" 
                            show-password 
                            minlength=6  
                            maxlength=20 
                            @keyup.enter="register"
                            placeholder="请输入密码">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="form.password2" 
                            show-password 
                            minlength=6  
                            maxlength=20 
                            @keyup.enter="register"
                            placeholder="请再次输入密码">
                            </el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="btn">
                    <el-button type="primary" @click="register">注册</el-button>
                </div>
            </el-card>
            <div class="go" @click="$router.push('/login')">
                <span>返回登录</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form:{
                username:'',
                password1:'',
                password2:''
            },
        }
    },
    methods:{
        //提交表单
        async register(){
            if(this.form.username == '') return this.$message({
                message:'请输入用户名',
                type:'warning'
            })
            if(this.form.password1 == '' || this.form.password2 == '') return this.$message({
                message:'请输入密码',
                type:'warning'
            })
            if(this.form.password1 !== this.form.password2)return this.$message({
                message:'两次出入密码不一致',
                type:'warning'
            })
            let reg = /^[A-Za-z0-9]{6,20}$/
            if(!reg.test(this.form.password1) || !reg.test(this.form.password2))return this.$message({
                message:'密码为6~20位数字字母下划线',
                type:'warning'
            })
            this.$cookie.set('username', this.form.username)
            let res = await this.$http.post('/register', {username:this.form.username, password: this.form.password2})
            if(res.data.code == 0){
                this.$message({
                    type:'success',
                    message:"注册成功"
                })
                this.$router.push('/login')
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
      //  background: #f0f0f0;
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
                padding: 20px 0;
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
         .go{
            font-size: 14px;
            line-height: 16px;
            text-decoration: underline;
            color: #666;
            text-align: center;
            cursor: pointer;
            padding: 10px 0;
        }
    }
</style>