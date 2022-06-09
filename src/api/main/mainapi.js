import config from '@/userconfig';
export default{
    urls: {
        'main.getUserinfo': {
            'type': 'POST',
            'real': '/login',
            'mockResponse': 'common/success.json', //the root dir is @/mock/
            'apiPrefix': config.apiPrefix,
        },
        'main.getMessage': {
            'type': 'POST',
            'real': '/login',
            'mockResponse': 'common/success.json', //the root dir is @/mock/
            'apiPrefix': config.apiPrefix,
        },
    }
}