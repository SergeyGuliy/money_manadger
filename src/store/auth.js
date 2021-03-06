import firebase from 'firebase/app'

export default {
  actions: {
    async login ({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async logout ({ commit }) {
      await firebase.auth().signOut()
      commit('clearInfo')
    },
    async registration ({ dispatch, commit }, { email, password, name, agreement }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .set({
            bill: 0,
            name: name
          })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    getUid () {
      const user = firebase.auth().currentUser
      if (user) {
        return user.uid
      } else {
        null
      }
    }
  }
}
