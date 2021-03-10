import request from "@/plugins/request";

export function getArtypes(data) {
  return request({
    url: '/api/artype/get',
    method: 'post',
    data
  })
}
export function insertArtype(data) {
  return request({
    url: '/api/artype/insert',
    method: 'post',
    data
  })
}

export function updateArtype(data) {
  return request({
    url: '/api/artype/update',
    method: 'put',
    data
  })
}

export function deleteArtype(id) {
  return request({
    url: '/api/artype/delete/' + id,
    method: 'delete'
  })
}
