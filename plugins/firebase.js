import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {

};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const authProviders = {
  Email: firebase.auth.EmailAuthProvider.PROVIDER_ID,
  // Google: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  // Facebook: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  // Twitter: firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  // Github: firebase.auth.GithubAuthProvider.PROVIDER_ID
};

const auth = firebase.auth();
export default auth
