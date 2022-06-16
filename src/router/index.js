import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login/config.js'
import main from '@/views/main/config.js'
import heart from '@/views/heart/config.js'
import console from '@/views/console/config.js'
import test from '@/views/test/test'



// to avoid redundant to the same locaiton log
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/main',
        },
        {
            path: '/404',
            name: '404',
            component: resolve => require(['@/components/common/404'], resolve),
        },
        main.router,
        login.router,
        heart.router,
        console.router,
        {
            path: '/test',
            name: 'test',
            component: resolve => require(['@/views/test/test'], resolve)
        },
        {
            path: '*',
            redirect: '/404',
        },
    ]
})
