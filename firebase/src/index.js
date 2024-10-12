import {initializeApp} from 'firebase/app'
import {
    getFirestore, collection, onSnapshot, 
    addDoc, deleteDoc, doc,
    query, where, orderBy, serverTimestamp,
    getDoc, updateDoc

} from 'firebase/firestore'
import {
    getAuth,createUserWithEmailAndPassword,
    signOut,signInWithEmailAndPassword,
    onAuthStateChanged
}from 'firebase/auth'

import { title } from 'process';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB_BwJRzghBMRI-GxZXOMddc-qEefoGiuA",
    authDomain: "abcd-53d7c.firebaseapp.com",
    projectId: "abcd-53d7c",
    storageBucket: "abcd-53d7c.appspot.com",
    messagingSenderId: "997952436451",
    appId: "1:997952436451:web:dcc81396cb2efd4089edd6"
  };

  initializeApp(firebaseConfig)

  //init services
const db = getFirestore()
const auth = getAuth()

  //collection ref
const colRef = collection(db,'books')

//que
const q=query(colRef,orderBy('createdAt'))

  // real data
// getDocs(colRef)
//     .then((snapshot) => {
//         let books = []
//         snapshot.docs.forEach((doc) => {
//             books.push({...doc.data(),id: doc.id})
//         })
//         console.log(books)
// })
// .catch(err => {
//     console.log(err.message)
// })

const UnsubCol = onSnapshot(q, (snapshot) => {
    let books = []
        snapshot.docs.forEach((doc) => {
            books.push({...doc.data(),id: doc.id})
        })
        console.log(books)
})

// adding doc
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit',(e)=> {
    e.preventDefault()
    addDoc(colRef, {
        title: addBookForm.title.value ,
        author: addBookForm.author.value,
        createdAt : serverTimestamp()
    })
    .then(() =>{
        addBookForm.reset()
    })

})

// delete doc
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit',(e)=> {
    e.preventDefault()

    const docRef= doc(db,'books', deleteBookForm.id.value)
    console.log(docRef)
    deleteDoc(docRef)
    .then(() => {
        deleteBookForm.reset()
    })
})

// get single

const docRef = doc(db,'books','keczW9QfSmaEyxgZ1fbv')

//getDoc(docRef)
//.then((doc) => {
//    console.log(doc.data(),doc.id)
//})

const UnsubDoc = onSnapshot(docRef, (doc) => {
    console.log(doc.data(),doc.id)
})

//

const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit',(e) => {
    e.preventDefault()

    const docRef =doc(db,'books', updateForm.id.value)

    updateDoc(docRef,{
        title: 'updated title'
    })
    .then(() => {
        updateForm.reset()
    })
})

// signup
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth,signupForm.email.value,signupForm.password.value)
    .then((cred) => {
        console.log('user created: ', cred.user)
        signupForm.reset()

    })

    .catch((err) => {
        console.log(err.message)
    })
})

//login and out
const logoutButton = document.querySelector('.Logout')
logoutButton.addEventListener('click', () => {
signOut(auth)
.then(() => {
    //console.log('User sined out')
})
.catch((err) => {
    console.log(err.message)
})
})

const loginButton = document.querySelector('.Login')
loginButton.addEventListener('submit', (e) => {
    e.preventDefault()
signInWithEmailAndPassword(auth,loginButton.email.value,loginButton.password.value)
.then((cred) => {
    //console.log('User loged in :', cred.user)
})
.catch((err) => {
    console.log(err.message)
})
})
//
const Unsubauth = onAuthStateChanged(auth,(user) => {
    console.log('user :',user)
})
//
const UnsubButton=document.querySelector('.unsub')
UnsubButton.addEventListener('click', () => {
    console.log('Unsubcribing')
    UnsubCol()
    UnsubDoc()
    Unsubauth()

})