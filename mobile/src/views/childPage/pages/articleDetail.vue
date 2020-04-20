<template>
    <div class="article-detail">
        <md-articleDetail :article="article"></md-articleDetail>
        <md-comments class="comments-wrap"></md-comments>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
    data(){
        return{
        }
    },
    created(){
        if(this.$route.query.id){
            this.getArticle({id:this.$route.query.id})
        }
    },
    computed:{
        ...mapState('article', ['article'])
    },
    methods:{
        ...mapActions('article', ['getArticle'])
    }
}
</script>

<style lang="less" scoped>
    .article-detail{
        .comments-wrap{
            margin-top: 0.5rem;
        }
    }
</style>