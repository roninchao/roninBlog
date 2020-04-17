<template>
    <div class="header">
        <div class="left item">
            <slot name="left">
                <!-- <van-icon name="arrow-left" /> -->
            </slot>
        </div>
        <div class="middle item">
            {{title}}
        </div>
        <div class="right item">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            title:''
        }
    },
    created(){
        console.log(this.$route.meta)
    },
    watch:{
        $route:{
            handler(to, from){
                if(this.$route.meta.name){
                    this.title = this.$route.meta.name;
                }else{
                    this.title = '请设置路由meta.name'
                }
            },
            immediate:true,
        }
    }
}
</script>

<style lang="less" scoped>
    .header{
        height: 1.2rem;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 9;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.6rem;
        color: #666;
        background: #fff;
        box-shadow: 0 0 0.1rem #ccc;
        .left,.right{
            width: 1.5rem;
            height: 100%;
        }
        .middle{
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 0.5rem;
        }
        .item{
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>