<template>
    <div class="header-box">
        <div class="item logo" @click="go('/index')">
            <img class="" src="@/assets/logo.png" alt="logo">
        </div>
        <div class="item">
            <div class="chat-room">
                <span @click="$router.push('/index')">首页</span>
            </div>
            <div class="chat-room">
                <span @click="$router.push('/chatRoom')">聊天室</span>
            </div>
            <div class="chat-room">
                <span @click="$router.push('/personCentre')">个人中心</span>
            </div>
            <div class="users">
                <span v-if="$cookie.get('webToken')" class="info">
                    <i class="el-icon-user"></i>
                    <span>{{$cookie.get('username')}}</span>
                    <span class="exit" @click="exit">[退出]</span>
                </span>
                <span v-else class="login">
                    <span @click="$router.push('/login')">[登录]</span>
                    <span @click="$router.push('/register')">[注册]</span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        go(e){
            let router = this.$route.path
            if(router != '/index'){
                this.$router.push(e)
            }
        },
        exit(){
            this.$confirm('此操作将退出登录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$cookie.remove('userID')
                // this.$cookie.remove('username')
                this.$cookie.remove('webToken')
                this.$message({
                    type: 'success',
                    message: '退出登录成功!'
                });
                this.$router.go(0)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消退出登录'
                });          
            });
        }
    }
}
</script>

<style lang='less' scoped>
    .header-box{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .item{
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .logo{
            height: 100%;
            cursor: pointer;
            img{
                width: 269px;
                height: 100%;
            }
        }
        .chat-room{
            font-size: 14px;
            color: #666;
            margin: 0 15px;
            span{
                cursor: pointer;
            }
        }
        .users{
            padding-left: 15px;
            .info{
                font-size: 14px;
                color: #666;
                display: flex;
                justify-content: space-between;
                align-items: center;
                i{
                    border-radius: 50%;
                    border: 1px solid #ccc;
                    padding: 5px;
                }
                span{
                    padding-left: 5px;
                    cursor: default;
                }
                .exit{
                    cursor: pointer;
                    &:hover{
                        text-decoration: underline;
                    }
                }
            }
            .login{
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 14px;
                color: #666;
                span{
                    cursor: pointer;
                    padding: 0 5px;
                    &:hover{
                        text-decoration: underline;
                    }
                }
            }
        }
    }
</style>