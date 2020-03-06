<template>
    <div class="usersInfo-box">
        <!-- 顶部 -->
        <div class="usersInfo-top usersInfo">
            <div class="item">
                <el-input placeholder="请输入用户名" v-model="search" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <div class="item">
                <el-button type="primary" @click="openUserDialog">添加用户</el-button>
                <el-button type="danger">删除用户</el-button>
            </div>
        </div>
        <!-- 主体内容 -->
        <div class="usersInfo-bottom usersInfo">
            <el-table
            :data="userList"
            stripe
            style="width: 100%">
                <el-table-column
                prop="_id"
                label="ID"
                width="300">
                </el-table-column>
                <el-table-column
                prop="username"
                label="用户名"
                width="300">
                </el-table-column>
                <el-table-column
                prop="auth"
                label="用户组">
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="300">
                    <template slot-scope="scope">
                        <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
                        <el-button type="primary" size="small">编辑</el-button>
                        <el-button type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 弹框 -->
        <el-dialog title="添加用户" :visible.sync="dialogFormVisible" @close="closeUserDialog">
            <el-form :model="userInfo">
                <el-form-item label="用户名" :label-width="formLabelWidth" >
                    <el-input v-model="userInfo.username" 
                    autocomplete="off" 
                    maxlength=20
                    placeholder="请输入用户名">
                    </el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="userInfo.password" 
                    autocomplete="off"
                    maxlength=20
                    placeholder="请输入密码" 
                    show-password>
                    </el-input>
                </el-form-item>
                <el-form-item label="用户组" :label-width="formLabelWidth">
                    <el-select v-model="userInfo.auth" placeholder="请选择用户组">
                        <el-option label="超级管理员" :value="1"></el-option>
                        <el-option label="普通用户" :value="0"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
    
<script>
export default {
    data() {
        return{
            userList: [],
            userInfo:{
                username:"",
                password:"",
                auth:""
            },
            dialogFormVisible:false,
            search:'',
            formLabelWidth:'80px'
        }
    },
    created(){
        this.getUserList()
    },
    methods:{
        // 开启用户弹框
        openUserDialog(){
            this.dialogFormVisible = true
        },
        //关闭用户弹框
        closeUserDialog(){
            this.userInfo.username = ""
            this.userInfo.password = ""
            this.userInfo.auth = ""
        },
        // 获取用户列表
        async getUserList(){
            let data = await this.$http.get('/users')
            data.data.data.forEach(item => {
                if(item.auth == 1){
                    item.auth = "超级管理员"
                }else{
                    item.auth = "普通用户"
                }
            });
            this.userList = data.data.data
        },
        // 添加用户
        async addUser(){
            if(this.userInfo.username == '') return this.$message({
                message:'请输入用户名',
                type:'warning'
            })
            if(this.userInfo.password == '') return this.$message({
                message:'请输入密码',
                type:'warning'
            })
            let reg = /^[A-Za-z0-9]{6,20}$/
            if(!reg.test(this.userInfo.password)) return this.$message({
                message:'密码为6~20位数字字母下划线',
                type:'warning'
            })
            if(this.userInfo.auth === '') return this.$message({
                message:'请选择用户组',
                type:'warning'
            })
            console.log(this.userInfo)
            let data = await this.$http.post('/users', this.userInfo)
            this.$message({
                message:'添加成功',
                type:'success'
            })
        }
    }
}
</script>

<style lang='less' scoped>
    .usersInfo{
        border-radius: 5px;
        overflow: hidden;
        box-shadow: 0 0 5px #e2e2e2;
    }
    .usersInfo-top{
        display: flex;
        background: #fff;
        justify-content: space-between;
        padding: 15px;
        margin-bottom: 10px;
    }
</style>