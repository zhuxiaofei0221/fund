import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import { post,get,del,put } from './assets/js/axios'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$delete = del;
Vue.prototype.$put = put;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
