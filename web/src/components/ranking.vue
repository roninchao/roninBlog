<template>
    <div class="ranking">
        <div class="title">{{rankingName}}</div>
        <div class="content">
            <div class="item" v-for="(v,k) in ranking" :key="k">
                <div>{{k+1}}</div>
                <div @click="go(v._id)">{{v.title}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        rankingName:'',
        ranking:''
    },
    methods:{
        go(e){
            this.$router.push({path:'/detail', query:{id:e}})
        }
    }
}
</script>

<style lang="less" scoped>
    .ranking{
        background: #fff;
        border-radius: 5px;
        padding: 15px;
        margin-bottom: 15px;
        box-sizing: border-box;
        .title{
            font-size: 14px;
            font-weight: bold;
            color: #333;
        }
        .item{
            width: 100%;
            font-size: 14px;
            color: #666;
            display: flex;
            align-items: center;
            padding-top: 10px;
            &:nth-child(-n+3){
                div:first-child{
                    background: #ff6600;
                    opacity: 0.6;
                    color: #fff;
                }
            }
            div:first-child{
                // display: inline-block;
                width: 20px;
                height: 20px;
                font-size: 12px;
                margin-right: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #f0f0f0;
                border-radius: 3px;
                cursor: default;
            }
            div:last-child{
                width: 190px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                cursor: pointer;
                &:hover{
                    text-decoration: underline;
                }
            }
        }
    }
</style>