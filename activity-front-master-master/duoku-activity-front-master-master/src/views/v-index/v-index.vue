<template>
  <div v-swipedown="down" v-swipeup="up" v-swipeleft="aleft" v-swiperight="aright">
    <header class="header">DUOKU ACTIVITY FRONT MASTER HEADER</header>
    <c-dialog v-if="isShowDialog" @close="close"></c-dialog>
    <c-toast :show="isShowToast" :text="toastText" @close='isShowToast = false'></c-toast>
    <button @click="isShowDialog = true"> Dialog</button>
    <button @click="isShowToast = true">toast</button>
    <br>
    <div class="wrapper">
      <h1>todo list</h1>
      <input placeholder="input your products " v-model="product" @keyup.13="addProduct"/>
      <input type="button" value="submit" @click="addProduct"/>
      <ul class="list">
        <li v-for=" p in products " v-bind:key="p.id">
          {{p.name}} <span @click="delProduct(p.id)">删除</span>
        </li>
      </ul>

      <h1>download</h1>
      <div>
        <c-download></c-download>
        <c-loading></c-loading>
      </div>

      <hr>
      <h1>player</h1>
      <div>
        <c-player :url="videoUrl" :poster="swiperList[0]" :id="'master_player'" :autoplay="false" ></c-player>
      </div>
      <hr>
      <h1>swiper</h1>
      <c-swiper :list="swiperList "></c-swiper>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/index'

export default {
  data () {
    return {
      products: [],
      product: '',
      isShowDialog: false,
      isShowToast: false,
      toastText: 'duoku activity front master toast text',
      swiperList: [
        require('./swiper.png'),
        require('./swiper.png'),
        require('./swiper.png'),
        require('./swiper.png'),
        require('./swiper.png')
      ],
      videoUrl: require('./oceans.mp4')
    }
  },
  components: {
    'cDialog': () => import('@/components/c-dialog/c-dialog'),
    'cToast': () => import('@/components/c-toast/c-toast'),
    'cSwiper': () => import('@/components/c-swiper/c-swiper'),
    'cDownload': () => import('@/components/c-download/c-download'),
    'cPlayer': () => import('@/components/c-player/c-player'),
    'cLoading': () => import('@/components/c-loading/c-loading')
  },
  methods: {
    down () {
      alert('down')
    },
    up () {
      alert('up')
    },
    aleft () {
      alert('left')
    },
    aright () {
      alert('right')
    },
    delProduct (id) {
      this.products.splice(id, 1)
    },
    addProduct () {
      // 模块带上命名空间访问
      this.$store.dispatch('mycart/addProductToCart', this.product)
      this.products.push({
        id: this.products.length,
        name: this.product
      })
    },
    getUserInfo () {
      getUserInfo.then((rs) => {
        console.log(rs)
      })
    },
    close () {
      this.isShowDialog = false
    }
  },
  created () {
  },
  computed: {},
  beforeCreate () {
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/sass/main.scss";

  h1 {
    font-size: 30px;
    color: #804625;
  }
  .header {
    line-height: 10vw;
    text-align: center;
    color: white;
    background-color: darkcyan;
  }

  button {
    width: 20vw;
    height: 8vw;
    display: inline-block;
    margin-top: 5vw;
  }

  .wrapper {
    input {
      height: 10vw;
      padding: 2vw;
    }
    text-align: center;
    .list {
      width: 98%;
      line-height: 8vw;
      li {
        text-align: left;
      }
    }
  }

</style>
