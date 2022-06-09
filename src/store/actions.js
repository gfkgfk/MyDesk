export default{
    setTokenAction(context,payload){
        setTimeout(() => {
            context.commit('setToken',payload)
        }, 2000);
    }


}