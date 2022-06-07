export default {
    getUserName(state, getters, rootState) {
        console.log(getters); // getters attributes
        // rootState ---> root store state（outside store state）
        return state.userName;
    }
}