/**
 * 百度手机助手下载管理器适配器，用于适配通用的SDK。
 * 
 * @author litong <litong@baidu-mgame.com>
 * Date: 2018/10/10
 */
export function BdsjzsAdapter (downloadManager) {

  return {
    DM:downloadManager,
    STATE : {
      UNKNOWN:                        -1, // 未知状态，原WebView JS扩展所没有，AppState中也没有的默认未知标示状态
      NOT_DOWNLOAD:                    0, // 未安装，未下载[重要状态]
      WAIT_DOWNLOAD:                   1, // 等待下载[重要状态]
      DOWNLOADING:                     2, // 正在下载[重要状态]
      FINISH_DOWNLOAD:                 3, // 下载完成[重要状态]
      CAN_UPDATE:                      4, // 可更新
      ALREADY_DOWNLOAD_AND_CAN_UPDATE: 5, // 已下载可更新
      INSTALLED:                       6, // 已安装[重要状态]
      INSTALLING:                      7, // 安装中[重要状态]
      PAUSE:                           8, // 暂停中[重要状态]
      PACKAGING:                       9, // 拼包中
      PACKAGE_FAILED:                 10, // 拼包失败
      NEED_RETRY:                     11, // 需重试
      DELETE:                         12, // 删除
      UNINSTALL:                      13, // 卸装
      WIFI_PREDOWNLOAD:               14  // wifi预下载
    },
    appCallbackRegister: function(appInfo) {
      window.AS.app.appCallbackRegister(appInfo);
    },
    startDownload: function(appInfo) {
      console.log('startDownload')
      // 手助下载用 download_inner_sz 这个下载地址
      var mAppInfo = appInfo
      mAppInfo.download_inner = appInfo.download_inner_sz
      window.AS.app.downloadApp(mAppInfo);
    },
    pauseAppDownload: function(appInfo) {
      window.AS.app.pauseAppDownload(appInfo);
    },
    cancelDownload: function(appInfo) {
      window.AS.app.cancelDownload(appInfo);
    },
    installApp: function(appInfo) {
      window.AS.app.installApp(appInfo);
    },
    launchApp: function(appInfo) {
      window.AS.app.launchApp(appInfo["package"]);
    },
    getAppInfo: function(packageName, versionCode) {
      return window.AS.app.getAppInfo(packageName, versionCode);
    },
    getAppState: function(packageName, versionCode) {
      var state = window.AS.app.getAppState(packageName, versionCode);
      if(state == this.STATE.NOT_DOWNLOAD)     return this.DM.STATE.NOT_DOWNLOAD;
      if(state == this.STATE.DOWNLOADING)      return this.DM.STATE.DOWNLOADING;
      if(state == this.STATE.WAIT_DOWNLOAD)    return this.DM.STATE.WAIT_DOWNLOAD;
      if(state == this.STATE.FINISH_DOWNLOAD)  return this.DM.STATE.FINISH_DOWNLOAD;
      if(state == this.STATE.INSTALLING)       return this.DM.STATE.INSTALLING;
      if(state == this.STATE.INSTALLED)        return this.DM.STATE.INSTALLED;
      if(state == this.STATE.PAUSE)            return this.DM.STATE.PAUSE;
      if(state == this.STATE.WIFI_PREDOWNLOAD) return this.DM.STATE.WIFI_PREDOWNLOAD;
      
      // log("getAppState: #UNKNOWN# -> " + state);
      // 异常状态直接返回
      return state;
    },
    onStateChange: function(key, state) {
      // log('onStateChange: key->' + key + '; state = ' + state);
      console.log(key + ' key === state ===  ' + state)

      if     (state == 1)  this.DM.emit("wait_download",    { key: key });
      else if(state == 2)  this.DM.emit("downloading",      { key: key, percent: this.DM.getCache(key + "_percent") || 0 });
      else if(state == 3)  this.DM.emit("downloaded",       { key: key });
      else if(state == 6)  this.DM.emit("installed",        { key: key });
      else if(state == 7)  this.DM.emit("installing",       { key: key });
      else if(state == 8)  this.DM.emit("pause",            { key: key, percent: this.DM.getCache(key + "_percent") || 0 });
      else if(state == 14) this.DM.emit("wifi_predownload", { key: key });
      
      this.DM.setCache(key + "_state", state);
    },
    onProgressChange: function(key, percent) {
      console.log('percent === ' + percent)
      this.DM.emit("progressChange", { key: key, percent: percent });
      this.DM.setCache(key + "_percent", percent);
      // 百度手机助手SDK中，进度只会通知到99%，考虑到样式的显示，自动发布事件进度到100%
      if(percent == 99) {
        this.DM.emit("progressChange", { key: key, percent: 100 })
        this.DM.setCache(key + "_percent", 100);
      }
    }
  }
}
