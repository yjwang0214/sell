<template>
    <span class="icon" :class="iconType"></span>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'icon',
    props: {
      size: {
        type: Number
      },
      index: {
        type: Number
      }
    },
    computed: {
      iconType () {
        return this.classMap[this.index] + '_' + this.size;
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice',
        'guarantee'];
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .icon
    display: inline-block
    vertical-align: top
    background-repeat: no-repeat
    &.decrease_1 /* &表示当前选择对象 */
      bg-image('decrease_1')
      width: 12px
      height: 12px
      background-size: 12px 12px
    &.discount_1
      bg-image('discount_1')
      width: 12px
      height: 12px
      background-size: 12px 12px
    &.guarantee_1
      bg-image('guarantee_1')
      width: 12px
      height: 12px
      background-size: 12px 12px
    &.invoice_1
      bg-image('invoice_1')
      width: 12px
      height: 12px
      background-size: 12px 12px
    &.special_1
      bg-image('special_1')
      width: 12px
      height: 12px
      background-size: 12px 12px
    &.decrease_2 /* &表示当前选择对象 */
      bg-image('decrease_2')
      width: 16px
      height: 16px
      background-size: 16px 16px
    &.discount_2
      bg-image('discount_2')
      width: 16px
      height: 16px
      background-size: 16px 16px
    &.guarantee_2
      bg-image('guarantee_2')
      width: 16px
      height: 16px
      background-size: 16px 16px
    &.invoice_2
      bg-image('invoice_2')
      width: 16px
      height: 16px
      background-size: 16px 16px
    &.special_2
      bg-image('special_2')
      width: 16px
      height: 16px
      background-size: 16px 16px
    &.decrease_3 /* &表示当前选择对象 */
      bg-image('decrease_3')
      width: 12px
      height: 12px
      background-size: 12px 12px
    &.discount_3
      bg-image('discount_3')
      width: 12px
      height: 12px
      background-size: 12px 12px
    &.guarantee_3
      bg-image('guarantee_3')
      width: 12px
      height: 12px
      background-size: 12px 12px
    &.invoice_3
      bg-image('invoice_3')
      width: 12px
      height: 12px
      background-size: 12px 12px
    &.special_3
      bg-image('special_3')
      width: 12px
      height: 12px
      background-size: 12px 12px
    &.decrease_4 /* &表示当前选择对象 */
      bg-image('decrease_4')
      width: 16px
      height: 16px
      background-size: 16px 16px
    &.discount_4
      bg-image('discount_4')
      width: 16px
      height: 16px
      background-size: 16px 16px
    &.guarantee_4
      bg-image('guarantee_4')
      width: 16px
      height: 16px
      background-size: 16px 16px
    &.invoice_4
      bg-image('invoice_4')
      width: 16px
      height: 16px
      background-size: 16px 16px
    &.special_4
      bg-image('special_4')
      width: 16px
      height: 16px
      background-size: 16px 16px

</style>
