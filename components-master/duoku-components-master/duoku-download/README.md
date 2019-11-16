# 最新版
* http://ycimg.m.duoku.com/cimages/img/promo/downsdk/common/download-manager.min.aefd29dd.js
# 特性
* 同时支持HTTP、HTTPS。一套代码兼容手助、用户平台、手机浏览器等环境的下载功能。

# 使用说明
##### 1、 加载
* 利用script引入download-manager.min.js、download-manager.min.js.map的文件后，window上会绑定DUOKU.DownloadManager这个方法

##### 2、 使用
````
var DM = new DUOKU.DownloadManager()
DM.ready(function () {
    console.log('SDK Ready!!!')
    // TODO...
})
````
| 方法名 | 说明 | 参数 |
| ------ | ------ | ------ |
| ready | 加载完成后的回调方法 | function |
| appCallbackRegister | 注册方法函数 | appInfo |
| downloadApp | 开始下载app方法 | appInfo |
| pauseAppDownload | 暂停下载app方法 | appInfo |
| cancelDownload | 取消下载app方法 | appInfo |
| installApp | 安装app方法 | appInfo |
| launchApp | 启动app方法 | appInfo |
| getAppInfo | 获取app信息方法 | appInfo |
| getAppState | 获取app状态方法 | appInfo |