import Vue from 'vue'
import Router from 'vue-router'
// import login from '@/views/login/login'
// import main from '@/views/main/main'
import login from '@/views/login/config.js'
import main from '@/views/main/config.js'
import test from '@/views/test/test'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/404',
            name: '404',
            component: resolve => require(['@/components/common/404'], resolve),
        },
        main.router,
        login.router,
        {
            path: '/test',
            name: 'test',
            component: resolve => require(['@/views/test/test'], resolve)
        }
    ]
})
