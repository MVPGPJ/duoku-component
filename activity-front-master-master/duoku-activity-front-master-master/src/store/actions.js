// 异步更新 state 中的数据
import {
  getUserInfo
} from '@/api/index'

export default {
  USER_INFO: ({ commit }) => {
    getUserInfo()
      .then(data => {
        if (data.code > 0) {
          // console.log(data)
          let mData = data.data
          data.data.dateList.map((date, index) => {
            if (mData.dateTime === date) {
              mData.currentDay = index
            }
          })
          commit('USER_INFO', data.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
