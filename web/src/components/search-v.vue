<template>
    <div class="search">
        <div class="search-box">
            <i class="el-icon-search left"></i>
            <input class="text" v-model="searchText" ref="input" placeholder="请输入文章标题">
            <i class="el-icon-circle-close right" v-show="search" @click="clearSearch"></i>
        </div>
        <div class="btn" @click="search">搜索</div>
    </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
    data(){
        return{
            searchText:'',
        }
    },
    methods:{
        ...mapMutations('category', ['clearCurrentPage']),
        ...mapActions('category', ['searchArticle']),
        clearSearch(){
            this.searchText = ''
        },
        search() {
            if(this.searchText == ''){
                this.$refs.input.focus()
                this.$message({
                    type:"warning",
                    message:"请输入搜索内容"
                })
                return
            }
            this.clearCurrentPage()
            this.searchArticle({search: this.searchText})
        }
    }
}
</script>

<style lang='less' scoped>
    @activeColor:#ff6600;
    .search{
        display: flex;
        .search-box{
            position: relative;
            .text{
                height: 36px;
                width: 200px;
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;
                border: 1px solid #ccc;
                outline: none;
                box-sizing: border-box;
                font-size: 14px;
                color: #666;
                padding: 0 30px;
                &:focus{
                    border:  1px solid @activeColor;
                }
            }
            i{
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
            }
            .left{
                left: 10px;
            }
            .right{
                right: 10px;
                cursor: pointer;
                &:active{
                    opacity: 0.6;
                }
            }
        }
    }
    .btn{
        width: 60px;
        height: 36px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        cursor: pointer;
        text-align: center;
        line-height: 36px;
        box-sizing: border-box;
        user-select: none;
        background: #ccc;
        color: #fff;
        transition: background 0.4s;
        &:hover{
            background: #999;
        }
        &:active{
            opacity: 0.6;
        }
    }
</style>