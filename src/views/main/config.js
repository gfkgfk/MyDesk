import config from '@/userconfig';
export default {
    router: {
        path: "/main",
        component: resolve => require(['@/views/main/mainpages/main'], resolve),
        children: [
            {
                path: "/main/mainchild",
                component: resolve => require(['@/views/main/mainchildpages/mainchild'], resolve),
            }
        ]
    },
    urls: {
        'main.getUserinfo': {
            'type': 'POST',
            'real': '/login',
            'mock': '../../static/mock/login/user_login.json',
            'apiPrefix': config.apiPrefix,
        },
        'info.getMessage': {
            'type': 'POST',
            'real': '/login',
            'mock': '../../static/mock/login/user_login.json',
            'apiPrefix': config.apiPrefix,
        },
    }
}