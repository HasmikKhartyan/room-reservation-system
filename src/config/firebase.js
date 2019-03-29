import * as firebase from 'firebase';

const FirebaseConfig = {
    apiKey: process.env.REACT_APP_GOOGLE_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_GOOGLE_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_GOOGLE_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_GOOGLE_FIREBASE_PROJCECT_ID,
    storageBucket: process.env.REACT_APP_GOOGLE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_GOOGLE_FIREBASE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(FirebaseConfig);

export const databaseRef = firebase.database().ref('reservation');
// export const todosRef = databaseRef.child('reservation');
export const authRef = firebase.auth();
// export const provider = new firebase.auth.GoogleAuthProvider();
