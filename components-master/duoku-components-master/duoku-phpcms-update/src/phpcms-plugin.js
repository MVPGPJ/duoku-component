/**
 * Create by .
 * User: liutinghai
 * Date: 2018/7/30
 * Time: 10:29
 */
var fs = require ('fs')
var path = require ('path')
var u = require ('underscore')
var request = require ('request')
var log = require ('log-util')
var chalk = require ('chalk')
var phpcmsUpdate = require ('./phpcms-plugin-update')

var eventEmitter = require ('events').EventEmitter

//当前请求的request,每次请求不能new,否则cookie丢失
var myRequest = {}
var event = new eventEmitter ()
var pc_hash = {}

/**
 * 文件上传
 * @param url
 * @param data
 * @param filepath
 * @param subpath
 * @param callback
 */
function upload (url, data, filepath, subpath, callback) {
  var formData = u.extend (data, {
    file: {
      value: fs.createReadStream (filepath),
      options: {
        filename: subpath
      }
    }
  })
  request.post ({
    url: url,
    formData: formData
  }, function (err, res, body) {
    if (err) {
      callback (err)
      return
    }
    callback ()
  })
}

/**
 * 首先读取验证码，获取相应的cookie
 * @param callback
 */
function checkCode (options, callback) {
  var url = options.phpcmsBaseurl + 'api.php?op=checkcode&code_len=4&font_size=20&width=130&height=50&font_color=&background=&backdoor=1'
  myRequest = request.defaults ({jar: true})
  myRequest (url, function (e, r, b) {
    callback ()
  })
}

//设置对应的siteId, 请求之后cookie里面会增加 SMxBD_siteid 字段
function setSite (options) {
  //http://gw-admin-dev.iduoku.cn:8080/index.php?m=admin&c=index&a=public_set_siteid&siteid=16
  var url = options.phpcmsBaseurl + 'index.php?m=admin&c=index&a=public_set_siteid&siteid=' + options.siteId;
  myRequest = request.defaults ({jar: true})
  myRequest (url, function (e, r, b) {
    event.emit('setSiteComplete');
  })
}

/**
 * 登录推送插件
 *
 * @param options
 * @param options.receiver
 * @param options.to
 * @param options.token
 *
 * @constructor
 */
function PhpcmsPlugin (options) {
  this.options = options
}

/**
 * 集成到webpack需要实现apply 方法
 * @param compiler
 */
PhpcmsPlugin.prototype.apply = function (compiler) {
  var me = this
  
  //webpack插件支持模式，编译完成上传流程
  if (compiler) {
    compiler.plugin ('after-emit', function (data, cb) {
      me.upload (data, cb)
    })
    return;
  }
  
  //phpcms 模式
  fs.readdir (this.options.from, function (err, files) {
    var params = {
      assets: {},
      size:files.length
    }
    u.each (files, function (item, file) {
      params.assets[item] = {existsAt: me.options.from + item}
    })
    console.log('开始上传模板文件:')
    me.upload (params, function (data) {
    })
  })
  
  //上传文件完成
  event.on ('uploadComplete', function () {
    checkCode (me.options, function () {
      me.login ()
    })
  })
  
  //登录完成
  event.on ('loginComplete', function () {
    setSite(me.options,function () {
    
    })
  })
  
  //选择完站点
  event.on('setSiteComplete',function () {
    new phpcmsUpdate (myRequest, me.options)
  })
  
}

PhpcmsPlugin.prototype.upload = function (compilation, cb) {
  var assets = compilation.assets
  var opt = this.options
  var count = 0;
  u.each (assets, function (item, filename) {
    // var content = fs.readFileSync(item.existsAt, 'utf8');
    var subpath = path.basename (filename)
    upload (opt.receiver, {
      token: opt.token,
      to: opt.to + '/' + filename
    }, item.existsAt, subpath, function (err, res) {
      count ++;
      if (err) {
        console.error (filename + ' - ' + chalk.red ('[error] [' + err + ']'))
      }
      else {
        console.log(filename + chalk.green (' [DONE]'))
      }
      
      if(count == compilation.size){
        console.log(chalk.green('上传模板文件完成'))
        event.emit('uploadComplete');
      }
      
    })
  })
  cb ()
}

PhpcmsPlugin.prototype.login = function () {
  var ref = this
  console.log ('开始登录')
  var options = {
    url: this.options.phpcmsBaseurl + '/index.php?m=admin&c=index&a=login&dosubmit=1',
    username: this.options.phpcmsUsername,
    password: this.options.phpcmsPassword,
    code: this.options.phpcmsCode
  }
  
  function callback (error, response, body) {
    if (!error && response.statusCode == 200) {
      let startIndex = body.indexOf ('pc_hash=') + 8
      ref.options['pc_hash'] = body.substring (startIndex, startIndex + 6)
      console.log (chalk.green('登录成功！'))
      event.emit ('loginComplete')
    }
  }
  
  myRequest.post ({
    url: options.url,
    formData: options
  }, callback)
  
}

PhpcmsPlugin.prototype.testUpload = upload

module.exports = PhpcmsPlugin