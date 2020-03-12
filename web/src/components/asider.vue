<template>
    <div class="asider">
        <div class="item active">
            <i class="el-icon-document"></i>
            <span>全部分类</span>
        </div>
        <div class="item" v-for="(v, k) in categoryList" :key="k">
            <i class="el-icon-document"></i>
            <span>{{v.category}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        categoryList:{
            type:Array
        }
    }
}
</script>

<style lang='less' scoped>
    @headerHeight:70px;
    @activeColor:#ff6600;
    @padding:20px;
    .asider{
        width: 230px;
        height: calc( 100% - @headerHeight);
        padding-top: @padding;
        overflow: hidden;
        box-sizing: border-box;
        .active{
            background: #fff;
            i{
                color: @activeColor;
            }
        }
        .item{
            height: 60px;
            cursor: pointer;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            margin-bottom: 5px;
            line-height: 60px;
            padding: 0 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 20px;
            transition: all 0.4s;
            color: #666;
            user-select: none;
            border: 1px solid transparent;
            i{
                transition: all 0.4s;
            }
            &:hover{
                background: #fff;
                box-shadow:0 0 5px #ccc;
                i{
                    color: @activeColor;
                }
                transform: translateX(-5px);
            } 
            &:active{
                // border: 1px solid @activeColor;
                opacity: 0.6;
            }
        }
    }
 @headerHeight:70px;
    @activeColor:#ff6600;
    @padding:20px; @headerHeight:70px;
    @activeColor:#ff6600;
    @padding:20px;</style>