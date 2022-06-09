import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import createPersistedState from "vuex-persistedstate"
import SecureLS from 'secure-ls'
//sub module
import userStore from './user/store'; 

const StoreKey ='store' //vuex localStorage key
const ls = new SecureLS({ encodingType: '',isCompression: false }) //encoding vuex persisted config, encodingType: base64/aes/des/rabbit/rc4/''
Vue.use(Vuex)


export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        userStore
    },
    plugins: [
        createPersistedState({ //vuex persisted plugin
            key: StoreKey,
            // storage: window.localStorage,
            storage: { // Custom storage storage method
                getItem: key => ls.get(key),
                setItem: (key, value) => ls.set(key, value),
                removeItem: key => ls.remove(key)
            },
            reducer (val) {
                return {
                    token: val.token, //Only store token in state.js
                }
            }
        })
    ]
})