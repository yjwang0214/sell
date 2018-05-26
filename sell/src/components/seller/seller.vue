<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="header border-1px">
        <h1 class="name">{{seller.name}}</h1>
        <div class="score">
          <span class="star">
          <star :size="36" :score="seller.score"></star>
          </span>
          <span class="total-ratings">(24)</span>
          <span class="total-count">月售{{seller.sellCount}}单</span>
        </div>
        <div class="favorite" @click="toggleFavorite">
          <div class="icon-wrapper">
            <span class="icon-favorite" :class="{'active':favorite}"></span>
          </div>
          <span class="favorite-text">{{favoriteText}}</span>
        </div>
      </div>
      <ul class="overview">
        <li class="block">
          <h2>起送价</h2>
          <div class="content">
            <span class="stress">{{seller.minPrice}}</span>元
          </div>
        </li>
        <li class="block">
          <h2>商家配送</h2>
          <div class="content">
            <span class="stress">{{seller.deliveryPrice}}</span>元
          </div>
        </li>
        <li class="block">
          <h2>平均配送时间</h2>
          <div class="content">
            <span class="stress">{{seller.deliveryTime}}</span>分钟
          </div>
        </li>
      </ul>
      <split></split>
      <div class="notice border-1px">
        <h1 class="title">公告与活动</h1>
        <p class="text">{{seller.bulletin}}</p>
      </div>
      <ul class="supports" v-if="seller.supports">
        <li class="support-item" v-for="item in seller.supports">
          <icon :size="4" :index="item.type" class="icon"></icon><span class="text">
          {{item.description}}</span>
        </li>
      </ul>
      <split></split>
      <div class="photos">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="information">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="information-item" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    import split from '../split/split';
    import Star from '../star/star';
    import icon from '../icon/icon';
    import BScroll from 'better-scroll';
    import {saveToLocal, loadFromLocal} from '../../common/js/store';

    export default {
      components: {
        Star,
        split,
        icon
      },
      data () {
        return {
          favorite: (() => {
            return loadFromLocal(this.seller.id, 'favorite', false);
          })()
        };
      },
      computed: {
        favoriteText () {
          return this.favorite ? '已收藏' : '收藏';
        }
      },
      methods: {
        toggleFavorite (event) {
          if (!event._constructed) {
            return;
          }
          this.favorite = !this.favorite;
          saveToLocal(this.seller.id, 'favorite', this.favorite);
        }
      },
      props: {
        seller: {
          type: Object
        }
      },
      mounted () {
        // 页面整体滚动
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        });

        // 商家图片横向滚动
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs.picList.style.width = width + 'px';
          this.$nextTick(() => {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            });
          });
        }
      },
      name: 'seller'
    };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .seller
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .seller-content
      .header
        position relative
        margin 18px
        font-size 0
        border-1px(rgba(7, 17, 27, 0.1))
        .name
          line-height 14px
          margin-bottom 8px
          font-size 14px
          color rgb(7, 17, 27)
        .score
          line-height 18px
          .star
            display inline-block
            vertical-align top
          .total-ratings, .total-count
            display inline-block
            margin-left 8px
            vertical-align top
            font-size 10px
            color rgb(77, 85, 93)
          .total-count
            margin-left 12px
        .favorite
          position absolute
          text-align center
          width 50px
          right 0
          top 0
          .icon-favorite
            line-height 24px
            margin-bottom 4px
            font-size 24px
            color #d4d6d9
            &.active
             color rgb(240, 20, 20)
          .favorite-text
            line-height 10px
            font-size 10px
            color rgb(77, 85, 93)
      .overview
        display flex
        margin 18px 0
        .block
          flex 1
          text-align center
          border-right 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border-right none
          h2
            margin-bottom 4px
            line-height 10px
            font-size 10px
            color rgb(147, 153, 159)
          .content
            line-height 24px
            font-size 10px
            font-weight 200
            color rgb(7, 17, 27)
            .stress
              font-size 24px
      .notice
        margin 18px 18px 0 18px
        padding-bottom 16px
        border-1px(rgba(7, 17, 27, 0.1))
        .title
          margin-bottom 8px
          line-height 14px
          font-size 14px
          color rgb(7, 17, 27)
        .text
          margin 0 12px 0 12px
          line-height 24px
          font-size 12px
          font-weight 200
          color rgb(240, 20, 20)
      .supports
        margin 0 18px
        .support-item
          padding 16px 12px
          border-bottom 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border-bottom none
          .icon
            vertical-align top
          .text
            margin-left 6px
            vertical-align top
            line-height 16px
            font-size 12px
            font-weight 200
            color rgb(7, 17, 27)
      .information
        margin 18px
        .title
          margin-bottom 12px
          line-height 14px
          font-size 14px
          color rgb(7, 17, 27)
        .information-item
          padding 16px 12px
          border-top 1px solid rgba(7, 17, 27, 0.1)
          line-height 16px
          font-size 12px
          font-weight 200
          color rgb(7, 17, 27)
      .photos
        margin 18px 0 18px 18px
        .title
          margin-bottom 12px
          line-height 14px
          font-size 14px
          color rgb(7, 17, 27)
        .pic-wrapper
          width 100%
          white-space nowrap
          overflow hidden
          font-size 0
          .pic
            display inline-block
            width 120px
            height 90px
            margin-right 6px
            &:last-child
              margin-right 0
</style>
