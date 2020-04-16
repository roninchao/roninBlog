<template>
    <div class="tabBar">
        <div class="item" v-for="(v,k) in tabBarList" :key="k" @click="go(v.path)">{{v.name}}</div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            tabBarList:[
                {
                    name:'首页',
                    path:'/tabBar/home'
                },
                {
                    name:'聊天室',
                    path:'/tabBar/chatroom'
                },
                {
                    name:'我的',
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
        height: 2.5rem;
        position: fixed;
        left:0;
		right:0;
        bottom: 0;
        z-index: 999999999999;
        background: #fff;
        .item{
            flex: 1;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>