/**
 * Create by .
 * User: liutinghai
 * Date: 2018/7/30
 * Time: 10:42
 */
var phpcmsPlugin = require ('./src/phpcms-plugin')


var options = {
  receiver: 'http://game.mytasks.cn:8080/fis-upload/receiver.php', // 开发服务端文件上传接口
  token: 'token',
  from:'E:\\study\\webpack\\webpack-test\\dist\\', //需要上传的文档目录
  to: '/home/work/www/guanwang_dev/phpcms/templates/test/content/',  // 开发上传文件目录
  phpcmsBaseurl:'http://gw-admin-dev.iduoku.cn:8080/',
  phpcmsUsername:'admin',
  phpcmsPassword:'duoku2012',
  phpcmsCode:'1234',//此处不用修改，phpcms已经开启后门，可以通过另外一种方式绕过验证码
  siteId:'23' //对应站点id, 在管理后台选择对应站点时，在浏览器状态栏上可以看到对应的值
}

new phpcmsPlugin(options).apply();