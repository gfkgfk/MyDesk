import config from '@/userconfig';
export default {
    router: {
        path: "/heart",
        component: resolve => require(['@/views/heart/heartpages/heart'], resolve),
    }
}