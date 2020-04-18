<template>
    <div>
        <md-header>
            <div slot="left" class="btn" @click="$router.go(-1)">
                <van-icon name="arrow-left" />
            </div>
        </md-header>
        <router-view class="router-view"></router-view>
    </div>
</template>

<script>
export default {
    data(){
        return{}
    },
    
}
</script>

<style  lang='less' scpoed>
    .router-view{
        padding-top: 1.2rem;
    }
    .btn{
        display: flex;
        align-items: center;
    }
</style>