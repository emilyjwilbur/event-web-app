import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAJKD6-wlcmHwRzD2HhxkKNQdrt4BJvhG0",
    authDomain: "eventspace-a2198.firebaseapp.com",
    projectId: "eventspace-a2198",
    storageBucket: "eventspace-a2198.appspot.com",
    messagingSenderId: "1004675596430",
    appId: "1:1004675596430:web:4018cfe41370857cff09df"
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;