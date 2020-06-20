import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  /*const collectionRef = firestore.collection('users');
*/
  const snapShot = await userRef.get();
  /*const collectionSnapshot = await collectionRef.get();
  console.log({ collection: collectionSnapshot.docs.map(doc => doc.data()) });
*/
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  // The batch is used here to make sure that all the data is pushed to the firestore 
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    // We will keep the .doc() empty so as the firebase can set it for us which is unique
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  return await batch.commit()
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title, items
    }
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;