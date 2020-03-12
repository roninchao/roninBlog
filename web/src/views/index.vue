<template>
    <div class="index">
        <md-header></md-header>
        <div class="container">
            <md-asider :categoryList="categoryList"></md-asider>
            <div class="content" id="content">
                <div class="content-content">
                    <router-view></router-view>
                </div>
                <md-contentAsider></md-contentAsider>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            categoryList:[],
        }
    },
    created(){
        this.getCategory()
  
    },
    methods:{
        async getCategory(){
            let res = await this.$http.get('/category')
            console.log(res.data.code)
            if(res.data.code == 0){
                console.log(res.data)
                this.categoryList = res.data.cate
            }
        }
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
            flex: 1;
            display: flex;
            justify-content: space-between;
            height: calc(100vh - @headerHeight);
            padding-top: @padding;
            box-sizing: border-box;
            overflow-y:scroll;
            .content-content{
                flex: 1;
            }
        }
    }
</style>