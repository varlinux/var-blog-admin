/**
 * @param _arr 校验数组
 * @param _t_key 对象数组key
 * @param _t_val 检查对象
 * @returns {boolean} 存在返回true
 */
export function isExistInArray(_arr, _t_key, _t_val) {
    console.log(`ArrayUtils : `, _arr, _t_key, _t_val)
    return _arr.some(item => {
        return item[_t_key] === _t_val
    })
}