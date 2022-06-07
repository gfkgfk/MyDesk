import login from './login/login.json';
const Mock = require('mockjs')
// mock api base url
// const mockPathBase = /\/api\/mock/
function buildMockPath (subPath) {
    var reg = new RegExp("/api/mock/" + subPath);
    return reg
}

Mock.mock(buildMockPath('login'), login) // login mock data