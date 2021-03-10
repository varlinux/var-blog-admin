import request from "@/plugins/request";

export function getTasks(data) {
  return request({
    url: '/api/task/get',
    method: 'post',
    data
  })
}
export function insertTask(data) {
  return request({
    url: '/api/task/insert',
    method: 'post',
    data
  })
}

export function updateTask(data) {
  return request({
    url: '/api/task/update',
    method: 'put',
    data
  })
}

export function deleteTask(id) {
  return request({
    url: '/api/task/delete/' + id,
    method: 'delete'
  })
}
