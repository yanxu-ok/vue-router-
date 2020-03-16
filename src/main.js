import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  name:'root',
  router,
  render: h => h(App)
}).$mount('#app')


//我们需要实例化路由  router
//vue注册好后  要使用router-view组件 显示内容  所以要使用 vue.use(vuerouter)