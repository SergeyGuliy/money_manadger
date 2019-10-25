import firebase from 'firebase/app'
export default {
  actions: {
    async createNewRecord ({ dispatch, commit }, formData) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`users/${uid}/records`).push(formData)
        if (formData.type === 'outcome') {
        }
        if (formData.type === 'income') {
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecords ({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const records = (await firebase.database().ref(`users/${uid}/records`).once('value')).val() || {}
        return Object.keys(records).map(key => ({ ...records[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
