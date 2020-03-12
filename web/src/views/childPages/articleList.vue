<template>
    <div class="article-list">
        <div class="content-content">
            <div class="items-header">
                <div class="item radio">
                    <el-radio-group v-model="radio" size="medium" :fill="activeColor">
                        <el-radio-button label="时间"></el-radio-button>
                        <el-radio-button label="标题"></el-radio-button>
                    </el-radio-group>
                </div>
                <div class="item search">
                   <md-search></md-search>
                </div>
            </div>
            <div class="items">
                <div class="item" v-for="(v, k) in 20" :key='k'>
                    <div @click="go">
                        <md-artistDesc></md-artistDesc>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            search:'',
            radio:'',
            activeColor:'#ccc'
        }
    },
    methods:{
        clearSearch(){
            this.search = ''
        },
        go(){
            this.$router.push('/detail')
        }
    }
}
</script>

<style lang='less' scoped>
    @headerHeight:70px;
    @activeColor:#ff6600;
    @padding:20px;
    .content-content{
        .items-header{
            height: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 @padding;
            font-size: 14px;
            color: #666;
            background: #fff;
            border-top-right-radius: 5px;
        }
        .items{
            background: #fff;
            padding: 0 @padding ;
            font-size: 16px;
            color: #333;
            .item{
                padding: @padding 10px;
                border-bottom: 1px dashed #ccc;
                transition: all 0.4s;
                border-radius: 5px;
                cursor: pointer;
                &:hover{
                    box-shadow: inset 0 0 10px #ccc;
                    transform: translateX(-10px);
                }
            }
        }
    }
</style>