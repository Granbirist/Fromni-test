import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyCv4VoRxqBxcfRal_id9tim9q_uRH9Nv9c",
    authDomain: "fromni-test.firebaseapp.com",
    databaseURL: "https://fromni-test.firebaseio.com",
    projectId: "fromni-test",
    storageBucket: "fromni-test.appspot.com",
    messagingSenderId: "778905554505",
    appId: "1:778905554505:web:94b64dd28208e3e030f998"
};

const app = initializeApp(config);

const firestore = getFirestore(app); 

export { app, firestore };