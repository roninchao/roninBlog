import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:"hash",
  routes: [
    // {   //登录
    //   path:'/login',
    //   name:'login',
    //   component:() => import('@/views/otherPages/login'),
    // },
    // {   //注册
    //     path:'/register',
    //     name:'register',
    //     component:() => import('@/views/otherPages/register'),
    // },
    {
      path:'/',
      redirect:{
        path:'tabBar'
      }
    },
    {   
        path:'/tabBar',
        name:'tabBar',
        component:() => import('@/views/tabBarPage/index'),
        children:[]
    },
  ]
})
