/**
 * 设置本地sessionStorage
 * @param k
 * @param v
 */
export function setSession(k, v) {
    sessionStorage.setItem(k, v)
}

/**
 * 获取本地sessionStorage
 * @param k
 */
export function getSession(k) {
    return sessionStorage.getItem(k)
}

/**
 * 移除指定sessionStorage
 * @param k
 */
export function removeSession(k) {
    sessionStorage.removeItem(k)
}

/**
 * 删除所有的sessionStorage
 */
export function clearSession() {
    sessionStorage.clear()
}
