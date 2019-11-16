/**
 * Create by .
 * User: liutinghai
 * Date: 2018/8/1
 * Time: 11:43
 */
var eventEmitter = require ('events').EventEmitter
var log = require ('log-util')
var event = new eventEmitter ()

function phpcmsPluginUpdate (request, options) {
  //为了保留cookie 状态，所以不能重新 require('request')
  this.myRequest = request
  this.options = options;
  this.init ()
}

phpcmsPluginUpdate.prototype = {
  init: function () {
    this.updateColumnsPage ()
    // this.updateContentPage();
  },
  /**
   * 批量更新栏目页
   */
  updateColumnsPage: function () {
    var ref = this
    var columnUrl = this.options.phpcmsBaseurl + 'index.php?m=content&c=create_html&a=category'
    //columns
    console.log ('开始更新栏目页')
    var formData = {
      pc_hash: this.options.pc_hash,
      dosubmit: 1,
      type: 'all',
      modelid: '',
      catids: [],
      pagesize: 10
    }
    this.myRequest.post ({
      url: columnUrl,
      formData: formData
    }, function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error ('upload failed:', err)
      }
      ref.cyclicUpdateColumn (ref.getRedirectUrl (body))
    })
  },
  updateContentPage: function () {
    console.log('开始批量更新内容页')
    var ref = this
    // http://gw-admin-dev.iduoku.cn:8080/index.php?m=content&c=create_html&a=show
    var url =  this.options.phpcmsBaseurl + 'index.php?m=content&c=create_html&a=show'
    var formData = {
      pc_hash: this.options.pc_hash,
      dosubmit: 1,
      type: 'all',
      modelid: '',
      catids: [],
      pagesize: 10
    }
    this.myRequest.post ({
      url: url,
      formData: formData
    }, function optionalCallback (err, httpResponse, body) {
      if (err) {
        return console.error ('upload failed:', err)
      }
      //http://gw-admin-dev.iduoku.cn:8080/index.php?m=content&c=create_html&a=show&set_catid=1&pagesize=10&dosubmit=1&pc_hash=WLwYuA
      let newUrl = ref.getRedirectUrl (body);
      ref.cyclicUpdateContent(newUrl)
    })
  },
  
  getRedirectUrl: function (body) {
    var startIndex = body.indexOf ('(\'?m=content') + 2
    if(startIndex === 1){
      return "";
    }
    var endIndex = body.indexOf ('\');')
    var url =  body.substring (startIndex, endIndex);
    return this.options.phpcmsBaseurl + 'index.php' + url;
  },
  
  cyclicUpdateColumn: function (url) {
    var ref = this;
    function callback (error, response, body) {
      if (!error && response.statusCode == 200) {
        var rUrl = ref.getRedirectUrl(body);
        if(rUrl){
          console.log (ref.getExcuteInfo(body));
          ref.cyclicUpdateColumn(rUrl)
          return;
        }
        ref.updateContentPage();
      }
    }
    
    this.myRequest ({url: url}, callback)
  },
  
  cyclicUpdateContent:function (url){
    var ref = this;
    function callback (error, response, body) {
      if (!error && response.statusCode == 200) {
        //http://gw-admin-dev.iduoku.cn:8080/index.php?m=content&c=create_html&a=show&set_catid=1&pagesize=10&dosubmit=1&autoid=1&pc_hash=WLwYuA
        var rUrl = ref.getRedirectUrl(body);
        if(rUrl){
          ref.cyclicUpdateContent(rUrl)
        }else {
          console.log('更新内容页完成')
          console.log('登录管理后台：'+ ref.options.phpcmsBaseurl+ 'index.php?m=admin&c=index&a=login&pc_hash=');
        }
      }
    }
    this.myRequest ({url: url}, callback)
  },
  getExcuteInfo:function(body){
    let startIndex = body.indexOf('330px">') + 7;
    let endIndex = body.indexOf('...')
    let rs = body.substring(startIndex,endIndex);
    return rs;
  }
  
}

module.exports = phpcmsPluginUpdate