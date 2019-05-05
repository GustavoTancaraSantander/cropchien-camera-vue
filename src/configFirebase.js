
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/messaging'
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyAxrIB30PZ3280REHkvhHuYuVY2woiq-sc",
    authDomain: "ias-pwa-dogfarm.firebaseapp.com",
    databaseURL: "https://ias-pwa-dogfarm.firebaseio.com",
    projectId: "ias-pwa-dogfarm",
    storageBucket: "ias-pwa-dogfarm.appspot.com",
    messagingSenderId: "612380112425",
    appId: "1:612380112425:web:9294227c6cbb6a1c"
};

export const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.firestore();
db.enablePersistence({experimentalTabSynchronization:true})

/* firebase.firestore().enablePersistence()
  .then(function() {
      // Initialize Cloud Firestore through firebase
      var db = firebase.firestore();
  })
  .catch(function(err) {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  }); */
  

//db.settings({timestampsInSnapshots: true}) /////**********/////

/*  firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore through Firebase
let db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

export default {
  db
} */

/* index.esm.js? abfd: 78 [2019-05-04T23: 08: 53.506Z] @ firebase / firestore: Firestore (5.11.0):
  The timestampsInSnapshots setting now defaults to true and you do not
  longer need to explicitly set it In a future release, the setting
  will be removed entirely and so it is recommended that you remove it
  from your firestore.settings () call now. */