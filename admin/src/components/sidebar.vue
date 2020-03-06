<template>
  <div class="sidebar">
      <el-menu router :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-menu"></i>用户管理</template>
           <el-menu-item-group>
            <!-- <template slot="title">用户管理</template> -->
            <!-- <el-menu-item index="/admin/addUsers">新增用户</el-menu-item> -->
            <el-menu-item index="/admin/usersManage">用户管理</el-menu-item>
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