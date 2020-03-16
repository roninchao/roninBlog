<template>
    <div class="index">
        <md-header></md-header>
        <div class="container">
            <md-asider :categoryList="categoryList"></md-asider>
            <div class="content" id="content">
                <div class="content-content">
                    <router-view></router-view>
                </div>
                <div class="content-aside">
                    <md-contentAsider></md-contentAsider>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions} from 'vuex'
export default {
    data() {
        return{
        }
    },
    created(){
        this.getCategoryList()
    },
    computed:{
        ...mapState('category', ['categoryList'])
    },
    methods:{
        ...mapActions('category', ['getCategoryList']),
    }
   
}
</script>

<style lang='less' scoped>
    @headerHeight:70px;
    @activeColor:#ff6600;
    @padding:20px;
    .container{
        display: flex;
        justify-content: space-between;
        margin-top: @headerHeight;
        background: #f0f0f0;
        box-shadow: 0 0 5px #ccc;
        .content{
            // flex: 1;
            display: flex;
            justify-content: space-between;
            height: calc(100vh - @headerHeight);
            padding-top: @padding;
            box-sizing: border-box;
            overflow-y:scroll;
            .content-content{
                width: 744px;
            }
            .content-aside{
                width: 220px;
            }
        }
    }
</style>