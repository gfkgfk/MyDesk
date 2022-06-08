/**
 * Mock config
 */
var urls = require('@/api/api') 
const Mock = require('mockjs')
// mock api base url
// const mockPathBase = /\/api\/mock/
export const mockPathBase = "/api/mock"

function buildMockPath (subPath) {
    var reg = new RegExp(mockPathBase + subPath);
    return reg
}

// collect mock config in api config file and enable mock data
for (const key in urls.default) {
    let url = urls.default[key].real
    let mockResponse = urls.default[key].mockResponse
    if(!url||!mockResponse){
        continue
    }
    try {
        let mockResponseJson = require('./'+mockResponse)
        Mock.mock(buildMockPath(url), mockResponseJson)
    } catch (error) {
        console.log('mock mockResponseJson import error');
    }
}