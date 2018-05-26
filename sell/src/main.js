// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';
import './common/stylus/index.styl';
// import router from './router';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
  {
    path: '/',
    redirect: 'goods'
  },
  { path: '/goods',
    component: goods
  },
  {
    path: '/ratings',
    component: ratings
  },
  {
    path: '/seller',
    component: seller
  }
];// 定义路由，每个路由映射一个组件
const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
});// 创建router实例
/* eslint-disable no-unused-vars */
const app = new Vue({
  el: '#app',
  router,
  // App,
  components: { App },
  template: '<App/>'
});// 创建和挂载根实例
