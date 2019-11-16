
<template>
      <!-- swiper -->
      <swiper :options="swiperOption" width="300px">
        <swiper-slide v-for="(item,index) in list" v-bind:key="index">
          <div class="swiper">
            <img :src="item"  />
            <!--<div class="play"></div>-->
          </div>
        </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
</template>

<script>

import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  props: {
    list: Array
  },
  data () {
    return {
      swiperOption: {
        slidesPerView: 2,
        spaceBetween: 120,
        slidesPerGroup: 2,
        autoplay: true,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>
<style lang="scss" scoped>
  .swiper{
    position: relative;
    img {
      width: 416px;
      height: 234px;
    }
    .play {
      width: 110px;
      height: 110px;
      background-image: url(./play.png);
      background-size: 100% 100%;
      margin-left: 95px;
      left:50%;
      top: 50%;
      margin-top: -55px;
      position: absolute;
      cursor: pointer;
    }
  }
</style>
