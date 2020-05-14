import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config={
  apiKey: "AIzaSyA75Q-mTEiTsBfn-jRUeHPH2J2GykgNBcg",
  authDomain: "fashion-db-2b95e.firebaseapp.com",
  databaseURL: "https://fashion-db-2b95e.firebaseio.com",
  projectId: "fashion-db-2b95e",
  storageBucket: "fashion-db-2b95e.appspot.com",
  messagingSenderId: "637896120165",
  appId: "1:637896120165:web:d5811dcf634a8c5ee1738c",
  measurementId: "G-JTBP2P73G6"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = ()=> auth.signInWithPopup(provider);

export default firebase;