#!/usr/bin/env node

const program = require ('commander')
const chalk = require ('chalk')
const ora = require ('ora')
const fs = require ('fs')
const inquirer = require ('inquirer')
const shell = require ('shelljs')
const symbols = require ('log-symbols')
const download = require ('download-git-repo')
const child_process = require ('child_process')
const handlebars = require ('handlebars')
const path = require ('path')

const promptList = [{
  type: 'list',
  message: '请选择要创建的项目类型:',
  name: 'H5 Project',
  choices: [
    '多酷活动',
    '游戏官网',
    'H5 SDK'
  ],
  filter: function (val) { // 使用filter将回答变为小写
    return val.toLowerCase ()
  }
},
  {
    type: 'input',
    message: '设置一个(package.json)用户名:',
    name: 'name',
    default: 'admin' // 默认值
  },
  {
    type: 'input',
    message: '设置一个(package.json)描述:',
    name: 'description',
    default: 'description' // 默认值
  }
]

program.version ('1.0.0', '-v, --version').command ('create <name>').action (name => {
  inquirer.prompt (promptList).then (answers => {
    console.log ('正在下载模板\n')
    var val = ''
    for (let o in answers) {
      val = answers[o]
      break
    }
    const spinner = ora ('正在下载模板...\n')
    let tempUrl = ''
    let masterName = ''
    switch (val) {
      case '多酷活动':
        console.log (`开始下载${val}`)
        masterName = 'duoku-activity-front-master'
        tempUrl = 'http://gitlab.iduoku.cn/FE/duoku-activity-front-master.git'
        break
      case '游戏官网':
        console.log (`开始下载${val}`)
        masterName = 'duoku-gw-master'
        tempUrl = 'https://github.com/webtop1/duoku-gw-master.git'
        break
      case 'H5':
        masterName = 'duoku-H5-master'
        console.log (`开始下载${val}`)
        tempUrl = ''
        break
    }
    spinner.start ()
    child_process.exec ('git clone ' + tempUrl, function (err, stdout, stderr) {
      if (err) {
        spinner.fail ()
        console.log (symbols.error, chalk.red ('模板下载失败'))
      } else {
        spinner.succeed ()
        let dir = process.cwd()
        let orginPath = dir + `\\${masterName}`
        let desPath = dir + '\\' + name
        shell.mv (orginPath, desPath)
        const filename = `${desPath}/package.json`
        const meta = {
          name,
          description: answers.description,
          author: answers.author
        }
        if (fs.existsSync (filename)) {
          const content = fs.readFileSync (filename).toString ()
          let dt = JSON.parse (content)
          dt.name = '{{name}}'
          dt.description = '{{description}}'
          const result = handlebars.compile (JSON.stringify (dt, null, 2)) (meta)
          fs.writeFileSync (filename, result)
          console.log (symbols.success, chalk.green ('项目模板初始化完成'))
        } else {
          console.log (symbols.error, chalk.red (`${filename}不存在`))
        }
      }
    })
    
  })
})
program.parse (process.argv)