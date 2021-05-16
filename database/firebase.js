import firebase from 'firebase';

import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAZFzn-f00QyUFypM3lL8MPJ1_3s08Nuuo",
    authDomain: "react-native-pomotimer.firebaseapp.com",
    projectId: "react-native-pomotimer",
    storageBucket: "react-native-pomotimer.appspot.com",
    messagingSenderId: "923354516432",
    appId: "1:923354516432:web:f1419443face84db3a87d5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();

export default {
    firebase,
    database,
}