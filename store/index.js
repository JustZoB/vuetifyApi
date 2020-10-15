import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = () =>
new Vuex.Store({
    state: {
        users: null
    },
    actions: {
        async GET_USERS() {
            let res = await this.$axios.get('http://jsonplaceholder.typicode.com/posts')
            return res;
        }
    }
})

export default store
