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
    },
    urls: {
        'login.login': {
            'type': 'POST',
            'real': '/login',
            'mock': '../../static/mock/login/user_login.json',
            'apiPrefix': config.apiPrefix,
        },
        'login.logout': {
            'type': 'POST',
            'real': '/login',
            'mock': '../../static/mock/login/user_login.json',
            'apiPrefix': config.apiPrefix,
        },
    }
}