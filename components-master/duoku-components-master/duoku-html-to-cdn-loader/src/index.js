var loaderUtils = require ('loader-utils')

module.exports = function (fileContent) {
  return fileContent;
  //请求参数，exclude:排除的文件
  console.log(fileContent);
  var query = {}
  fileContent = JSON.stringify (fileContent)
  return "module.exports = "+replaceSrc(fileContent, query.exclude);
}
/**
 * replace path
 * */
function replaceSrc (fileContent, exclude) {
  fileContent = fileContent.replace (/((\<img[^\<\>]*? src)|(\<link[^\<\>]*? href))[\s]*=[\s]*\\?[\"\']?[^\'\"\<\>\+]+?\\?[\'\"][^\<\>]*?[/]?\>/ig, function (str) {
    
    var reg = /\s+((src)|(href))[\s]*=[\s]*\\?[\'\"][^\"\']+\\?[\'\"]/i
    var regResult = reg.exec (str)
    
    if (!regResult) return str
    var attrName = /\w+\s*=\s*/.exec (regResult[0])[0].replace (/\s*=\s*$/, '')
    var imgUrl = regResult[0].replace (/\w+\s*=\s*/, '').replace (/[\\\'\"]/g, '')
    if (!imgUrl) return str // 避免空src引起编译失败
    if (/^(http(s?):)?\/\//.test (imgUrl)) return str // 绝对路径的图片不处理
    if (!/\.(jpg|jpeg|png|gif|svg|webp)/i.test (imgUrl)) return str // 非静态图片不处理
    if (exclude && imgUrl.indexOf (exclude) != -1) return str // 不处理被排除的
    imgUrl = imgUrl.replace (/^\s*/g, '') // 去掉左边空格
    
    if (!(/^[\.\/]/).test (imgUrl)) {
      imgUrl = './' + imgUrl
    }
    var res = str.replace (reg, ' ' + attrName + '="+JSON.stringify(require(' + JSON.stringify (imgUrl) + '))+"')
    //var res = str.replace (reg, ' ' + attrName + '=' + JSON.stringify (imgUrl) )
    
    return res
  })
  console.log('=============')
  return fileContent;
}

/**
 * compress img and generate new img name by file hash value
 */
function compress () {

}

function uploadCDN () {
  
}