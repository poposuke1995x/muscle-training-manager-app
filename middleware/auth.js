import auth from '../plugins/firebase'

const middleware = ({ route, store, redirect }) => {

  auth.onAuthStateChanged((user) => {
    if (user) {
      user.getIdToken().then(token => {
        store.dispatch('setToken', token)
      })
    }
    if (!user && route.name !== 'login') redirect('/login')
  })
}

export default middleware
