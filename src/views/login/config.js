import config from '@/userconfig';
export default {
    router: {
        path: "/login",
        component: resolve => require(['@/views/login/loginpages/login'], resolve),
        children: [
            {
                path: "/login/loginchild",
                component: resolve => require(['@/views/login/loginchildpages/loginchild'], resolve),
            }
        ]
    }
}