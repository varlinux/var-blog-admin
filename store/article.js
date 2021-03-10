import {
    getAll,
    addArticle,
    deleteArticle,
    updateArticle,
} from '@/api/article'

export const actions = {
    getAllArticle() {
        return new Promise((resolve, reject) => {
            getAll().then(res => {
                resolve(res)
            })
        })
    },
    addArticle({commit}, data) {
        return new Promise((resolve, reject) => {
            addArticle(data).then(res => {
                resolve(res)
            })
        })
    },
    deleteArticle({commit}, articleId) {
        return new Promise(resolve => {
            deleteArticle(articleId).then(res => {
                resolve(res)
            })
        })
    },
    updateArticle({commit}, data) {
        return new Promise(resolve => {
            updateArticle(data).then(res => {
                resolve(res)
            })
        })
    }
}
