<template>
    <transition name="dialog" >
        <div class="dialog-mask" id="c-dialog-mask">
          <div class="dialog-wrapper">
            <div class="dialog-container" :style="{background : containerBgcolor == '1' ? '#ffffff' : '',border: containerBgcolor == '1' ? '1px solid #ffffff' : ''}">

                <div class="dialog-header">
                    <slot name="header">
                        default header
                    </slot>
                </div>

                <div class="dialog-body">
                    <slot name="body">
                        default body
                    </slot>
                </div>

            </div>
            <div class="dialog-footer">
                <slot name="footer">
                    <div class="dialog-default-button" @click="this.$emit('close')">
                        关闭
                    </div>
                </slot>
            </div>
            <div class="dialog-close" @click="$emit('close')"><span class="hide"></span></div>
          </div>
                <slot name="back"></slot>
                <slot name="bottom"></slot>
        </div>
    </transition>
</template>

<script>
export default {
  props: ['dataClose', 'containerBgcolor'],
  methods: {},
  mounted () {
  },
  destroyed () {
  }
}
</script>

<style lang="scss" scoped>
    @import "../../assets/sass/util.scss";
    .dialog-mask {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        @include flex-center;
        background-color: rgba(0, 0, 0, .7);
        transition: opacity .3s ease;
        z-index: 9999;
    }
    .dialog-wrapper {
      position: relative;
      box-sizing: border-box;
      min-width: 620px;
      width: 620px;
      margin: 0px auto;
      padding: 100px 30px 40px;
      background: #f24b53;
      border-radius: 10px;
      z-index: 99999;
    }
    .dialog-container {
      min-height: 200px;
      border: 1px solid #ffcc6e;
      border-radius: 10px;
      background: #fcda76;
      transition: all .3s ease;
      height: 600px;
      box-shadow:4px 0px 0px rgba(78,50,0,0.15);
      overflow-y: scroll;
    }

    .dialog-header {
    }

    .dialog-body {
    }

    .dialog-footer {
    }

    .dialog-close {
      position: absolute;
      top: 10px;
      right: 8px;
      width: 61px;
      height: 58px;
      background: url(./close.png) no-repeat;
      background-size: 100%;
    }

    .dialog-enter {
        opacity: 0;
    }

    .dialog-leave-to {
        opacity: 0;
    }

    .dialog-enter .dialog-wrapper,
    .dialog-leave-to .dialog-wrapper {
        transform: scale(1.1);
    }
</style>
