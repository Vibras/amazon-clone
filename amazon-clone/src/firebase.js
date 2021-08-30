import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBSeVn9slPX4lFdxDGb1YLdzbFr7lb7j7c",
    authDomain: "clone-d53f0.firebaseapp.com",
    projectId: "clone-d53f0",
    storageBucket: "clone-d53f0.appspot.com",
    messagingSenderId: "451758388759",
    appId: "1:451758388759:web:dd0ca6c814285b83314e52"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
