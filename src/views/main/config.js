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
    }
}