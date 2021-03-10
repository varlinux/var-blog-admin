import { login } from '@/api/user'
import { setSession } from '@/plugins/sessionStorage'
import SecretUtils from "@/utils/SecretUtils"

export const state = () => ({
  userInfo: {}
})

export const mutations = {
  SET_USER: (state, user) => {
    state.userInfo = user
  }
}

export const actions = {
  // user login
  login({ commit }, user) {
    const { username, password } = user
    const enData = SecretUtils.encrypt(username + process.env.VUE_APP_LOGIN_SECRET_KEY + password)
    return new Promise((resolve, reject) => {
      login({ data : enData }).then(res => {
        if (res._code === 200) {
          const { _data, _token } = res
          commit('SET_USER', _data[0])
          setSession(process.env.VUE_APP_TOKEN_KEY, _token)
        }
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
