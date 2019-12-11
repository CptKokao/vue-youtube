import firebase from "firebase/app";
 

export default {
  actions: {
    // обновляем категории
    async updateCategory({commit, dispatch}, {id, name, limit}) {

      try {
        const uid = await dispatch('getUid');
        const categories = await firebase.database().ref(`/users/${uid}/categories`).child(id).update({name, limit}); 
      } catch (e) { 
        commit('setError', e)
        throw e;
      }
    },
    // получаем категории
    async fetchCategories({commit, dispatch}) {

      try {
        const uid = await dispatch('getUid');
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {};
        const cats = [];
        Object.keys(categories).map(function(key){
          cats.push({
            name: categories[key].name,
            limit: categories[key].limit,
            id: key
          })
        })
        return cats;
      } catch (e) { 
        commit('setError', e)
        throw e;
      }
    },
    // создаем категории
    async createCategory({commit, dispatch}, {name, limit}) {

      try {
        const uid = await dispatch('getUid');
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({name, limit});
        return {name, limit, id: category.key};
      } catch (e) { 
        commit('setError', e)
        throw e;
      }
    }
  }
}
