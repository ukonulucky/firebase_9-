
import { initializeApp } from "firebase/app"
import {
 getFirestore, collection, onSnapshot
} from "firebase/firestore"
export  const firebaseConfig = {
    apiKey: "AIzaSyBpFZL1M--57WjLO2XeMZ2BAIh-ElZbL8Q",
    authDomain: "fir-9-project-1b3de.firebaseapp.com",
    projectId: "fir-9-project-1b3de",
    storageBucket: "fir-9-project-1b3de.appspot.com",
    messagingSenderId: "238355885829",
    appId: "1:238355885829:web:4455c1ba5772d4604a916c"
 };
  
 initializeApp(firebaseConfig)
 
// adding services

export const db = getFirestore()

// getting collection

export const colRef = collection(db, "books")
 
// getting documents

const getData = async () => {
    try {
      
        onSnapshot(colRef, (snaps) => {
            const books = []
                snaps.docs.forEach(i => books.push({
                    ...i.data(),
                    id: i.id
     
                }))
                console.log(books)
        })
        
      
  } catch (error) {
    console.log(error)
  }
}

getData()
