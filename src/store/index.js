import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);
//准备actions对象——响应组件中用户的动作
const actions = {
    jia(context, value) {
        console.log('actions中的jia被调用了')
        console.log('context', context)
        console.log('value', value)
        context.commit("JIA", value);
    }
};
//准备mutations对象——修改state中的数据
const mutations = {
    JIA(state, value) {
        console.log('mutations中的JIA被调用了')
        console.log('state', state)
        console.log('value', value)
        state.sum += value
    }
};
//准备state对象——保存具体的数据
const state = {
    sum: 0
};

export default new Vuex.Store({
    actions,
    mutations,
    state
})