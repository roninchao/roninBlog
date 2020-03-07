<template>
    <div class="usersInfo-box">
        <!-- 顶部 -->
        <div class="usersInfo-top usersInfo">
            <div class="item">
                <el-input placeholder="请输入用户名" v-model="searchText" maxlength=20 class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
            </div>
            <div class="item">
                <el-button type="primary" @click="openUserDialog(1)">添加用户</el-button>
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
                label="ID">
                </el-table-column>
                <el-table-column
                prop="username"
                label="用户名">
                </el-table-column>
                <el-table-column
                prop="auth"
                label="用户组">
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="200">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="editUser(scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="removeUser(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination usersInfo">
            <el-pagination
            background
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="totalSize"
            :current-page.sync="currentPage"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            >
            </el-pagination>
        </div>
        
        <!-- 弹框 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" @close="closeUserDialog">
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
                <el-button type="primary" @click="addUser()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
    
<script>
export default {
    data() {
        return{
            // 用户列表
            userList: [],
            // 用户信息
            userInfo:{
                username:"",
                password:"",
                auth:""
            },
            // 弹框是否显示
            dialogFormVisible:false,
            //搜索内容
            searchText:'',
            formLabelWidth:'80px',
            // 弹框标题
            dialogTitle:'',
            //表示添加用户
            isAdd:1,
            // 编辑用户ID
            editUserID:'',
            //当前页面
            currentPage:1,
            //页面数据条数
            pageSize:12,
            //用户总数
            totalSize:0
        }
    },
    created(){
        this.getUserList()
    },
    methods:{
        // 开启用户弹框
        openUserDialog(e){
            if(e == 1){
                this.dialogTitle = '添加用户'
                this.isAdd = e
            }else if(e == 2){
                this.dialogTitle = '编辑用户'
                this.isAdd = e
            }
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
            let res = await this.$http.post('/users/getList', {currentPage:this.currentPage, pageSize:this.pageSize})
            if(res.data.code == 0){
                res.data.data.forEach(item => {
                    if(item.auth == 1){
                        item.auth = "超级管理员"
                    }else{
                        item.auth = "普通用户"
                    }
                });
                this.totalSize = res.data.total
                this.userList = res.data.data
            }
        },
        //模糊搜索用户
        async search(){
            if(this.searchText == '') return this.getUserList()
            this.currentPage = 1
            let res = await this.$http.post('/users/search', {search:this.searchText,currentPage:this.currentPage, pageSize:this.pageSize})
            if(res.data.code == 0) {
                res.data.data.forEach(item => {
                    if(item.auth == 1){
                        item.auth = "超级管理员"
                    }else{
                        item.auth = "普通用户"
                    }
                });
                this.totalSize = res.data.total
                this.userList = res.data.data
            }
        },
        handleSizeChange(val){
            console.log('size',val)
        },
        handleCurrentChange(val){
            console.log('currentPage',val)
            this.currentPage = val
            this.getUserList()
        },
        // 确认提交用户
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
            //添加用户
            if(this.isAdd == 1){
                let data = await this.$http.post('/users', this.userInfo)
                this.$message({
                    message:'添加成功',
                    type:'success'
                })
            }else if(this.isAdd == 2){
                //编辑用户
                let res = await this.$http.put(`/users/${this.editUserID}`, this.userInfo)
                this.$message({
                    message:res.data.message,
                    type:'success'
                })
            }
            this.getUserList()
            this.dialogFormVisible = false
        },
        //编辑用户
        async editUser(e){
            this.openUserDialog(2)
            let {_id} = e
            this.editUserID = _id
            let res = await this.$http.get(`/users/${_id}`)
            if(res.data.code == 0) {
                this.userInfo.username = res.data.data.username
                this.userInfo.password = res.data.data.password
                this.userInfo.auth = res.data.data.auth
            }
        },
        //删除用户
        removeUser(e){
            let {_id, username} = e
            this.$confirm(`此操作将永久删除《${username}》 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                let res = this.$http.delete(`/users/${_id}`)
                this.getUserList()
                if(res.data.code == 0){
                    this.$message({
                        message:res.data.message,
                        type:'success'
                    })
                }
            });
        }
    }
}
</script>

<style lang='less' scoped>
    .usersInfo-box{
        height: calc(100% - 20px);
        position: relative;
    }
    .usersInfo{
        border-radius: 5px;
        overflow: hidden;
        box-shadow: 0 0 5px #e2e2e2;
        background: #fff;
    }
    .usersInfo-top{
        display: flex;
        justify-content: space-between;
        padding: 15px;
        margin-bottom: 20px;
    }
    .usersInfo-bottom{   
        display: flex;
        flex-direction: column;
        align-items: center;
        
    }
    .pagination{
         display: flex;
         justify-content: center;
         margin-top:15px;
        .el-pagination{
            padding: 10px 0;
        }
    }
</style>