import Vue from 'vue'

// 通过时间戳获取正常的时间显示
function getTime(data,type){
    var _data = data;
    //如果是13位正常，如果是10位则需要转化为毫秒
    if (String(data).length == 13) {
        _data = data
    } else {
        _data = data*1000
    }
        const time = new Date(_data);    
        const Y = time.getFullYear();
        const Mon = time.getMonth() + 1;
        const Day = time.getDate();
        const H = time.getHours();
        const Min = time.getMinutes();
        const S = time.getSeconds();
    //自定义选择想要返回的类型
    if(type=="Y"){
        return `${Y}-${Mon}-${Day}`
    }else if(type=="H"){
        return `${H}:${Min}:${S}`
    }else{
        return `${Y}-${Mon}-${Day} ${H}:${Min}:${S}`
    }
}
function getTime2(time) {
    let timestr = Vue.prototype.$moment(time).startOf('day').fromNow()
    let unixtime = Vue.prototype.$moment().unix()*1000
    let odate = new Date(new Date().setHours(0, 0, 0, 0)).getTime() // 当天0点
    // 大于5分钟
    if(unixtime - time >= (5*60*1000) ) {
        // 大于今天的0点，即为今天的时间
        if(time >= odate) {
            timestr = Vue.prototype.$moment(time).format('A') + Vue.prototype.$moment(time).format('H:mm') 
        }else { 
            timestr = Vue.prototype.$moment(time).format('MMMM Do YYYY, h:mm:ss a')
        }
    }else {
        timestr = '刚刚';
    }
    return timestr
}
export default {
    getTime,
    getTime2
}