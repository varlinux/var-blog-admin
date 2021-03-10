import {
  getTasks,
  insertTask,
  updateTask,
  deleteTask
} from '@/api/sys/task'

export const actions = {
  getTasks({commit} ,data) {
    return new Promise((resolve) => {
      getTasks(data).then(res => {
        resolve(res)
      })
    })
  },
  insertTask({commit} ,data) {
    return new Promise(resolve => {
      insertTask(data).then(res => {
        resolve(res)
      })
    })
  },
  updateTask({commit}, data) {
    return new Promise(resolve => {
      updateTask(data).then(res => {
        resolve(res)
      })
    })
  },
  deleteTask({commit}, id) {
    return new Promise(resolve => {
      deleteTask(id).then(res => {
        resolve(res)
      })
    })
  }
}
