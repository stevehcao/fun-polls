import firebase from 'firebase';
import firestore from 'firebase/firestore';
import local from './local';

// Initialize Firebase
var config = {
  apiKey: local.FIRESTORE_APIKEY,
  authDomain: 'fun-polls.firebaseapp.com',
  databaseURL: 'https://fun-polls.firebaseio.com',
  projectId: 'fun-polls',
  storageBucket: 'fun-polls.appspot.com',
  messagingSenderId: local.MESSAGING_SENDER_ID
};

const firebaseApp = firebase.initializeApp(config);
// need to init firestore and export firestore db to use
export default firebaseApp.firestore();
