<template>
  <div class="goods-wrapper">
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item, index) in goods" class="menu-item" :class="{'current':
currentIndex === index}" @click="selectMenu(index, $event)">
            <span class="text border-1px">
              <icon :size="3" :index="item.type" v-show="item.type>0"></icon>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="item in goods" class="food-list food-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="(food,index) in item.foods" @click="selectFood(food,$event)"
                  v-bind:key="index" class="food-item border-1px">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon"/>
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food" v-on:cart-add="cartAdd"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart ref="shopcart" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"
      :select-foods="selectFoods"></shopcart>
    </div>
    <food :food="selectedFood" ref="food" v-on:cart-add="cartAdd"></food>
  </div>
</template>

<script type="text/ecmascript-6">
  import icon from '../../components/icon/icon';
  import shopcart from '../../components/shopcart/shopcart';
  import cartcontrol from '../../components/cartcontrol/cartcontrol';
  import food from '../../components/food/food';
  import BScroll from 'better-scroll';
    export default {
      name: 'goods',
      props: {
        seller: {
          type: Object
        }
      },
      data () {
        return {
          goods: [],
          listHeight: [],
          scrollY: 0,
          selectedFood: {}
        };
      },
      computed: {
        currentIndex () {
          for (let i = 0; i < this.listHeight.length; i++) {
            let height1 = this.listHeight[i];
            let height2 = this.listHeight[i + 1];
            if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
              return i;
            }
          }
          return 0;
        }, // 确定现在的高度应该对应左边哪个菜单
        selectFoods () {
          let foods = [];
          this.goods.forEach((good) => {
            good.foods.forEach((food) => {
              if (food.count) {
                foods.push(food);
              }
            });
          });
          return foods;
        }
      },
      created () {
        this.$http.get('/api/goods').then((response) => {
          response = response.body;
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        });
      },
      methods: {
        selectMenu (index, event) {
          if (!event._constructed) {
            return;
          }
          let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
          let el = foodList[index];
          this.foodScroll.scrollToElement(el, 300);
        }, // 实现点击左侧menu，右侧滚动到相应位置
        _initScroll () {
          this.menuScroll = new BScroll(this.$refs.menuWrapper, {
            click: true
          });
          this.foodScroll = new BScroll(this.$refs.foodsWrapper, {
            click: true,
            probeType: 3 // 实时监听滚动的位置
          });
          this.foodScroll.on('scroll', (pos) => {
            this.scrollY = Math.abs(Math.round(pos.y));
          }); // 获得滚动的位置的y坐标
        },
        _calculateHeight () {
          let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
          let height = 0;
          this.listHeight.push(height);
          for (let i = 0; i < foodList.length; i++) {
            let item = foodList[i];
            height += item.clientHeight;
            this.listHeight.push(height);
          }
        }, // 实现右侧滚动对应左侧menu高亮,计算买个区块对应的高度
        cartAdd (el) {
          // 体验优化，异步执行小球下落动画
          this.$nextTick(() => {
            this.$refs['shopcart'].drop(el);
          }); // 调用子组件的方法
        },
        selectFood (food, event) {
          if (!event._constructed) {
            return;
          }
          this.selectedFood = food;
          this.$refs.food.show();
        }
      },
      components: {
        icon,
        shopcart,
        cartcontrol,
        food
      }
    };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px /* 如果存在剩余空间也不放大，该项目不放大，项目占据的主轴空间为80px */
      width 80px
      background #f3f5f7
      .menu-item
        display table
        width 56px
        height 54px
        padding 0 12px
        line-height 14px
        &.current
          position relative
          z-index 10
          margin-top -1px
          font-weight 700
          background #fff
          .text
            border-none()
        .text
          display table-cell
          width 56px
          vertical-align middle
          font-size 12px
          border-1px(rgba(7, 17, 27, 0.1))
    .foods-wrapper
      flex 1 /* 等分剩余空间 */
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147, 153, 159)
        background #f3f5f7
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom 0
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            font-size 14px
            color rgb(7, 17, 27)
          .desc, .extra
            line-height 10px
            font-size 10px
            color rgb(147, 153, 159)
          .desc
            margin-bottom 8px
            line-height 12px
          .extra
            .count
              margin-right 12px
          .price
            font-weight 700
            line-height 24px
            .now
              margin-right 8px
              font-size 14px
              color rgb(255, 20, 20)
            .old
              text-decoration line-through
              font-size 10px
              color rgb(147, 153, 159)
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 12px
</style>
