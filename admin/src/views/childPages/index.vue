<template>
    <div class="statistics">
        <!-- 顶部统计数据 -->
        <div class="statistics-top">
            <div class="item">
                <span>今日访问量</span>
                <span>{{statistics.todayVisits}}</span>
            </div>
            <div class="item">
                <span>用户总量</span>
                <span>{{statistics.allUsers}}</span>
            </div>
            <div class="item">
                <span>文章总量</span>
                <span>{{statistics.allArticles}}</span>
            </div>
            <div class="item">
                <span>评论总量</span>
                <span>{{statistics.allComments}}</span>
            </div>
        </div>
        <!--echarts -->
        <div class="statistics-bottom">
             <!-- echarts折线统计图 当日访问量-->
            <div class="item" style="margin-top:10px">
                <div id="visits" style="width: 100%;height:500px;"></div>
            </div>
            <!-- echarts扇形统计图 文章分类比例 -->
            <div class="item" style="margin-top:10px">
                <div id="category" style="width: 100%;height:500px;"></div>
            </div>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts'
    export default {
        data(){
            return {
                // 顶部统计数据
                statistics:{ 
                    todayVisits:0,//今日访问量
                    allUsers:0,//用户总量
                    allComments:0,//评论总量
                    allArticles:0,//文章总量
                },
                category:[],
                categoryArticles:[]
            }
        },
        created() {
            this.$nextTick(() => {
                this.getStatistics()
            })
        },
        methods: {
            //获取统计数据
            async getStatistics(){
                let res = await this.$http.get('/statistics')
                if(res.data.code == 0){
                    // 设置顶部总数据
                    this.statistics = {
                        todayVisits: 999,//今日访问量
                        allUsers: res.data.data.allUsers,//用户总量
                        allComments:res.data.data.allComments,//评论总量
                        allArticles:res.data.data.allArticle//文章总量
                    }
                    console.log(res.data)
                    res.data.data.category.forEach(item => {
                        this.category.push(item.category)
                        this.categoryArticles.push({value:item.count, name:item.category})
                    })
                    console.log(this.category, this.categoryArticles)
                    // 百度统计图初始化 - 当日访问量
                    this.initVisits()
                    // 百度扇形统计图 文章分类比例
                    this.initCategory()
                }
            },
            // echarts始化 - 当日访问量
            initVisits(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('visits'));
                let option = {
                    //标题
                    title: {
                        text: '当日访问量'
                    },
                    // 提示框
                    tooltip: {
                        trigger: 'axis'
                    },
                     // 图例
                    legend: {
                        data:['访问量','评论量']
                    },
                    // 网格
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    //切换
                    toolbox: {
                        feature: {
                            dataView:{},
                            saveAsImage: {} 
                        }
                    },
                     // 区域缩放控制器
                    dataZoom: [
                        {   // 这个dataZoom组件，默认控制x轴。
                            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                            start: 10,      // 左边在 10% 的位置。
                            end: 60         // 右边在 60% 的位置。
                        },
                        {   // 这个dataZoom组件，也控制x轴。
                            type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
                            start: 10,      // 左边在 10% 的位置。
                            end: 60         // 右边在 60% 的位置。
                        }
                    ],
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['2019-01','2019-02','2019-03','2019-04','2019-05','2019-06','2019-07','2019-08','2019-09','2019-10','2019-11','2019-12','2019-12','2019-12']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name:'访问量',
                            type:'bar',
                            data:[189752, 243564, 300049, 300523, 254667, 204543, 104534, 407634, 340345,143234,600234,656432,5555,555547],
                            itemStyle: {
                                normal: {
                                    color: '#F56C6C',
                                }
                            },
                        },
                        {
                            name:'评论量',
                            type:'bar',
                            data:[18952, 2434, 30049, 3523, 25467, 20453, 10534, 40764, 34045,14324,60034,65632,555,5547],
                            itemStyle: {
                                normal: {
                                    color: '#F5006C',
                                }
                            },
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
            // 百度扇形统计图 文章分类比例
            initCategory(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('category'));
                let option = {
                    title : {
                        text: '文章分类',
                        subtext: `文章总数${this.statistics.allArticles}篇`,
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    //切换
                    toolbox: {
                        feature: {
                            dataView:{},
                            saveAsImage: {} 
                        }
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: this.category
                    },
                    series : [
                        {
                            name: '文章数量',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'], //位置
                            // data:[
                            //     {value:300000, name:'name1'},
                            //     {value:700000, name:'name2'},
                            // ],
                            data:this.categoryArticles,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
        },
    }
</script>

<style lang="less" scoped>
    .statistics{
        .statistics-top{
            display: flex;
            justify-content: space-between;
            width: 100%;
            .item{
                background: #fff;
                border-radius: 5px;
                width: 24.5%;
                padding: 10px 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                box-shadow: 0 0 5px #ccc;
                transition: all 0.4s;
                // cursor: pointer;
                &:hover{
                    transform: translateY(-5px);
                    box-shadow: 0 0 10px #ccc;
                }
                span{
                    font-size: 24px;
                    line-height: 36px;
                    &:first-child{
                        font-size: 18px;
                        font-weight: bold;
                        color: #363636;
                    }
                    &:last-child{          
                        color: #F56C6C;
                    }
                }
            }
        }
        .statistics-bottom{
            margin: 10px 0;
            .item{
                background: #fff;
                border-radius: 5px;
                box-shadow: 0 0 5px #ccc;
                padding: 20px;
                box-sizing: border-box;
            }
        }
    }
</style>
