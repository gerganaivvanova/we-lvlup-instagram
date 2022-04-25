/* eslint-disable no-console */
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth'
import { doc, getDoc, addDoc, collection } from 'firebase/firestore'
import { auth, db } from './firebase.config'
import { AuthState, login, logout } from '../store/authSlice'
import { dispatch } from '../store'

export function logIn(email: string, password: string): void {
    signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const { uid } = userCredential.user
            const docRef = doc(db, 'users', uid)
            const docSnap = await getDoc(docRef)
            const data = { ...docSnap.data(), uid }
            dispatch(login(data))
        })
        .catch((error) => {
            console.log(error.message)
        })
}

export function register(userData: AuthState): void {
    const { email, password } = userData
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const { uid } = userCredential.user
            const newUserData = { ...userData, uid, followers: [] }

            await addDoc(collection(db, 'users'), newUserData)
            dispatch(login(newUserData))
        })
        .catch((error) => {
            console.log(error)
        })
}

export function signOutFromAccount(): void {
    signOut(auth)
        .then(() => {
            dispatch(logout())
        })
        .catch((error) => {
            console.log(error.message)
        })
}
