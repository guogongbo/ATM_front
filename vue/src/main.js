import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element'
import './plugins/axios'
import './styles/styles'
import { login } from './api/common'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import getBankcardinfo from 'bankcardinfo'
Vue.prototype.$getBankcardinfo = getBankcardinfo



Vue.config.productionTip = false
Vue.use(ElementUI);


// 路由拦截器-登录拦截器
router.beforeEach((to, from, next) => {
  var flag = to.matched.some(function (res) {
    return res.meta.needlogin;
  });

  if (!flag || sessionStorage.getItem("user") != null) {
    next();
    return;
  } else {
    next({ path: '/WaitView' });
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


