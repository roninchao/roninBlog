<template>
    <div class="article-box">
        <!-- 顶部 -->
        <div class="article-top article">
            <div class="item">
                <el-input placeholder="请输入文章标题" v-model="searchText" maxlength=20 class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
            </div>
            <div class="item">
                <el-button type="primary" @click="openArticleDialog(1)">添加文章</el-button>
                <el-button type="danger">删除文章</el-button>
            </div>
        </div>
        <!-- 主体内容 -->
        <div class="article-bottom article">
            <el-table
            :data="articleList"
            stripe
            style="width: 100%">
                <el-table-column
                prop="_id"
                label="ID">
                </el-table-column>
                <el-table-column
                prop="title"
                label="文章标题">
                </el-table-column>
                <el-table-column
                prop="category"
                label="文章分类">
                </el-table-column>
                <el-table-column
                prop="time"
                label="编辑时间">
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="200">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="editArticle(scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="removeArticle(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination article">
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
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" @close="closeArticleDialog">
            <el-form :model="article">
                <el-form-item label="文章标题" :label-width="formLabelWidth" >
                    <el-input v-model="article.title" 
                    autocomplete="off" 
                    maxlength=20
                    placeholder="请输入文章标题">
                    </el-input>
                </el-form-item>
                <el-form-item label="文章分类" :label-width="formLabelWidth">
                    <el-select v-model="article.category" placeholder="请选择文章分类">
                        <div v-for="(v, k) in categoryList" :key='k'>
                            <el-option :label="v.category" :value="v._id" ></el-option>
                        </div>
                    </el-select>
                </el-form-item>
                <el-form-item label="内容" :label-width="formLabelWidth">
                    <vue-editor v-model="article.content" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addArticle()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
    
<script>
import { VueEditor } from "vue2-editor";
export default {
    data() {
        return{
            // 文章列表
            articleList: [],
            // 文章信息
            article:{
                title:"",
                content:"",
                category:""
            },
            // 弹框是否显示
            dialogFormVisible:false,
            //搜索内容
            searchText:'',
            formLabelWidth:'80px',
            // 弹框标题
            dialogTitle:'',
            //表示添加文章
            isAdd:1,
            // 编辑用户ID
            editArticleID:'',
            //当前页面
            currentPage:1,
            //页面数据条数
            pageSize:12,
            //文章总数
            totalSize:0,
            //文章分类
            categoryList:[]
        }
    },
    components: {
        VueEditor
    },
    created(){
        this.getArticleList()
    },
    methods:{
        // 开启用户弹框
        openArticleDialog(e){
            if(e == 1){
                this.dialogTitle = '添加文章'
                this.isAdd = e
            }else if(e == 2){
                this.dialogTitle = '编辑文章'
                this.isAdd = e
            }
            this.getCategory()
            this.dialogFormVisible = true
        },
        //关闭用户弹框
        closeArticleDialog(){
            this.article.title = ""
            this.article.content = ""
            this.article.category = ""
        },
        // 获取用户列表
        async getArticleList(){
            let res = await this.$http.post('/article/getList', {currentPage:this.currentPage, pageSize:this.pageSize})
            if(res.data.code == 0){
                let data = [];
                data = JSON.parse(JSON.stringify(res.data.data))
                data.forEach(item => {
                    item.category = item.category.category
                    item.time = this.$func.getTime(parseInt(item.time))
                });
                this.totalSize = res.data.total
                this.articleList = data
            }
        },
        //模糊搜索文章
        async search(){
            if(this.searchText == '') return this.getArticleList()
            this.currentPage = 1
            let res = await this.$http.post('/article/search', {search:this.searchText,currentPage:this.currentPage, pageSize:this.pageSize})
            if(res.data.code == 0) {
                let data = [];
                data = JSON.parse(JSON.stringify(res.data.data))
                data.forEach(item => {
                    item.category = item.category.category
                    item.time = this.getTime(parseInt(item.time))
                });
                this.totalSize = res.data.total
                this.articleList = data
            }
        },
        //获取文章分类
        async getCategory(){
            let res = await this.$http.get('/category')
            if(res.data.code == 0){
                this.categoryList = res.data.data
            }
        },
        handleSizeChange(val){
            console.log('size',val)
        },
        handleCurrentChange(val){
            console.log('currentPage',val)
            this.currentPage = val
            this.getArticleList()
        },
        // 确认提交文章
        async addArticle(){
            if(this.article.title == '') return this.$message({
                message:'请输入文章标题',
                type:'warning'
            })
            if(this.article.category == '') return this.$message({
                message:'请选择文章分类',
                type:'warning'
            })
             if(this.article.content == '') return this.$message({
                message:'请输入文章内容',
                type:'warning'
            })
            //添加文章
            if(this.isAdd == 1){
                let res = await this.$http.post('/article', this.article)
                this.$message({
                    message:res.data.message,
                    type:'success'
                })
            }else if(this.isAdd == 2){
                //编辑文章
                let res = await this.$http.put(`/article/${this.editArticleID}`, this.article)
                this.$message({
                    message:res.data.message,
                    type:'success'
                })
            }
            this.getArticleList()
            this.dialogFormVisible = false
        },
        //编辑文章
        async editArticle(e){
            this.openArticleDialog(2)
            let {_id} = e
            this.editArticleID = _id
            let res = await this.$http.get(`/article/${_id}`)
            if(res.data.code == 0) {
                this.article.title = res.data.data.title
                this.article.category = res.data.data.category
                this.article.content = res.data.data.content
            }
        },
        //删除文章
        async removeArticle(e){
            let {_id, title} = e
            await this.$confirm(`此操作将永久删除《${title}》 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            let res =  await this.$http.delete(`/article/${_id}`)
            if(res.data.code == 0){
                this.getArticleList()
                this.$message({
                    message:res.data.message,
                    type:'success'
                })
            }
        },
        // 富文本上传图片
        async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
            var formData = new FormData();
            formData.append("file", file);
            let res = await this.$http.post('/uploadImage', formData)
            console.log("sdfsafgas",res.data.url)
            Editor.insertEmbed(cursorLocation, "image", res.data.url);
            resetUploader();
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