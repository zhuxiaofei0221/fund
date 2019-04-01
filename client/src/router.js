import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import NotFound from './views/404.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import Info from './views/Info.vue'
import Fund from './views/Fund.vue'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '*', name: 'notFound', component: NotFound },
    { path: '/',redirect: 'index',},
    { path: '/index',name: 'index',component: Index,children: [
      { path: '', component: Home },
      { path: '/home', name:'home', component: Home },
      { path: '/info',name: 'info',component: Info },
      { path: '/fund',name: 'fund',component: Fund }
    ]},
    { path: '/register',name: 'register',component: Register },
    { path: '/login',name: 'login',component: Login },
  ]
});

//全局路由守卫
router.beforeEach((to,from,next) => {
  const isLogin = localStorage.access_token ? true : false;
  if(to.path == '/login' || to.path == '/register'){
    next();
  }else{
    isLogin ? next() : next('/login');
  };
});

export default router;
