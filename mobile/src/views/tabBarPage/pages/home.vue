<template>
    <div class="home">
        <md-swiper></md-swiper>
        <md-ranking rankingName="热评榜" rankingIcon="fire-o" :rankingList="hotRanking"></md-ranking>
        <md-ranking rankingName="新增榜" rankingIcon="flower-o" :rankingList="newRanking"></md-ranking>
    </div>
</template>

<script>
import { mapState, mapActions} from 'vuex'
export default {
    data() {
        return {}
    },
    created(){
        this.getHotRanking()
        this.getNewRanking()
    },
    computed:{
        ...mapState('article', ['hotRanking', 'newRanking'])
    },
    methods: {
        ...mapActions('article', ['getHotRanking', 'getNewRanking'])
    },
}
</script>

<style lang="less" scoped>
    .home{
        width: 100%;
        padding: 1.2rem 0 1.5rem;
    }
</style>