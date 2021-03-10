import request from "@/plugins/request";

export function getIndexMenu() {
  return request({
    url: '/api/menu/get/1',
    method: 'get'
  })
}
export function insertMenu(data) {
  return request({
    url: '/api/menu/insert',
    method: 'post',
    data
  })
}

export function updateMenu(data) {
  return request({
    url: '/api/menu/update',
    method: 'put',
    data
  })
}

export function deleteMenu(id) {
  return request({
    url: '/api/menu/delete/' + id,
    method: 'delete'
  })
}
