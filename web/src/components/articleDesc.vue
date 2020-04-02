<template>
    <div class="article-item">
        <div class="img-box">
            <div class="img" style="backgroundImage:url(https://static.surmon.me/FrkYADJJj0kFwHEkUXl14ZHj5YMS?x-oss-process=style/blog.list.item.pc)"></div>  
        </div>
        <div class="article">
            <div class="article-desc">
                <p class="top">标题</p>
                <p class="bottom">简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简简介简介简介简介简介简介简介简介简介简介简介简介简简介简介简介简介简介简介简介简介简介简介简介简介简简介简介简介简介简介简介简介简介简介简介简介简介简简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介</p>
            </div>
            <div class="article-other">
                <div class="icon">
                    <i class="el-icon-document"></i>
                    <span>111</span>
                </div>
                <div class="icon">
                    <i class="el-icon-view"></i>
                    <span>111</span>
                </div>
                <div class="icon">
                    <i class="el-icon-chat-line-round"></i>
                    <span>11</span>
                </div>  
                <div class="icon">
                    <i class="el-icon-timer"></i>
                    <span>111</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
    .article-item{
        width: 100%;
        height: 150px;
        background: #fff;
        margin-bottom: 15px;
        border-radius: 5px;
        display: flex;
        transition: all 0.3s;
        &:hover{
            background: #ccc;
            .img{
                transform: scale(1.1);
            }
        }
        .img-box{
            width: 170px;
            height: cale(100% - 30px);
            margin: 15px;
            box-sizing: border-box;
            border-radius: 5px;
            overflow: hidden;
            .img{
                width: 100%;
                height: 100%;
                background-color: #f0f0f0;
                background-position:center;
                background-size: cover;
                cursor: pointer;
                transition: all 0.3s;
            }
        }
        .article{
            width: 500px;
            padding: 15px;
            padding-left: 0;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            .article-desc{
                font-size: 14px;
                color: #666;
                .top{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-weight: bold;
                    padding-bottom: 10px;
                    cursor: pointer;
                    &:hover{
                        text-decoration: underline;
                    }
                }
                .bottom{
                    overflow : hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                }
            }
            .article-other{
                display: flex;
                .icon{
                    font-size: 12px;
                    color: #999;
                    padding-right: 15px;
                }
                // justify-content: space-between; 
            }
        }
    }
</style>