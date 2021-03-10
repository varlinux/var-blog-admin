import {
  getIndexMenu,
  insertMenu,
  updateMenu,
  deleteMenu
} from '@/api/sys/menu'

export const actions = {
  getIndexMenu() {
    return new Promise((resolve) => {
      getIndexMenu().then(res => {
        resolve(res)
      })
    })
  },
  insertMenu({commit} ,data) {
    return new Promise(resolve => {
      insertMenu(data).then(res => {
        resolve(res)
      })
    })
  },
  updateMenu({commit}, data) {
    return new Promise(resolve => {
      updateMenu(data).then(res => {
        resolve(res)
      })
    })
  },
  deleteMenu({commit}, id) {
    return new Promise(resolve => {
      deleteMenu(id).then(res => {
        resolve(res)
      })
    })
  }
}
