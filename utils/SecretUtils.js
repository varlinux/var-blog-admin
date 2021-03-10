export default class SecretUtils {
    /**
     * 加密
     * @param str
     */
    static encrypt(str) {
        return btoa(str)
    }

    /**
     * 解密
     * @param str
     */
    static decode(str) {
        return atob(str)
    }
}