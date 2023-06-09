import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDfmpYIk7Hk2oMFSe7PrnJgzZNIjbgEhFE",
    authDomain: "ecomm-db-5bd63.firebaseapp.com",
    projectId: "ecomm-db-5bd63",
    storageBucket: "ecomm-db-5bd63.appspot.com",
    messagingSenderId: "241106278148",
    appId: "1:241106278148:web:ca4556336ba1d657cca251",
    measurementId: "G-F80WJLB623"
  };


  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
   
const userRef = firestore.doc(`users/${userAuth.uid}`);
const snapShot = await userRef.get();

if(!snapShot.exists){
    const { displayName, email} = userAuth;
    const createdAt = new Date();

    try {
        await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
        })
    } catch (error) {
        console.log(error.message);
    }
}

return userRef;
    // console.log(snapShot);
}
  
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;