import firebase from "firebase/app";

export default {
  state: {
    info: {

    }
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    }
  },
  actions: {
    // обновляем данные пользователя
    async updateInfo ({dispatch, commit, getters}, toUpdate) {
      try {
        
        const uid = await dispatch('getUid');
        console.log(getters.info)
        const updateData = {...getters.info, ...toUpdate}
        console.log("test")
        console.log(updateData)
        await firebase.database().ref(`/users/${uid}/info`).update(updateData);
        commit("setInfo", updateData);
      } catch (e) {
        commit("setError", e);
        throw e
      }
    },
    // получаем данные пользователя
    async fetchInfo ({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid');
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val();
        commit('setInfo', info) 
      } catch (e) {
        commit("setError", e);
        throw e
      }
    }
  },
  getters: {
    info: s => s.info
  }
}
