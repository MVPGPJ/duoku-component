/**
 * 百度游戏自有SDK下载管理器适配器，用于适配通用的SDK。
 * 
 * @author litong <litong@baidu-mgame.com>
 */
export function BdmgjbAdapter (downloadManager) {
  return {
    DM:downloadManager,
    stateCenter: {},
    appCallbackRegister: function(appInfo) {
      // 没有注册的接口，这里注册会将应用信息存储到状态中心，记录对应下载包的状态
      var packageName = appInfo['packageName'];
      this.stateCenter[packageName] = { 'state': this.DM.STATE.NOT_DOWNLOAD, 'appInfo':appInfo };
    },
    startDownload: function(appInfo) {
      console.log('startDownload')
      window.BaiDuMobileGameJsBridge.downloadGame(appInfo['package'], appInfo['sname'], appInfo['packageid'], appInfo['size'], appInfo['download_inner'], appInfo['icon'], appInfo['versionname']);
      window.BaiDuMobileGameJsBridge.showToast('开始下载')
      console.log(this.stateCenter[appInfo['package']])
      // 修改应用的状态为正在下载 
      this.stateCenter[appInfo['package']].state = this.DM.STATE.DOWNLOADING;

      // 发布事件：正在下载
      this.stateCenter[appInfo['package']]['appInfo'].stateChange(appInfo['packageid'], 2);
    },
    pauseDownload: function(appInfo) {
      // log('pauseDownload');
      // 没有暂停下载的接口，修改执行动作为：跳转到下载管理器界面
      window.BaiDuMobileGameJsBridge.enterDownLoadManager();
    },
    cancelDownload: function(appInfo) {
      // 没有取消下载的接口
    },
    installApp: function(appInfo) {
      // 没有安装APP的接口
    },
    launchApp: function(appInfo) {
      window.BaiDuMobileGameJsBridge.startApp(appInfo["package"]);
    },
    getAppInfo: function(packageName, versionCode) {
      // 没有获取App
    },
    getAppState: function(packageName, versionCode) {
      // log('getAppState');
      // 因为自有SDK提供的接口有限，所以下载应用状态也有限
      // 如果判断对应的包已经安装，返回状态“已经安装”
      if(window.BaiDuMobileGameJsBridge.isInstall(packageName)) return this.DM.STATE.INSTALLED;
      // 其余情况，返回状态中心对应下载应用的状态
      if(this.stateCenter[packageName]){
        return this.stateCenter[packageName].state;
      }else{
        return null
      }
    },
    onStateChange: function(key, state) {
      // 没有状态推送
    },
    onProgressChange: function(key, percent) {
      // 没有下载进度推送
    }
  }
}

// 在SDK准备就绪之后，需要发布"ready"事件
// setTimeout(function() {
//   DM.emit("ready");
// }, 200);

