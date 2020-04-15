<template>
    <div class="nav-list">
        <div class="item" :class="selectedCateID==v._id ? 'active':''" 
        v-for="(v, k) in categoryList" :key="k"
        @click="selectCate(v._id)">
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
        }
    },
    created(){
        this.getCategoryList()
    },
    computed:{
        ...mapState('category', ['categoryList', 'selectedCateID'])
    },
    methods:{
        ...mapMutations('category', ['setSelectedCateID']),
        ...mapActions('category', ['getCategoryList']),
        selectCate(e) {
            this.setSelectedCateID(e)
            // console.log(this.$route)
            if(this.$route.path != '/index'){
                this.$router.push('/index')
            }
            window.scrollTo(0,0)
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