<template>
  <div>
    <v-header v-bind:seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
       <router-link to="/goods">商品</router-link><!--使用该组件来导航-->
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive><router-view :seller="seller"></router-view></keep-alive><!--改变路由将会刷新此处的内容-->
  </div>
</template>

<script>
  // 注册header组件
  import header from './components/header/header';
  import {urlParse} from './common/js/util';

  export default {
  data () {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
          return queryParam.id;
        })()
      }
    };
  },
  created () {
    this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
      response = response.body;
      this.seller = Object.assign({}, this.seller, response.data);
      // this.seller = response.data;
      // console.log(this.seller);
    }); // 利用vue-resource取得seller数据
  },
  components: {
    'v-header': header
  },
  name: 'App'
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
} */
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
  .active
    color: rgb(240, 20, 20)!important
</style>
