import request from '@/plugins/request'

/**
 * 登录方法
 * 返回数据为用户的信息 和 一个token，该token存储在服务端session中
 * @param data 传入的data为账号和密码加密后的base64字符
 */
export function login(data) {
    return request({
        url: '/admin/login',
        method: 'post',
        data
    })
}
