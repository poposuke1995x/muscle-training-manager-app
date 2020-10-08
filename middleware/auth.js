import auth from '../plugins/firebase'

const middleware = ({ route, store, redirect }) => {
  auth.onAuthStateChanged((user) => {
    if (!user && route.name !== 'login') redirect('/login')
  })
}
export default middleware
