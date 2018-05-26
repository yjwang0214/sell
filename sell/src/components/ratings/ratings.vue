<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="header">
        <div class="total-score">
          <h1 class="score">{{seller.score}}</h1>
          <p class="title">综合评分</p>
          <p class="compare">高于周边商家{{seller.rankRate}}%</p>
        </div>
        <div class="detail-score">
          <div class="detail service-score">
            <span class="text">服务质量</span>
            <span><star :size="36" :score="seller.serviceScore" class="star"></star></span>
            <span class="item-score">{{seller.serviceScore}}</span>
          </div>
          <div class="detail food-score">
            <span class="text">商品质量</span>
            <span><star :size="36" :score="seller.foodScore" class="star"></star></span>
            <span class="item-score">{{seller.foodScore}}</span>
          </div>
          <div class="detail delivery-time">
            <span class="text">送达时间</span>
            <span class="delivery-time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :ratings="ratings" :select-type="selectType" :only-content="onlyContent"
                    v-on:ratingtype-select="ratingtypeSelect"
                    v-on:content-toggle="contentToggle" class="ratingselect border-1px"></ratingselect>
      <div class="ratings-wrapper">
        <ul>
          <li class="rating-item" v-for="rating in ratings"
              v-show="needShow(rating.rateType,rating.text)">
            <div class="head">
              <img :src="rating.avatar" width="28" height="28" class="avatar"/>
              <div class="detail">
                <p class="name">{{rating.username}}</p>
                <span class="star">
                  <star :size="36" :score="rating.score"></star>
                </span>
                <span class="delivery-time" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
            <p class="text">{{rating.text}}</p>
            <div class="rateType">
              <span class="icon-thumb_up" v-show="rating.rateType===0"></span>
              <span class="icon-thumb_down" v-show="rating.rateType===1"></span>
              <ul class="recommend-wrapper">
                <li v-for="item in rating.recommend" class="recommend">{{item}}</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    import split from '../split/split';
    import ratingselect from '../ratingselect/ratingselect';
    import star from '../star/star';
    import BScroll from 'better-scroll';
    import {formatDate} from '../../common/js/date';
    const ALL = 2;

    export default {
      components: {
        star,
        ratingselect,
        split
      },
      name: 'ratings',
      props: {
        seller: {
          type: Object
        }
      },
      data () {
        return {
          ratings: [],
          selectType: ALL,
          onlyContent: false
        };
      },
      created () {
        this.$http.get('api/ratings').then((response) => {
          response = response.body;
          this.ratings = response.data;
          this.$nextTick(() => {
            this._initScroll();
          });
      });
      },
      filters: {
        formatDate (time) {
          let date = new Date(time);
          return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
      },
      methods: {
        needShow (type, text) {
          if (this.onlyContent && !text) {
            return false;
          }
          if (this.selectType === ALL) {
            return true;
          } else {
            return this.selectType === type;
          }
        },
        ratingtypeSelect (type) {
          this.selectType = type;
          this.$nextTick(() => {
            this.scroll.refresh();
          });
        },
        contentToggle (content) {
          this.onlyContent = content;
          this.$nextTick(() => {
            this.scroll.refresh();
          });
        },
        _initScroll () {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.ratings, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
      }
    };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
  .ratings
    position fixed
    top 174px
    left 0
    bottom 0
    width 100%
    overflow hidden
    .header
      display flex
      width 100%
      margin 18px 0
      padding 0 24px
      .total-score
        flex 0 0 136px
        width 136px
        border-right 1px solid rgba(7, 17, 27, 0.1)
        @media only screen and (max-width: 320px) {
          flex: 0 0 120px;
          width: 120px;
        } /*只有屏幕尺寸小于320px时才会应用该样式*/
        .score
          line-height 28px
          margin-bottom 6px
          text-align center
          font-size 24px
          color rgb(255, 153, 0)
        .title
          line-height 12px
          margin-bottom 8px
          text-align center
          font-size 12px
          color rgb(7, 17, 27)
        .compare
          line-height 10px
          margin-bottom 6px
          text-align center
          font-size 10px
          color rgb(147, 153, 159)
      .detail-score
        flex 1
        padding-left 24px
        @media only screen and (max-width: 320px) {
          padding-left: 6px;
        }
        .detail
          margin-bottom 8px
          font-size 0
          &:last-child
            margin-bottom 0
          .text
            display inline-block
            vertical-align top
            line-height 18px
            font-size 12px
            color rgb(7, 17, 27)
          .star
            display inline-block
            vertical-align top
            margin 0 12px
          .item-score
            line-height 18px
            font-size 12px
            color rgb(255, 153, 0)
          .delivery-time
            margin-left 12px
            line-height 18px
            font-size 12px
            color rgb(147, 153, 159)
    .ratingselect
      border-1px(rgba(7, 17, 27, 0.1))
    .ratings-wrapper
      padding 0 18px
      .rating-item
        padding 18px 0
        font-size 0
        .head
          margin-bottom 6px
          position relative
          .avatar
            display inline-block
            margin-right 12px
            width 28px
            height 28px
            border-radius 50%
          .detail
            display inline-block
            font-size 0
            .name
              line-height 12px
              margin-bottom 4px
              font-size 10px
              color rgb(7, 17, 27)
            .star
              display inline-block
              vertical-align top
            .delivery-time
              display inline-block
              line-height 12px
              padding-top 2px
              margin-left 6px
              font-size 10px
              font-weight 200
              color rgb(147, 153, 159)
          .time
            position absolute
            right 0
            top 0
            line-height 12px
            font-size 10px
            font-weight 200
            color rgb(147, 153, 159)

        .text
          margin-left 40px
          margin-bottom 8px
          line-height 18px
          font-size 12px
          color rgb(7, 17, 27)
        .icon-thumb_up, .icon-thumb_down
          display inline-block
          margin-left 40px
          line-height 16px
          font-size 12px
          vertical-align top
        .icon-thumb_up
          color rgb(0, 160, 220)
        .icon-thumb_down
          color rgb(147, 153, 159)
        .recommend-wrapper
          display inline-block
          vertical-align top
          .recommend
            display inline-block
            margin-left 8px
            border 1px solid rgba(7, 17, 27, 0.1)
            border-radius 2px
            line-height 16px
            height 16px
            width 40px
            white-space: nowrap
            overflow hidden
            text-overflow ellipsis
            font-size 9px
            color rgb(147, 153, 159)
            background #fff
</style>
