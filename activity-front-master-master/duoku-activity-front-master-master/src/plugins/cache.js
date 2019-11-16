/**
 * Vue缓存插件，封装了LocalStorage的使用
 */
const CACHE_KEY = 'SUMMER'

function set (key, value) {
  let cache = window.localStorage[CACHE_KEY]
  if (!cache) cache = {}
  else cache = JSON.parse(cache)

  cache[key] = value
  window.localStorage[CACHE_KEY] = JSON.stringify(cache)
}

function get (key) {
  let cache = window.localStorage[CACHE_KEY]
  if (!cache) return

  cache = JSON.parse(cache)
  return cache[key]
}

function del (key) {
  let cache = window.localStorage[CACHE_KEY]
  if (!cache) return

  cache = JSON.parse(cache)
  delete cache[key]
  window.localStorage[CACHE_KEY] = JSON.stringify(cache)
}

export default {
  install (Vue) {
    Vue.prototype.$cache = { set, get, del }
  }
}
