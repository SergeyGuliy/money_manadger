import firebase from 'firebase/app'
export default {
  actions: {
    async fetchCategories ({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const categories = (await firebase.database().ref(`users/${uid}/categories`).once('value')).val() || {}
        const cats = []
        Object.keys(categories).forEach(function (key) {
          cats.push({
            title: categories[key].title,
            moneyAmount: categories[key].moneyAmount,
            id: key
          })
        })
        return cats
      } catch (e) {
        commit('setError', e)
      }
    },
    async fetchCategoryById ({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getUid')
        const category = (await firebase.database().ref(`users/${uid}/categories`).child(id).once('value')).val() || {}
        return { ...category, id: id }
      } catch (e) {
        commit('setError', e)
      }
    },
    async createCategory ({ dispatch, commit }, { title, moneyAmount }) {
      try {
        const uid = await dispatch('getUid')
        const category = await firebase.database().ref(`users/${uid}/categories`).push({ title, moneyAmount })
        return { title, moneyAmount, id: category.key }
      } catch (e) {
        commit('setError', e)
      }
    },
    async updateCategory ({ dispatch, commit }, { title, moneyAmount, id }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`users/${uid}/categories`).child(id).update({ title, moneyAmount })
      } catch (e) {
        commit('setError', e)
      }
    },
    async deleteCategory ({ dispatch, commit }, categoryId) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`users/${uid}/categories`).child(categoryId).remove()
      } catch (e) {
        commit('setError', e)
      }
    }
  }
}
