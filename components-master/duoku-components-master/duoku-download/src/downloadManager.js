/**
 * Create by .
 * User: litong
 * Date: 2018/10/10
 * Time: 16:32
 */
/* eslint-disable */
import {BdmgjbAdapter} from '../lib/bdmgjb-adapter'
import {BdsjzsAdapter} from '../lib/bdsjzs-adapter'

function DownloadManager (options) {
  this.showWXMast = function(){}
  if (options.showWXMast) {
    this.showWXMast = options.showWXMast;
  }
  //当前所在环境  手助/用户平台
  this.currentEnv = null
  //当前下载适配器
  this.currentAdapter = null
  // 通用下载管理器定义的状态，独立于任何下载SDK
  this.STATE = {
    UNKNOWN:          "UNKNOWN",         // 未知状态
    NOT_DOWNLOAD:     "NOT_DOWNLOAD",    // 尚未下载
    DOWNLOADING:      "DOWNLOADING",     // 正在下载
    WAIT_DOWNLOAD:    "WAIT_DOWNLOAD",   // 等待下载
    FINISH_DOWNLOAD:  "FINISH_DOWNLOAD", // 下载完成
    INSTALLING:       "INSTALLING",      // 安装中
    INSTALLED:        "INSTALLED",       // 已安装
    PAUSE:            "PAUSE",           // 暂停中
    WIFI_PREDOWNLOAD: "WIFI_PREDOWNLOAD" // wifi预下载
  }
  /**
   * 根据APP_INFO获取初始化的状态
   */
  let _initState = (appInfo) => {
    var key = appInfo["package"] + "@" + appInfo["versioncode"];
    var state = this.getAppState(appInfo["package"], appInfo["versioncode"]);
    this.log('_initState: ' + state);

    if     (state == DM_STATE.NOT_DOWNLOAD)    this.emit("not_download", { key: key });
    else if(state == DM_STATE.WAIT_DOWNLOAD)   this.emit("wait_download", { key: key });
    else if(state == DM_STATE.DOWNLOADING) {
      var percent = DownloadManager.getCache(key + "_percent") || 0;
      this.emit("downloading", { key: key, percent: percent });
    }
    else if(state == DM_STATE.FINISH_DOWNLOAD) this.emit("downloaded", { key: key });
    else if(state == DM_STATE.INSTALLED)       this.emit("installed", { key: key });
    else if(state == DM_STATE.INSTALLING)      this.emit("installing", { key: key });
    else if(state == DM_STATE.WIFI_PREDOWNLOAD) this.emit("wifi_predownload", { key: key });
    else if(state == DM_STATE.PAUSE) {
      var percent = DownloadManager.getCache(key + "_percent") || 0;
      this.emit("pause", { key: key, percent: percent });
    }
  }
  // 私有方法 
  // 判断当前所在环境 手助/用户平台/微信/安卓浏览器/iOS浏览器
  let whereAmI = () =>{
    var self = this
    if(typeof appclient == 'object') {
      console.log('加载手助SDK')
      // 在手机百度助手的环境中，加载手机百度助手SDK
      fetchJS('//ycimg.m.duoku.com/cimages/img/promo/downsdk/bdsjzs/sdk-1.2.1.min.js', function() {
        if(!window.AS) throw new Error("请先加载百度手机助手SDK");
        // 在SDK准备就绪之后，需要发布"ready"事件
        window.AS.ready(function() {
          self.currentEnv = 'bdsjzs'
          self.currentAdapter = new BdsjzsAdapter(self)
          self.emit("ready");
        });
      })
    } else if(typeof BaiDuMobileGameJsBridge == 'object') {
      // 在自有SDK的环境中，加载自有SDK适配器，自有SDK无需JSSDK
      this.currentEnv = 'bdmgjb'
      this.currentAdapter = new BdmgjbAdapter(this)
      setTimeout(() => {
        this.emit("ready");
      }, 100);
    } else if (/iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())) {
      // 在iOS环境内
      this.currentAdapter = {startDownload:function(appInfo){
        location.href = appInfo.download_ios
      }}
      setTimeout(() => {
        this.emit("ready");
      }, 100);
    } else if (!!(/micromessenger/.test(navigator.userAgent.toLowerCase()))) {
      // 在微信环境内
      this.currentAdapter = {startDownload:() => {
        self.showWXMast()
      }}
      setTimeout(() => {
        this.emit("ready");
      }, 100);
    } else {
      // 其他环境直接下载
      this.currentAdapter = {startDownload:function(appInfo){
        location.href = appInfo.download_android
      }}
      setTimeout(() => {
        this.emit("ready");
      }, 100);
    }
    
    if(!this.currentAdapter.getAppState){
      this.currentAdapter['getAppState'] = function () {
        return ''
      }
    }
  
  
    if(!this.currentAdapter.appCallbackRegister){
      this.currentAdapter['appCallbackRegister'] = function () {}
    }
    
  }
  /**
   * 在下载管理器中实现了一个发布订阅中心
   * 
   * _hookCenter: 发布订阅中心，存储事件名与对应的回调函数
   * on         : 订阅事件
   * emit       : 发布事件
   */
  this._hookCenter = {}
  this.on = function (eventName, hook) {
    if(typeof this._hookCenter[eventName] == "undefined") this._hookCenter[eventName] = [];
    this._hookCenter[eventName].push(hook);
  }
  this.emit = function (eventName, params) {
    if(typeof this._hookCenter[eventName] == "undefined") return;
    
    var hookList = this._hookCenter[eventName];
    for(var i = 0; i < hookList.length; i++) {
      hookList[i](params);
    }
  }
  /**
   * 下载管理器缓存系统，默认使用localStorage
   * 用于存储一些状态，方便下次进入页面的时候读取关闭页面时的状态
   * 如下载进度等
   */
  this.CACHE_KEY = 'BAIDU_MAGEM_DOWNLOAD_MANAGER_BY_KANGBIN',
  this.setCache = function(key, value) {
    if(!localStorage) return;

    var cache = localStorage[this.CACHE_KEY];
    if(typeof cache == "undefined") cache = {};
    else cache = JSON.parse(cache);

    cache[key] = value;
    localStorage[this.CACHE_KEY] = JSON.stringify(cache);
  }
  this.getCache = function(key) {
    if(!localStorage) return;

    var cache = localStorage[this.CACHE_KEY];
    if(typeof cache == "undefined") return;
    
    cache = JSON.parse(cache);
    return cache[key];
  }
  // 动态加载JS
  function fetchJS(jsUrl, callback) {
    var loadScript = document.createElement('script');
    loadScript.setAttribute('type', 'text/javascript');
    loadScript.setAttribute('src', jsUrl);

    document.getElementsByTagName('head')[0].appendChild(loadScript);
    
    if(navigator.userAgent.indexOf('MSIE') > -1) {
      loadScript.onreadystatechange = function() {
        if(loadScript && (loadScript.readyState == 'loaded' || loadScript.readyState == 'complete')) {
          loadScript.onreadystatechange = null;
          callback();
        }
      };
    } else {
      loadScript.onload = function() {
        loadScript.onload = null;
        callback();
      };
    }
  }
  whereAmI()
}

DownloadManager.prototype.test = function (){
  console.log(this.currentAdapter)
}
/**
* 下载管理器准备就绪，所有的下载操作，必须等下载管理器准备就绪之后才能进行
* 
* @param readyHook 下载管理器准备就绪之后的回调函数
*/
DownloadManager.prototype.ready = function(readyHook) {
 this.on("ready", readyHook);
}
/**
 * 注册回调函数
 */
DownloadManager.prototype.appCallbackRegister = function(appInfo) {
  this.currentAdapter.appCallbackRegister(appInfo);
}

/**
 * 开始下载
 * 
 * @param appInfo 下载包信息对象
 * @param startDownloadHook 开始下载的回调函数
 */
DownloadManager.prototype.downloadApp = function(appInfo, startDownloadHook) {
  console.log('downloadApp')
  this.currentAdapter.startDownload(appInfo, startDownloadHook);
}

/**
 * 暂停下载
 * 
 * @param appInfo 包信息
 */
DownloadManager.prototype.pauseAppDownload = function(appInfo) {
  this.currentAdapter.pauseAppDownload(appInfo)
}

/**
 * 取消下载
 * 
 * @param downloadId 下载任务ID
 */
DownloadManager.prototype.cancelDownload = function(downloadId) {
  this.currentAdapter.cancelDownload(downloadId);
}

/**
 * 安装应用
 * 
 * @param appInfo 下载包信息对象
 */
DownloadManager.prototype.installApp = function(appInfo) {
  this.currentAdapter.installApp(appInfo);
}

/**
 * 启动应用
 * 
 * @param appInfo 下载包信息对象
 */
DownloadManager.prototype.launchApp = function(appInfo) {
  this.currentAdapter.launchApp(appInfo);
}

/**
 * 获取App信息
 * 
 * @param packageName 包名
 * @param versionCode 版本号
 */
DownloadManager.prototype.getAppInfo = function(packageName, versionCode) {
  return this.currentAdapter.getAppInfo(packageName, versionCode);
}

/**
 * 获取App状态
 * 
 * @param packageName 包名
 * @param versionCode 版本号
 */
DownloadManager.prototype.getAppState = function(packageName, versionCode) {
  console.log('getAppState')
  return this.currentAdapter.getAppState(packageName, versionCode);
}
export {DownloadManager}