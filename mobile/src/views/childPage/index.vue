<template>
    <div>
        <div class="header" @click="$router.go(-1)"> back</div>
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
    .header{
        width: 100%;
        height: 2.5rem;
        background: skyblue;
    }
   
</style>