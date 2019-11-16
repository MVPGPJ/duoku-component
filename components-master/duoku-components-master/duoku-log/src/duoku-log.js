function Base64 () {
  // private property
  _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  
  // public method for encoding
  this.encode = function (input) {
    var output = ''
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4
    var i = 0
    input = _utf8_encode (input)
    while (i < input.length) {
      chr1 = input.charCodeAt (i++)
      chr2 = input.charCodeAt (i++)
      chr3 = input.charCodeAt (i++)
      enc1 = chr1 >> 2
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
      enc4 = chr3 & 63
      if (isNaN (chr2)) {
        enc3 = enc4 = 64
      } else if (isNaN (chr3)) {
        enc4 = 64
      }
      output = output +
        _keyStr.charAt (enc1) + _keyStr.charAt (enc2) +
        _keyStr.charAt (enc3) + _keyStr.charAt (enc4)
    }
    return output
  }
  
  // public method for decoding
  this.decode = function (input) {
    var output = ''
    var chr1, chr2, chr3
    var enc1, enc2, enc3, enc4
    var i = 0
    input = input.replace (/[^A-Za-z0-9\+\/\=]/g, '')
    while (i < input.length) {
      enc1 = _keyStr.indexOf (input.charAt (i++))
      enc2 = _keyStr.indexOf (input.charAt (i++))
      enc3 = _keyStr.indexOf (input.charAt (i++))
      enc4 = _keyStr.indexOf (input.charAt (i++))
      chr1 = (enc1 << 2) | (enc2 >> 4)
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
      chr3 = ((enc3 & 3) << 6) | enc4
      output = output + String.fromCharCode (chr1)
      if (enc3 != 64) {
        output = output + String.fromCharCode (chr2)
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode (chr3)
      }
    }
    output = _utf8_decode (output)
    return output
  }
  
  // private method for UTF-8 encoding
  _utf8_encode = function (string) {
    string = string.replace (/\r\n/g, '\n')
    var utftext = ''
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt (n)
      if (c < 128) {
        utftext += String.fromCharCode (c)
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode ((c >> 6) | 192)
        utftext += String.fromCharCode ((c & 63) | 128)
      } else {
        utftext += String.fromCharCode ((c >> 12) | 224)
        utftext += String.fromCharCode (((c >> 6) & 63) | 128)
        utftext += String.fromCharCode ((c & 63) | 128)
      }
      
    }
    return utftext
  }
  
  // private method for UTF-8 decoding
  _utf8_decode = function (utftext) {
    var string = ''
    var i = 0
    var c = c1 = c2 = 0
    while (i < utftext.length) {
      c = utftext.charCodeAt (i)
      if (c < 128) {
        string += String.fromCharCode (c)
        i++
      } else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt (i + 1)
        string += String.fromCharCode (((c & 31) << 6) | (c2 & 63))
        i += 2
      } else {
        c2 = utftext.charCodeAt (i + 1)
        c3 = utftext.charCodeAt (i + 2)
        string += String.fromCharCode (((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
        i += 3
      }
    }
    return string
  }
}

window.base64 = new Base64 ()
/**
  * 发送统计日志到BI
  */
;(function () {
  
  // 获取操作系统信息
  function getOS () {
    var pf = window.navigator.platform
    var ua = window.navigator.userAgent
    
    if (ua.match (/\(i[^;]+;( U;)? CPU.+Mac OS X/)) return 'ios'
    if (ua.indexOf ('Android') > -1 || ua.indexOf ('Adr') > -1) return 'android'
    if ((pf == 'Win32') || (pf == 'Windows') || (ua.indexOf ('Windows') > -1)) return 'windows'
    if ((pf == 'Mac68K') || (pf == 'MacPPC') || (pf == 'Macintosh') || (pf == 'MacIntel')) return 'mac'
    if (pf == 'X11') return 'unix'
    if (String (pf).indexOf ('Linux') > -1) return 'linux'
    
    return 'unknown'
  }
  
  // 获取浏览器信息
  function getBrowser () {
    var ua = window.navigator.userAgent.toLowerCase ()
    
    if (ua.indexOf ('micromessenger') > -1) return 'wechat'
    if (ua.indexOf ('ucbrowser') > -1 || ua.indexOf ('ucweb') > -1) return 'uc'
    if (ua.indexOf ('chrome') > -1) return 'chrome'
    if (ua.indexOf ('safari') > -1) return 'safari'
    if (ua.indexOf ('mozilla') > -1) return 'firefox'
    if (ua.indexOf ('ie') > -1) return 'ie'
    if (ua.indexOf ('opera') > -1) return 'opera'
    if (ua.indexOf ('kindle') > -1) return 'kindle'
    
    return 'unknown'
  }
  
  // 获取渠道信息
  function getChannel () {
    var retval = 0
    var reg = /(^|&)channel=(.*?)(&|$)/i
    var search = window.location.search.substr (1)
    var result = search.match (reg)
    
    if (result) retval = result[2]
    return retval
  }
  
  function getAppid () {
    return localStorage.getItem ('_dklog_appid') || ''
  }
  
  var biurl = '//state.duoku.com/bilog/1.jpg'
  var fixedParams = ''
  
  function sendLog (params, callback) {
    if (!params || typeof params != 'object') return
    
    var url = biurl + '?' + fixedParams
    var paramsStr = ''
    
    for (var prop in params) {
      if (params.hasOwnProperty (prop)) {
        if (prop === 'properties') {
          paramsStr += '&' + prop + '=' + base64.encode (JSON.stringify (params[prop]))
        } else {
          paramsStr += '&' + prop + '=' + params[prop]
        }
      }
    }
    
    url += paramsStr
    url += '&_=' + (new Date).getTime () // 加上时间戳
    
    // 发送统计到BI
    var img = new Image ()
    img.error = img.onload = function () {
      callback && callback ()
    }
    img.src = url
  }
  
  if(typeof(_dklog) === "undefined" ){
     throw error('_dklog 未定义 ')
     return
  }
  
  localStorage.setItem ('_dklog_appid', _dklog.appid)
  fixedParams = 'action=felog&appid=' + getAppid () + '&os=' + getOS () + '&browser=' + getBrowser () + '&cid=' + getChannel ()
  
  if(_dklog){
    
    while( _dklog.length >0 ){
      sendLog (_dklog.shift())
    }
    
    _dklog.push = function (params) {
      var t = setTimeout(function () {
        sendLog (params)
        clearTimeout(t)
        t = null
      },0)
    }
    
  }
}) ()
