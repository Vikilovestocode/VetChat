import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true, experimentalForceLongPolling: true};

let config = {
  apiKey: "AIzaSyAPZJz2Hx6y-Ct81TdKHazSI8jL-ms7ZTo",
  authDomain: "vetchat-d178c.firebaseapp.com",
  projectId: "vetchat-d178c",
  storageBucket: "vetchat-d178c.appspot.com",
  messagingSenderId: "624862339873",
  appId: "1:624862339873:web:e0e7060d79c84136411460",
  measurementId: "G-JMVY6S2TBH"
};

// let app = firebase.initializeApp(config);

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}else {
  firebase.app(); // if already initialized, use that one
}

firebase.firestore().settings(settings);

export default firebase;