import {initializeApp} from 'firebase/app'
import {
    getFirestore, collection, onSnapshot, 
    addDoc, deleteDoc, doc

} from 'firebase/firestore'
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

  //collection ref
const colRef = collection(db,'books')

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

onSnapshot(colRef, (snapshot) => {
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