import config from '@/userconfig';
export default{
    urls: {
        'login.login': {
            'type': 'GET',
            'real': '/login',
            'mockResponse': 'login/login.json', //the root dir is @/mock/
            'apiPrefix': config.apiPrefix,
        },
        'login.logout': {
            'type': 'POST',
            'real': '/logout',
            'mockResponse': 'login/login.json', //the root dir is @/mock/
            'apiPrefix': config.apiPrefix,
        }
    }
}