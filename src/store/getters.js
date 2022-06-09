export default {
    getToken (state) {
        return (payload) => {
            console.log('getters payload:', payload);
            return state.token
        }
    }
}