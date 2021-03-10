import request from '@/plugins/request'

/**
 * 获取文章列表
 */
export function getAll() {
    return request({
        url: '/api/atcs/getAll',
        method: 'get'
    })
}

/**
 * 插入文章
 * @param data
 * @returns {*}
 */
export function addArticle(data) {
    return request({
        url: '/api/atcs/insert',
        method: 'post',
        data: data
    })
}

/**
 * 删除文章
 * @param articleId 文章编号
 * @returns {*}
 */
export function deleteArticle(articleId) {
    return request({
        url: '/api/atcs/delete/' + articleId,
        method: 'delete'
    })
}

/**
 * 更新文章
 * @param data 文章表单
 * @returns {*}
 */
export function updateArticle(data) {
    return request({
        url: '/api/atcs/update',
        method: 'put',
        data: data
    })
}
