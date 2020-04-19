<template>
    <div class="ranking">
        <div class="title">
            <van-icon :name="rankingIcon" />
            <span>{{rankingName}}</span>
        </div>
        <div class="ranking-list">
            <div class="item" v-for="(v,k) in 10" :key="k" @click="$router.push('/childPage/articleDetail')">
                <md-articleDesc></md-articleDesc>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        rankingName:"",
        rankingIcon:"",
        rankingList:[]
    }
}
</script>

<style lang="less" scoped>
    .ranking{
        .title{
            font-size: 0.5rem;
            color: #ff6600;
            background: #fff;
            padding: 0.3rem;
            display: flex;
            align-items: center;
            span{
                padding-left: 0.2rem;
                font-size: 0.373rem;
                color: #333;
                font-weight: bold;
            }
        }
        .ranking-list{
            margin: 0.3rem 0;
            width: 100%;
        }
    }
</style>