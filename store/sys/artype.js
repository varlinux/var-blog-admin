import {
  getArtypes,
  insertArtype,
  updateArtype,
  deleteArtype
} from '@/api/sys/artype'

export const actions = {
  getArtypes({commit} ,data) {
    return new Promise((resolve) => {
      getArtypes(data).then(res => {
        resolve(res)
      })
    })
  },
  insertArtype({commit} ,data) {
    return new Promise(resolve => {
      insertArtype(data).then(res => {
        resolve(res)
      })
    })
  },
  updateArtype({commit}, data) {
    return new Promise(resolve => {
      updateArtype(data).then(res => {
        resolve(res)
      })
    })
  },
  deleteArtype({commit}, id) {
    return new Promise(resolve => {
      deleteArtype(id).then(res => {
        resolve(res)
      })
    })
  }
}
