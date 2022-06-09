// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './utils/axios';
import store from './store/store'
import _ from 'lodash';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

if(Vue.config.mockMode){ // import mock mode
    require("./mock/mock")
    console.log('mock mode enable');
}


import Vuex from 'vuex';
 
Vue.use(Vuex)
Vue.use(ElementUI);

Vue.prototype.$lodash = _;
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
