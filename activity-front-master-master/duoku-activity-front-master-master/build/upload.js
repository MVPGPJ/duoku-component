/**
 * 发布静态文件到CDN上，并且修改HTML引用文件为CDN地址
 */

const fs = require('fs');
const emitter = require('events');
const Client = require('ftp');
const c = new Client();

class MyEmitter extends emitter {}
const EventEmitter = new MyEmitter();

const bucket = 'source';
const project = 'test'; // 项目名称
var projectPath = `${bucket}/${project}/`;
// static 静态资源目录
var staticPath = `${projectPath}static/`
//css 文件夹目录
var cssPath =  `${staticPath}css/`;
//img 文件夹目录
var imgPath = `${staticPath}img/`;
//js 文件夹目录
var jsPath =  `${staticPath}js/`;

const FTP_CONFIG = {
    host: '192.168.1.170', port: 2121,
    user: 'hanbingfeng', password: 'IDofa()d#@$fdg'
};
const uploadList = [];

function travel(type) {
    const files = fs.readdirSync(`./dist/static/${type}`);
    for (let i = 0; i < files.length; i += 1) {
        uploadList.push({
            name: `./static/${type}/${files[i]}`,
            path: `./dist/static/${type}/${files[i]}`
        });
    }
}

function mkdir(path, cb) {
    c.mkdir(path, function (err) {
        if (err) {
            console.log(err.message)
        } else {
            console.log(`created path ${path}`)
        }
        cb();
    })
}

travel('css');
travel('js');
travel('img');

c.on('ready', () => {
    //create project path
    mkdir(projectPath, function () {
        EventEmitter.emit('PROJECT_PATH_CREATED')
    })

    // create project static path
    EventEmitter.on('PROJECT_PATH_CREATED', function () {
        mkdir(staticPath, function () {
            EventEmitter.emit('STATIC_PATH_CREATED')
        })
    })

    // create css path
    EventEmitter.on('STATIC_PATH_CREATED', function () {
        mkdir(cssPath, function () {
            EventEmitter.emit('CSS_PATH_CREATED')
        })
    })

    // create image path
    EventEmitter.on('CSS_PATH_CREATED', function () {
        mkdir(imgPath, function () {
            EventEmitter.emit('IMG_PATH_CREATED')
        })
    })

    // create js path
    EventEmitter.on('IMG_PATH_CREATED', function () {
        mkdir(jsPath, function () {
            EventEmitter.emit('JS_PATH_CREATED')
        })
    })

    //update static resource file
    EventEmitter.on('JS_PATH_CREATED', function () {
        var count = 0;
        for (let i = 0; i < uploadList.length; i += 1) {
            c.put(uploadList[i].path, `${bucket}/${project}/${uploadList[i].name}`, (err) => {
                count ++
                if (!err) {
                    console.log(`upload success ${uploadList[i].name}`)
                }else  if (err.message.indexOf('Overwrite permission denied')) {
                    console.log(`文件 ${uploadList[i].name}已存在，不给予上传!`);
                } else if(err){
                    console.log(err.message);
                }
                if(count == uploadList.length){
                    console.log('upload complete!')
                }
            });
        }
    })
});
c.connect(FTP_CONFIG);
