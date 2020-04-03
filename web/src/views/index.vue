<template>
    <div class="container">
        <div class="header wow fadeInDown" data-wow-duration ="1s" data-wow-delay ="0.3s"></div>
        <div class="main">
            <!-- 侧边导航栏 -->
            <div class="nav wow fadeInLeft" data-wow-duration ="1s" data-wow-delay ="0.3s">
                <md-navAside></md-navAside>
            </div>
            <div class="content">
                <router-view></router-view>
            </div>
            <div class="aside wow fadeInRight" data-wow-duration ="1s" data-wow-delay ="0.3s"></div>
        </div>
        <div class="footer wow fadeInUp" data-wow-duration ="1s" data-wow-delay ="0.3s"></div>
    </div>
</template>

<script>
import {WOW} from 'wowjs'
export default {
    data(){
        return{
            selectedCate: 0,
        }
    },
    mounted(){
        // 在项目加载完成之后初始化wow
        this.$nextTick(() => {
            let wow = new WOW({
                live:true
            })
            wow.init()
        })
    },
    methods:{
        selectCate(e) {
            console.log(e,this.selectedCate)
            this.selectedCate = e
        }
    }
}
</script>

<style lang='less' scoped>
    .container{
        background: #f0f0f0;
        .header{
            width: 100%;
            height: 60px;
            background: #fff;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 3;
            box-shadow: 0 0 5px #ccc;
        }
        .main{
            width: 1200px;
            display: flex;
            margin: 15px auto;
            padding-top: 60px;
            .nav{
                width: 200px;
                height: auto;
                // background: #f0f0f0;
                position: relative;
              
            }
            .content{
                // flex: 1;
                width: 720px;
                margin: 0 15px;
            }
            .aside{
                width: 250px;
                height: 700px;
                background: #fff;
            }
        }
        .footer{
            width: 100%;
            height: 100px;
            background: #fff;
        }
    }
</style>