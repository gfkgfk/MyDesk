import config from '@/userconfig';
export default{
    urls: {
        'test.test': {
            'type': 'GET',
            'real': '/test',
            'mockResponse': 'login/login.json', //the root dir is @/mock/
            'apiPrefix': '/local',
        },
        'test.test2': {
            'type': 'POST',
            'real': '/test2',
            'mockResponse': 'login/login.json', //the root dir is @/mock/
            'apiPrefix': '/local',
        }
    }
}