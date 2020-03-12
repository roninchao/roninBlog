<template>
    <div class="header">
        <div class="item">roninBlog</div>
        <div class="item">login</div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
    @headerHeight:70px;
    .header{
        height: @headerHeight;
        width: 1200px;
        position: fixed;
        top: 0;
        display: flex;
        background: #fff;
        justify-content: space-between;
        box-shadow: 0 0 5px #ccc;
        z-index: 3;
        .item{
            
        }
    }
</style>