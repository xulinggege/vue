import Vuex from '../../../node_modules/vuex/dist/vuex.common.js'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        gridNumber:12,
    },
    mutations:{
        setGridNumber(state, number){
            state.gridNumber = number;
        }
    },
    actions:{

    },
    getters:{
        totalPrice(){
            return state.gridNumber * 2;
        }
    }
})