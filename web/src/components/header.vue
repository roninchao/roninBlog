<template>
    <div class="header-box">
        <div class="item logo" @click="go('/index')">
            <img class="" src="@/assets/logo.png" alt="logo">
        </div>
        <div class="item">
            <div class="users">
                <span v-if="$cookie.get('webToken')" class="info">
                    <i class="el-icon-user"></i>
                    <span>{{$cookie.get('username')}}</span>
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
        .users{
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
                    margin-right: 5px;
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