import request from '@/plugins/request'

/**
 * 添加图片
 * @param data
 * @returns {*}
 */
export function addImageToServer(data) {
    return request({
        url: '/api/img/insert',
        method: 'post',
        data: data,
        headers: {'Content-Type': 'multipart/form-data'}
    })
}

export function deleteImg(imgName) {
    return request({
        url: '/api/img/delete/' + imgName,
        method: 'delete'
    })
}

export function getAllImg() {
    return request({
        url: '/api/img/getAll',
        method: 'get'
    })
}
