<template>
    <div class="article-box">
        <!-- 顶部 -->
        <div class="article-top article">
            <div class="item">
            </div>
            <div class="item">
                <el-button type="primary" @click="openCategoryDialog(1)">添加分类</el-button>
                <el-button type="danger">删除分类</el-button>
            </div>
        </div>
        <!-- 主体内容 -->
        <div class="article-bottom article">
            <el-table
            :data="categoryList"
            stripe
            style="width: 100%">
                <el-table-column
                prop="_id"
                label="ID">
                </el-table-column>
                <el-table-column
                prop="category"
                label="文章分类">
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="200">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="editCategory(scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="removeCategory(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>  
        <!-- 弹框 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" @close="closeCategoryDialog">
            <el-form :model="category">
                <el-form-item label="文章分类" :label-width="formLabelWidth" >
                    <el-input v-model="category.category" 
                    autocomplete="off" 
                    maxlength=20
                    placeholder="请输入分类名称">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCategory()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
    
<script>
export default {
    data() {
        return{
            // 分类列表
            categoryList: [],
            // 分类信息
            category:{
                category:"",
            },
            // 弹框是否显示
            dialogFormVisible:false,
            formLabelWidth:'80px',
            // 弹框标题
            dialogTitle:'',
            //表示添加分类
            isAdd:1,
            // 编辑分类ID
            editCategoryID:'',
        }
    },
    created(){
        this.getCategoryList()
    },
    methods:{
        // 开启弹框
        openCategoryDialog(e){
            if(e == 1){
                this.dialogTitle = '添加分类'
                this.isAdd = e
            }else if(e == 2){
                this.dialogTitle = '编辑分类'
                this.isAdd = e
            }
            this.dialogFormVisible = true
        },
        //关闭弹框
        closeCategoryDialog(){
            this.category.category = ""
        },
        // 获取分类列表
        async getCategoryList(){
            let res = await this.$http.get('/category')
            if(res.data.code == 0){
                this.categoryList = res.data.data
            }
        },
        // 确认提交分类
        async addCategory(){
            if(this.category.category == '') return this.$message({
                message:'请输入分类名称',
                type:'warning'
            })
            //添加分类
            if(this.isAdd == 1){
                let res = await this.$http.post('/category', this.category)
                this.$message({
                    message:res.data.message,
                    type:'success'
                })
            }else if(this.isAdd == 2){
                //编辑分类
                let res = await this.$http.put('/category', {id:this.editCategoryID, category:this.category.category})
                this.$message({
                    message:res.data.message,
                    type:'success'
                })
            }
            this.getCategoryList()
            this.dialogFormVisible = false
        },
        //获取编辑分类信息
        async editCategory(e){
            this.openCategoryDialog(2)
            let {_id} = e
            this.editCategoryID = _id
            let res = await this.$http.get(`/category/${_id}`)
            if(res.data.code == 0) {
                 this.category = res.data.data
            }
        },
        //删除用户
        async removeCategory(e){
            let {_id, category} = e
            await this.$confirm(`此操作将永久删除《${category}》 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            let res = await this.$http.delete(`/category/${_id}`)
            if(res.data.code == 0){
                this.getCategoryList()
                this.$message({
                    message:res.data.message,
                    type:'success'
                })
            }
        }
    }
}
</script>

<style lang='less' scoped>
    .article-box{
        height: calc(100% - 20px);
        position: relative;
    }
    .article{
        border-radius: 5px;
        overflow: hidden;
        box-shadow: 0 0 5px #e2e2e2;
        background: #fff;
    }
    .article-top{
        display: flex;
        justify-content: space-between;
        padding: 15px;
        margin-bottom: 20px;
    }
    .article-bottom{   
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