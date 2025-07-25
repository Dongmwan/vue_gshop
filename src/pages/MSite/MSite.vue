<!-- eslint-disable no-new -->
<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title=address.name>
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category, index) in categorys" :key="index">
              <div class="food_container">
                <img :src="baseImageUrl + category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
        <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
    <ShopList></ShopList>
    </div>
  </section>
</template>

<script>
import {mapState} from 'vuex'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'

import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import ShopList from '../../components/ShopList/ShopList.vue'
export default {
  data () {
    return {
      baseImageUrl: 'https://fuss10.elemecdn.com'
    }
  },
  mounted () {
    this.$store.dispatch('getCategorys')
    this.$store.dispatch('getShops')
  },
  components: {
    HeaderTop,
    ShopList
  },
  computed: {
    ...mapState(['address', 'categorys']), // state.js
    // 根据categorys一堆数组生成一个2维数组，小数组中的元素个数最大是8
    categorysArr () {
      const {categorys} = this
      // 准备空的2维数组
      const arr = []
      // 准备一个小数组（最大长度为8）
      let minArr = []
      // 遍历categorys
      categorys.forEach(c => {
        // 如果当前小数组已经满了，创建一个新的
        if (minArr.length === 8) {
          minArr = []
        }
        // 如果minArr是空的(新的)，将小数组保存到大数组中
        if (minArr.length === 0) {
          arr.push(minArr)
        }
        // 将当前分类保存到小数组中
        minArr.push(c)
      })
      return arr
    }
  },
  watch: {
    categorys (value) { // categorys数组中有数据了，在异步更新界面之前执行
      /* // 创建一个Swiper实例对象，来实现轮播
      setTimeout(() => {
        // 初始化swiper
        new Swiper('.swiper-container', {
          loop: true, // 可以循环轮播
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination'
          }
        })
      }, 100) */
      // 界面更新就立即创建Swiper对象
      this.$nextTick(() => { // 一旦完成界面更新，立即调用（此条语句要卸载数据更新之后），从mounted中移到这
        // 创建一个Swiper实例对象，来实现轮播
        // eslint-disable-next-line no-new
        new Swiper('.swiper-container', {
          loop: true, // 可以循环轮播
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination'
          }
        })
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.msite  //首页
  width 100%
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774
</style>
