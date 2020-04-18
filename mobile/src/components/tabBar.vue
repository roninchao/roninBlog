<template>
    <div class="tabBar">
        <div class="item" :class="v.path == $route.path?'active':''" v-for="(v,k) in tabBarList" :key="k" @click="go(v.path)">
            <van-icon :name="v.icon" class="icon" />
            <span class="name">{{v.name}}</span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            tabBarList:[
                {
                    name:'首页',
                    icon:'home-o',
                    path:'/tabBar/home'
                },
                {
                    name:'分类',
                    icon:'apps-o',
                    path:'/tabBar/classify'
                },
                {
                    name:'聊天室',
                    icon:'friends-o',
                    path:'/tabBar/chatroom'
                },
                {
                    name:'设置',
                    icon:'setting-o',
                    path:'/tabBar/personCentre'
                }
            ]
        }
    },
    methods:{
        go(e){
            this.$router.push({path:e})
        }
    }
}
</script>

<style lang="less" scoped>
    .tabBar{
        display: flex;
        height: 1.2rem;
        position: fixed;
        left:0;
		right:0;
        bottom: 0;
        z-index: 999999999999;
        background: #fff;
        box-shadow: 0 0 0.1rem #ccc;
        .item{
            flex: 1;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            color: #666;
            // padding: 0.1rem 0;
            box-sizing: border-box;
            &:active{
                background: #f2f2f2;
            }
            &.active{
                color: #ff6600;
            }
            .icon{
                font-size: 0.5rem;
            }
            .name{
                font-size: 0.3rem;
            }
        }
    }
</style>