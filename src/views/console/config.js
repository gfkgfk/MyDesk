import config from '@/userconfig';
export default {
    router: {
        path: "/console",
        component: resolve => require(['@/views/console/consolepages/console'], resolve),
        redirect: '/console/consolemain',
        children: [
            {
                path: "/console/consolemain",
                component: resolve => require(['@/views/console/consolemain/consolemain'], resolve),
            }
        ]
    }
}