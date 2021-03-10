import {getSession} from './sessionStorage' // get token from cookie

const whiteList = ['/login'] // no redirect whitelist

export default ({ app }) => {

  app.router.beforeEach(async (to, from, next) => {

    // determine whether the user has logged in
    const hasToken = getSession(process.env.VUE_APP_TOKEN_KEY)

    if (hasToken) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({path: '/home'})
        } else {
            next()
        }
    } else {
        /* has no token*/

        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login`)
        }
    }
  })

}
