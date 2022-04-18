import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyBTwA4oqLfNKdPacPZZ8wa6-3yS7RedW68',
    authDomain: 'we-lvlup-instagram-82e66.firebaseapp.com',
    projectId: 'we-lvlup-instagram-82e66',
    storageBucket: 'we-lvlup-instagram-82e66.appspot.com',
    messagingSenderId: '952352689653',
    appId: '1:952352689653:web:bf7498b579934d6cebe4bc',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage()
