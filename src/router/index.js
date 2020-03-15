import Vue from 'vue';
import VueRouter from './vue-router';
//VueRouter 是一个类
import routes from './router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash', //hash  #/
  routes
})
export default router