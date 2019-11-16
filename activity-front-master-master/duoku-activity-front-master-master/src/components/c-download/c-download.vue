<template>
  <div class="c-download">
    <section class="c-download-gameContainer">
      <div class="c-download-row">
        <div class="wrapper" v-for="o in datas" v-bind:key="o.packageid">
          <div class="icon" :style="{backgroundImage: 'url(' + o.icon +')'}"></div>
          <p class="name">{{o.game_name}}</p>
          <div v-if=" o.awardStatus === 3 && o.downloadText ==='打开'" :id="'download-btn'+o.packageid" class="download-btn" @click="downAward(o)">
            领奖励
          </div>
          <div v-else :id="'download-btn'+o.packageid" class="download-btn" @click="download(o)">
            {{o.downloadText}}
          </div>
        </div>
      </div>
    </section>
    <c-toast :show="isShowToast" :text="toastText" :position="toastPosition" @close='isShowToast = false'></c-toast>
  </div>
</template>

<script>

import { dynamicLoadJs } from '@/utils/util'
import { getAward } from '@/api/index'

const DOWNLOAD_SDK_URL = '//ycimg.m.duoku.com/cimages/img/promo/downsdk/common/download-manager.min.deb6a772.js'

export default {
  data () {
    return {
      datas: [],
      toastPosition: '',
      isShowToast: false,
      toastText: ''
    }
  },
  components: {
    'cToast': () => import('@/components/c-toast/c-toast')
  },
  methods: {
    /**
       * 判断是否为IOS
       */
    isIOS () {
      var ua = navigator.userAgent.toLowerCase()
      if (/iphone|ipad|ipod/.test(ua)) {
        return true
      }
      return false
    },
    /**
     * 获取下载APP的状态（还需要在优化）
     */
    getAppStateName (val) {
      let state = parseInt(val)
      if (state === -1) {
        return '未知'
      } else if (state === 0) {
        return '下载'
      } else if (state === 6) {
        return '打开'
      } else if (state === 2) {
        return '下载中'
      } else if (state === 1) {
        return '等待'
      } else if (state === 3) {
        return '安装'
      } else if (state === 4) {
        return '可更新'
      } else if (state === 5) {
        return '已下载可更新'
      } else if (state === 7) {
        return '安装中'
      } else if (state === 8) {
        return '继续'
      } else if (state === 9) {
        return '拼包中'
      } else if (state === 10) {
        return '拼包失败'
      } else if (state === 11) {
        return '需重试'
      } else if (state === 12) {
        return '删除'
      } else if (state === 13) {
        return '卸载'
      } else if (state === 14) {
        return 'WIFI预下载'
      } else {
        return '下载'
      }
    },
    /**
       * 判断是否为微信
       */
    isWeixin () {
      var ua = navigator.userAgent.toLowerCase()
      var result = !!(/micromessenger/.test(ua))
      if (result) {
        return true
      }
      return false
    },
    /**
     * 下载，支持微信，IOS，SDK用户平台，百度手机助手
     */
    download (o) {
      var self = this
      var installAppState = self.DM.getAppState(o.package, o.versioncode)
      if (installAppState === 'INSTALLED') { // 已安装
        self.DM.launchApp(o)
      } else if (installAppState === 'DOWNLOADING') { // 正在下载
        self.DM.pauseAppDownload(o)
      } else if (installAppState === 'FINISH_DOWNLOAD') { // 下载完成
        self.DM.installApp(o)
      } else if (installAppState === 'PAUSE') { // 暂停中
        self.DM.downloadApp(o)
      } else {
        console.log(o)
        self.DM.currentAdapter.startDownload(o)
      }
    },
    /**
       * 获取下载奖励
       */
    downAward (o) {
      getAward({gameId: o.game_id}).then((rs) => {
        if (rs.code === 3001) {
          this.toastText = '领取奖励成功'
          this.isShowToast = true
          o.downloadText = '打开'
          this.$emit('awardSuccess')
        } else {
          this.toastText = rs.msg
          this.isShowToast = true
        }
      }).catch(() => {
        this.toastText = '领取奖励失败'
        this.isShowToast = true
      })
    },
    /**
     * 获取下载游戏列表
     */
    getGameList () {
      this.datas = [{
        'game_id': 14957237,
        'game_name': '\u653b\u57ce\u63a0\u5730',
        'sname': '\u653b\u57ce\u63a0\u5730',
        'packageid': 3818249,
        'versioncode': 82,
        'versionname': '4.5.0',
        'download_inner': 'http://duokoo.baidu.com/game/?pageid=Hdkicssp&p_tag=1965452',
        'download_inner_sz': 'http://gdown.baidu.com/data/wisegame/e47ea9a715426977/gongchengluedi_82.apk',
        'icon': 'https://ycimg.m.duoku.com/cimages/img/24915/24915.png',
        'size': 154875043,
        'package': 'com.regin.gcldnew.baidu',
        'docid': 25192792,
        'signmd5': 4048692928,
        'desc': '\u5c11\u65f6239999',
        'type': 'game',
        'downloadText': '\u4e0b\u8f7d',
        'awardStatus': 3
      }]
      this.initDownloadManager()
    },
    /**
     * 初始化 downloadManager
     */
    initDownloadManager () {
      var self = this
      self.DM = new window.DUOKU.DownloadManager({
        // 微信的处理逻辑
        showWXMast: () => {}
      })
      self.DM.ready(function () {
        self.datas.map((o) => {
          ((obj) => {
            var installAppState = self.DM.getAppState(obj.package, obj.versioncode)
            console.log('installAppState:' + installAppState)
            obj.downloadText = self.getAppStateName(installAppState)
            self.DM.appCallbackRegister({
              packageName: obj.package,
              versionCode: obj.versioncode,
              stateChange: function (appkey, state) {
                obj.downloadText = self.getAppStateName(state)
                console.log('state:' + state)
              },
              porgressChange: function (appkey, percent) {
                obj.downloadText = percent + '%'
                console.log('percent:' + percent)
              }
            })
          })(o)
        })
      })
    },
    sdkReady (cbk) {
      if (!window.DUOKU) {
        dynamicLoadJs(DOWNLOAD_SDK_URL, () => {
          cbk()
        })
      } else {
        cbk()
      }
    }
  },
  mounted () {
    this.sdkReady(() => {
      this.getGameList()
    })
  }
}
</script>

<style lang="scss" scoped>
.c-download {
  margin: 0 auto;
  width: 630px;
  height: 330px;
  border-radius:10px;
  position: relative;
  background-image: url(download_bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  header {
    font-size:24px;
    font-family:STYuanti-SC-Bold;
    font-weight:bold;
    color:rgba(176,11,14,1);
    position: absolute;
    top: 31px;
    left: 33px;
  }
  .c-download-gameContainer {
    padding-top: 64px;
    .c-download-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 25px 30px 0;
    }
    .wrapper {
      display: inline-block;
      width: 115px;
      font-size: 30px;
      margin: 0 15px;
      .icon {
        width: 114px;
        height: 114px;
        background-size: 100% 100%;
        background-position: center;
        background-repeat: no-repeat;
      }
      .name {
        margin: 11px auto 15px;
        font-size:24px;
        font-weight:400;
        color:rgba(67,37,0,1);
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
        overflow: hidden;
      }
      .download-btn {
        text-align: center;
        line-height: 46px !important;
        background:rgba(255,221,156,1);
        border:1px solid rgba(153,85,0,1);
        border-radius:5px;
        line-height: 46px;
        color: #A26418;
      }
    }
  }
}

</style>
