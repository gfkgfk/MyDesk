/**
 * search all api.js config file in current folder and export the set
 */
const modulesFiles = require.context('./', true, /.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^.\/(.*)\.js/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})

var urlslist = {};
for (let key in modules) {
    if (modules[key] && modules[key].urls) {
        urlslist = Object.assign(urlslist, modules[key].urls)
    }
}
export default urlslist