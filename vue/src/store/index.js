import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    curuser: null,
    money: 0,
    islogin: "登录",
    userName: "user",
  },
  mutations: {

    addUser(state, user) {
      state.curuser = user
    },

    removeUser(state) {
      state.curuser = null
    },

    setMoney(state, money) {
      state.money = money
    },

    setLogin(state, msg) {
      state.islogin = msg
    },

    setUserName(state, msg) {
      state.userName = msg;
    },

    delChooseModuleAll(state, moduleNull) {
      state.chooseModule = moduleNull  // 清空
    }
  },
  actions: {

  },
  modules: {

  }

})
