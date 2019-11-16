#使用说明

##js引入方式

    var _dklog = _dklog || [];
    _dklog.appid = 'activity_test';
    (function() {
      var dk = document.createElement("script");
      dk.src = "//ycimg.m.duoku.com/cimages/img/promo/js/sdk/duoku-log.min.1.0.2.js";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(dk, s);
    })();
    
# 使用方法一    
        _dklog.push({
          type: 'pv',
          page:'首页'
        })


## _dklog.push 参数说明
http://doc.iduoku.cn/pages/viewpage.action?pageId=22551646&src=search


#duoku-log-yuyue.min 为预约项目定制
#https://github.com/mishoo/UglifyJS2
#全局安装uglify
npm install uglify-js -g

#压缩方法
uglifyjs .\src\duoku-log-yuyue.js -c  -o .\dist\duoku-log-post.min.1.0.js


