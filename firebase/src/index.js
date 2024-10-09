// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import {
    getfireatore, collection,
    getDocs
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBhM9OFbJAhhcKJC5Ia4ksNAjHyhFNHa1k",
    authDomain: "fir-82638.firebaseapp.com",
    projectId: "fir-82638",
    storageBucket: "fir-82638.appspot.com",
    messagingSenderId: "209948577580",
    appId: "1:209948577580:web:ae3d71a50e6984e76da689",
    measurementId: "G-CX049XJXT4"
  }

  initializeApp(firebaseConfig)

  const db = getFirestore()
// collection ref
  const colRef = collection(db,'books')
// collection data
getDocs(colRef)
.then((snapshot) => {
    console.log(snapshot.docs)
})
