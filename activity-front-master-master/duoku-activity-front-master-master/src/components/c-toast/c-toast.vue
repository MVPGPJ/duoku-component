<template>
  <transition name="toast">
    <div v-if="showStatus" class="toast" transition="toast" v-text="text"></div>
  </transition>
</template>

<script>
export default {
  props: {
    show: { type: Boolean, default: false },
    text: { type: String, default: ' ' }
  },
  data () {
    return {
      timers: [],
      showTime: 3000,
      showStatus: this.show
    }
  },
  methods: {
    countdown () {
      const t = setTimeout(() => { this.close() }, this.showTime)
      this.timers.push(t)
    },
    close () {
      this.showStatus = false
      this.$emit('close')
    }
  },
  watch: {
    show (val) {
      this.showStatus = val
      this.timers.forEach((timer) => { clearTimeout(timer) })
      this.timers = []
      if (val) this.countdown()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/sass/util.scss";
  .toast {
    position: fixed;
    z-index: 5000;
    top: 0;
    left: 0;
    right: 0;
    font-size: 28px;
    line-height: 80px;
    background-color: rgba(215, 97, 32, .9);
    color: #FFF;
    text-align: center;
    border-bottom: 1px solid rgba(251, 145, 87, .9);
  }
  .toast-enter-active, .toast-leave-active {
    transition: top .6s;
    transition: opacity .5s;
  }
  .toast-enter, .toast-leave-to {
    top: -82px;
    opacity: 0;
  }
</style>
