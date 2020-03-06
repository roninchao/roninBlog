<template>
    <div class="homeBox">
        <div class="containtBox">
            <!-- 侧边栏 -->
            <div class="leftSidebarBox" :class="isCollapse? 'collapse' : '' ">
                <!-- 顶部 -->
                <div class="leftBox">
                    管理系统
                </div>
                <div class="scrollBox">
                    <sidebar></sidebar>
                </div>
            </div>
            <!-- 显示子页面框 -->
            <div class="routerViewBox" :class="isCollapse? 'collapse' : '' ">
                <!-- 顶部 -->
                <div class="rightBox" :class="isCollapse? 'collapse' : '' ">
                    <i class="font_Size" :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
                        @click="isCollapse = !isCollapse">
                    </i>
                    <el-dropdown trigger="click" @command="handleClick">
                        <el-button type="info" class="buttons">
                            <div class="flex_box_ad">
                                <el-avatar size="large" src="/static/images/avtar.png"></el-avatar>
                                admin
                            </div>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="1" icon="el-icon-edit-outline">
                                修改信息
                            </el-dropdown-item>
                            <el-dropdown-item command="2" icon="el-icon-refresh-left">
                                退出登录
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <!-- 子页面容器 -->
                <div class="childViewBox scrollStyles">
                    <transition name="routerAnimate">
                        <router-view class="child_View"></router-view>
                    </transition>
                </div>
            </div>
        </div>
        <!-- 对话框 -->
        <el-dialog
            :title="dialogData.title"
            :visible.sync="dialogData.dialogVisible"
            width="400px"
            :before-close="handleClose">
            <!-- 内容部分 -->
            <div>
                <el-form ref="form" label-width="80px">
                    <el-form-item label="用户名">
                        <el-input v-model="dialogData.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="dialogData.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="dialogData.userName"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 底部按钮 -->
            <span slot="footer" class="dialog-footer">
                <el-button icon="el-icon-back" :disabled="dialogData.loading" @click="dialogData.dialogVisible = false">
                    取 消
                </el-button>
                <el-button type="primary"
                :loading="dialogData.loading"
                icon="el-icon-check"
                @click="confirmEvent">
                    确 定
                </el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                dialogData:{   // 对话框内所有数据
                    title:'修改信息',// 对话框标题
                    dialogVisible:false, // 对话框开关
                    loading:false, //对话框 确认按钮动画
                    userName:null,// 用户名
                },
                isCollapse:false
            }
        },
        computed:{
            // collapse(){
            //     return this.$store.state.collapse
            // }
        },
        created() {

        },
        methods: {
            // 对话框确认事件
            confirmEvent(){
                // 模拟接口
                this.dialogData.loading = true; // 开启动画
                setTimeout(()=>{
                    this.$message({
                        type:'success',
                        message:'操作成功!'
                    });
                    this.dialogData.loading = false; // 关闭动画
                    this.dialogData.dialogVisible = false; // 关闭对话框
                },3000)
            },
            // 顶部用户头像-名字点击
            handleClick(data){
                if(data == 2){
                    // 退出登录
                    this.$Cookie.remove('userId') // 清除userId
                    this.$Cookie.remove('token') // 清除token
                    this.$Cookie.remove('sidebarRouter') // 清除菜单权限验证
                    this.$Cookie.remove('defaultActive') // 清除默认激活侧边栏
                    this.$message({
                        type:'success',
                        message:'已退出登录！'
                    });
                    // 跳转登录页
                    this.$router.push('/login')
                }else{
                    // 修改信息
                    this.dialogData.dialogVisible = true; // 开启对话框
                }
            },
            // 弹框关闭前的回调
            handleClose(done){
                // 加载中不允许关闭
                if(!this.dialogData.loading){
                    done();
                }
            },
        },
    }
</script>

<style lang="less" scoped>
    @topBack:#303133; // 顶部条背景色
    @topHeight:60px; // 顶部条高度
    @textColoe:#fff; // 顶部条文字颜色
    .homeBox{
        width:100%;
        min-width: 1300px;
        height:100vh;
        min-height: 500px;
        background:#e2e2e2;
        .containtBox{
            height:100%;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            box-sizing: border-box;
            .leftSidebarBox{
                background:rgb(84, 92, 100);
                width:230px;
                height:100%;
                transition: all linear .15s;
                .scrollBox{
                    height:calc(100% - @topHeight);
                    overflow-y: auto;
                    &::-webkit-scrollbar {
                        display: none;
                    }
                }
                &.collapse{
                    width:64px;
                }
                .leftBox{
                    background:@topBack;
                    height:@topHeight;
                    color:@textColoe;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-size:18px;
                    font-weight: 600;
                    line-height:@topHeight;
                    padding: 0 24px;
                }
            }
            .routerViewBox{
                height:100%;
                width:calc(100% - 230px);
                position: relative;
                background:#e2e2e2;
                transition: all linear .15s;
                .childViewBox{
                    height:calc(100% - @topHeight);
                    overflow-x: hidden;
                    overflow-y: scroll;
                    padding:10px;
                    position: relative;
                    box-sizing: border-box;
                    .routerAnimate-enter{
                        opacity: 0;
                        transform: translate(100%, 0);
                    }
                    .routerAnimate-leave-to{
                        opacity: 0;
                        transform: translate(-100%, 0);
                    }
                    .routerAnimate-leave-active {
                        opacity: 0;
                        transform: translate(100%, 0);
                    }
                    .routerAnimate-enter{
                        opacity: 0;
                        transform: translate(-100%, 0);
                    }
                    .child_View{
                        width:calc(100% - 20px);
                        position: absolute;
                        transition: all .3s cubic-bezier(.55,0,.1,1);
                    }
                }
                &.collapse{
                    width:calc(100% - 64px);
                }
                .rightBox{
                    background:@topBack;
                    height:@topHeight;
                    color:@textColoe;
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: space-between;
                    align-items: center;
                    padding:0 0 0 10px;
                    .font_Size{
                        font-size:26px;
                        cursor: pointer;
                    }
                    .buttons{
                        background:#555;
                        border:0;
                        height:60px;
                        border-radius: 0;
                        padding:0 30px;
                        & .flex_box_ad{
                            display: flex;
                            flex-flow: row nowrap;
                            align-items: center;
                            font-size:17px;
                            font-weight: 550;
                            span{
                                margin-right:10px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
