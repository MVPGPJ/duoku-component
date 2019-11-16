import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import 'normalize.css'
import Cache from './plugins/cache'
import Touch from '@/utils/touch-event'

Vue.config.productionTip = false
Vue.use(Cache)
Vue.use(Touch)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
