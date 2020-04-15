<template>
    <div class="header-box">
        <div class="item logo" @click="go('/index')">
            <img class="" src="@/assets/logo.png" alt="logo">
        </div>
        <div class="item">
            <div class="menu">
                <div class="chat-room" :class="$route.path == '/index'?'active':''" @click="go('/index')">
                    <span>HOME</span>
                    <span>首页</span>
                </div>
                <div class="chat-room" :class="$route.path == '/chatRoom'?'active':''" @click="go('/chatRoom')">
                    <span>CHATROOM</span>
                    <span>聊天室</span>
                </div>
                <div class="chat-room" :class="$route.path == '/personCentre'?'active':''" @click="go('/personCentre')">
                    <span>PERSON</span>
                    <span>个人中心</span>
                </div>
            </div>
            <div class="users">
                <span v-if="$cookie.get('webToken')" class="info">
                    <div class="avatar">
                        <el-dropdown  @command="exit">
                            <span class="el-dropdown-link">
                                <el-avatar :src="$cookie.get('avatar')" v-if="$cookie.get('avatar')"></el-avatar>
                                <el-avatar icon="el-icon-user-solid" v-else></el-avatar>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="username">
                                    <span>{{$cookie.get('username')}}</span>
                                </el-dropdown-item>
                                <el-dropdown-item command="exit">
                                    <span>[退出]</span>
                                </el-dropdown-item>
                        </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    
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
            if(router != e){
                this.$router.push(e)
            }
        },
        exit(e){
            if(e == "exit"){
                this.$confirm('此操作将退出登录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$cookie.remove('userID')
                    this.$cookie.remove('avatar')
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
            }else if(e == "username"){
                this.go('/personCentre')
            }
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
        overflow: hidden;
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
        .menu{
            display: flex;
            .chat-room{
                width: 100px;
                font-size: 14px;
                color: #666;
                display: flex;
                flex-direction: column;
                align-items: center;
                overflow: hidden;
                transition: all 0.3s;
                cursor: pointer;
                &:hover{
                    background: #f0f0f0;
                    span{
                        transform: translateY(30px);
                        color: #ff6600;
                    }
                }
                span{
                    display: block;
                    height: 60px;
                    line-height: 60px;
                    transition: all 0.3s;
                    transform: translateY(-30px);
                }
            }
            .active{
                color: #ff6600;
            }
        }
        .users{
            padding-left: 15px;
            .avatar{
                .exit{
                    cursor: pointer;
                    &:hover{
                        text-decoration: underline;
                    }
                }
            }
            .info{
                font-size: 14px;
                color: #666;
                display: flex;
                justify-content: space-between;
                align-items: center;
                span{
                    cursor: pointer;
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