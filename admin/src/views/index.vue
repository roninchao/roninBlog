<template>
    <div class="homeBox">
        <div class="containtBox">
            <!-- 侧边栏 -->
            <div class="leftSidebarBox" :class="isCollapse? 'collapse' : '' ">
                <!-- 顶部 -->
                <div class="leftBox">
                    roninBlog后台管理
                </div>
                <div class="scrollBox">
                    <md-sidebar></md-sidebar>
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
                                <el-avatar size="large" src="@/static/images/avtar.png"></el-avatar>
                                {{$cookie.get('mUsername') ? $cookie.get('mUsername') : ''}}
                            </div>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <!-- <el-dropdown-item command="0" icon="el-icon-edit-outline">
                                修改信息
                            </el-dropdown-item> -->
                            <el-dropdown-item command="1" icon="el-icon-refresh-left">
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
    </div>
</template>

<script>
    export default {
        data(){
            return {
                isCollapse:false,
                username:''
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
            // 顶部用户头像-名字点击
            handleClick(data){
                if(data == 1){
                    // 退出登录
                    this.$cookie.remove('mUserID')
                    this.$cookie.remove('mToken')
                    this.$cookie.remove('mUsername')
                    this.$message({
                        type:'success',
                        message:'已退出登录！'
                    });
                    // 跳转登录页
                    this.$router.push('/loginAdmin')
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
        // min-width: 1200px;
        height:100vh;
        min-height: 500px;
        background:#fff;
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
                background:#f0f0f0;
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
