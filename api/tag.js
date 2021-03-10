import request from '@/plugins/request'

/**
 * 获得所有标签
 * @returns {*}
 */
export function getAll() {
    return request({
        url: '/api/tags/getAll',
        type: 'get'
    })
}

/**
 * 插入标签
 * @param data
 * @returns {*}
 */
export function addTag(data) {
    return request({
        url: '/api/tags/insert',
        method: 'post',
        data: data
    })
}

/**
 * 删除标签
 * @param articleId 标签编号
 * @returns {*}
 */
export function deleteTag(tagId) {
    return request({
        url: '/api/tags/delete/' + tagId,
        method: 'delete'
    })
}

/**
 * 更新标签
 * @param data 标签表单
 * @returns {*}
 */
export function updateTag(data) {
    return request({
        url: '/api/tags/update',
        method: 'put',
        data: data
    })
}
