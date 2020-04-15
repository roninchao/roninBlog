<template>
    <div class="container">
        <!-- 页头 -->
        <div class="header">
            <div class="content">
                <md-header></md-header>
            </div>
        </div>
        <div class="main">
            <!-- 侧边导航栏 -->
            <div class="nav">
                <md-navAside></md-navAside>
            </div>
            <!-- 主体 -->
            <div class="content">
                <router-view></router-view>
            </div>
            <!-- 侧边栏 -->
            <div class="aside">
                <md-ranking rankingName="热评榜" :ranking="commentsRanking"></md-ranking>
                <md-ranking rankingName="新增榜" :ranking="newRanking"></md-ranking>
            </div>
            <!-- 回到顶部 -->
            <el-backtop :bottom="150">
                <div class="back">
                    <i class="el-icon-caret-top"></i>
                </div>
            </el-backtop>
        </div>
        <!-- 页脚 -->
        <div class="footer">
            <md-footer></md-footer>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
    data(){
        return{
            selectedCate: 0,
        }
    },
    created() {
        window.scroll(0,0)
        this.getCommentsRanking()
        this.getNewRanking()
    },
    watch:{
        $route(v){
            if(v){
                console.log(v)
            }
        }
    },
    computed:{
        ...mapState('category', ['articleList', 'commentsRanking', 'newRanking'])
    },
    methods:{
        ...mapActions('category', ['getCommentsRanking', 'getNewRanking']),
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
            display: flex;
            justify-content: center;
            .content{
                width: 1200px;
            }
        }
        .main{
            width: 1200px;
            min-height: 100vh;
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
            height: 60px;
            background: #333;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>