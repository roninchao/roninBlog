<template>
    <div class="nav-list">
        <div class="item" :class="selectedCate==k ? 'active':''" 
        v-for="(v, k) in categoryList" :key="k"
        @click="selectCate(k)">
            <i class="el-icon-document"></i>
            <span>{{v.category}}</span>
        </div>
    </div>
</template>

<script>

import {mapState, mapMutations, mapActions} from 'vuex'
export default { 
    data(){
        return{
            selectedCate: 0,
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
        selectCate(e) {
            console.log(e,this.selectedCate)
            this.selectedCate = e
        }
    }
}
</script>

<style lang='less' scoped>
    .nav-list{
        width: 200px;
        position: fixed;
        .item{
            width: 100%;
            height: 45px;
            background: #fff;
            // border: 1px dashed #ddd;
            box-sizing: border-box;
            border-radius: 5px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            padding: 0 20px;
            font-size: 16px;
            color: #666;
            user-select: none;
            cursor: pointer;
            transition: all 0.3s;
            span{
                padding-left: 10px;
            }
            &:hover{
                transform: translateX(-10px);
                background: #ccc;
                color: #fff;
                box-shadow: 0 0 5px #ccc;
                // border: 0;
            }
            &.active{
                // background: #fff;
                background: #ccc;
                color: #fff;
                box-shadow: 0 0 5px #ccc;
                // border: 0;
            }
        }
    }
</style>