import {
  getAll,
  addTag,
  deleteTag
} from '@/api/tag'

export const actions = {
  getAllTag() {
    return new Promise((resolve, reject) => {
      getAll().then(res => {
        resolve(res)
      })
    })
  },
  addTag({commit}, tag) {
    return new Promise((resolve, reject) => {
      addTag(tag).then(res => {
        resolve(res)
      })
    })
  },
  deleteTag({commit}, tagId) {
    return new Promise((resolve, reject) => {
      deleteTag(tagId).then(res => {
        resolve(res)
      })
    })
  }
}
