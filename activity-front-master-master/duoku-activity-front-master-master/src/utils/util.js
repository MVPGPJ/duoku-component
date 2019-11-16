// 将Date类型格式化
export function formatDateWithDate (date, fmt) {
  let obj = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var key in obj) {
    if (new RegExp('(' + key + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (obj[key]) : (('00' + obj[key]).substr(('' + obj[key]).length)))
    }
  }
  return fmt
}
// 将date字符串格式化
export function formatDateWithDateStr (dateStr, fmt) {
  let date = new Date(dateStr)
  let obj = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var key in obj) {
    if (new RegExp('(' + key + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (obj[key]) : (('00' + obj[key]).substr(('' + obj[key]).length)))
    }
  }
  return fmt
}

/**
   * 动态加载JS
   * @param {string} url 脚本地址
   * @param {function} callback  回调函数
   */
export function dynamicLoadJs (url, callback) {
  var head = document.getElementsByTagName('head')[0]
  var script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = url
  if (typeof (callback) === 'function') {
    script.onload = script.onreadystatechange = function () {
      if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
        callback()
        script.onload = script.onreadystatechange = null
      }
    }
  }
  head.appendChild(script)
}

export function sysIsIOS () {
  let reg = [
    /(Android).*/i,
    /(iPhone|iPad|iPod|iOS).*/i,
    /(windows(.*|\s*)phone).*/i
  ]
  return reg[1].test((navigator.userAgent).toLowerCase())
}

export function deepClone (source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

export function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

export function html2Text (val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
export function getByteLen (val) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    /* eslint-disable no-control-regex */
    if (val[i].match(/[^\x00-\xff]/ig) != null) {
      len += 1
    } else { len += 0.5 }
  }
  return Math.floor(len)
}
