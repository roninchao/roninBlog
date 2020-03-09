<template>
    <div class="sidebar">
        <el-menu router :default-openeds="['1', '3']">
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-menu"></i>首页</template>
                <el-menu-item-group>
                    <el-menu-item index="/admin/index">首页</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>用户管理</template>
                <el-menu-item-group>
                    <el-menu-item index="/admin/usersManage">用户</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-menu"></i>文章管理</template>
                <el-menu-item-group>
                    <el-menu-item index="/admin/category">分类</el-menu-item>
                    <el-menu-item index="/admin/article">文章</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>

</style>