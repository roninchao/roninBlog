<template>
    <div class="container">
        <div class="header wow fadeInDown" data-wow-duration ="1s" data-wow-delay ="0s"></div>
        <div class="main">
            <!-- 侧边导航栏 -->
            <div class="nav wow fadeInLeft" data-wow-duration ="1s" data-wow-delay ="0s">
                <md-navAside></md-navAside>
            </div>
            <div class="content">
                <router-view></router-view>
            </div>
            <div class="aside wow fadeInRight" data-wow-duration ="1s" data-wow-delay ="0s">
                <md-ranking rankingName="热评榜" :ranking="articleList"></md-ranking>
                <md-ranking rankingName="新增榜" :ranking="articleList"></md-ranking>
            </div>
            <el-backtop :bottom="150">
                <div class="back">
                    <i class="el-icon-caret-top"></i>
                </div>
            </el-backtop>
        </div>
        <div class="footer wow fadeInUp" data-wow-duration ="1s" data-wow-delay ="0s"></div>
    </div>
</template>

<script>
import {WOW} from 'wowjs'
import {mapState} from 'vuex'
export default {
    data(){
        return{
            selectedCate: 0,
        }
    },
    created(){
        // 在项目加载完成之后初始化wow
        this.$nextTick(() => {
            let wow = new WOW({
                live:true
            })
            wow.init()
        })
    },
    computed:{
        ...mapState('category', ['articleList'])
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
                position: relative;
              
            }
            .content{
                width: 720px;
                margin: 0 15px;
            }
            .aside{
                width: 250px;
                height: 700px;
            }
            .back{
                height: 100%;
                width: 100%;
                background: #fff;
                text-align: center;
                line-height: 40px;
                border-radius: 5px;
                color: #666;
                transition: all 0.3s;
                &:hover{
                    background: #ccc;
                    color: #fff;
                }
            }
        }
        .footer{
            width: 100%;
            height: 100px;
            background: #fff;
        }
    }
</style>