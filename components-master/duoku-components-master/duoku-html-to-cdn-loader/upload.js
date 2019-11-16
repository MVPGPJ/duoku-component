/**
 * 发布静态文件到CDN上，并且修改HTML引用文件为CDN地址
 */

const fs = require('fs');
const Client = require('ftp');
const c = new Client();

const bucket = 'gametemplate';   // CDN桶
const project = 'h5sdk'; // 项目名称

const FTP_CONFIG = {
  host: '192.168.1.170', port: 2121,
  user: 'hanbingfeng', password: 'IDofa()d#@$fdg'
};

const uploadList = [];


function travel(type) {
  const files = fs.readdirSync(`./dist/${type}`);

  for(let i = 0; i < files.length; i += 1) {
    // TODO 上传文件到CDN
    uploadList.push({
      name: `${type}/${files[i]}`,
      path: `./dist/${type}/${files[i]}`
    });
  }
}

travel('css');
travel('js');
travel('img');

c.on('ready', () => {
  for(let i = 0; i < uploadList.length; i += 1) {
    c.put(uploadList[i].path, `${bucket}/${project}/${uploadList[i].name}`, (err) => {
      if(!err) return;
      if(err.message.indexOf('Overwrite permission denied')) {
        console.log(`文件${uploadList[i].name}已存在，不给予上传!`);
      } else {
        console.log(err);
      }
    });
  }
  c.end();
});
c.connect(FTP_CONFIG);
