import {
  addImageToServer,
  deleteImg,
  getAllImg
} from '@/api/img'

export const actions = {
  addImageToServer({commit}, data) {
    return new Promise(resolve => {
      addImageToServer(data).then(res => {
        resolve(res)
      })
    })
  },
  deleteImg({commit}, imgName) {
    return new Promise(resolve => {
      deleteImg(imgName).then(res => {
        resolve(res)
      })
    })
  },
  getAllImg({commit}) {
    return new Promise(resolve => {
      getAllImg().then(res => {
        resolve(res)
      })
    })
  }
}
