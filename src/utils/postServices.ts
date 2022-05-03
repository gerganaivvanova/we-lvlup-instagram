import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebase.config'
import { Post } from '../types/types'

const addPost = async (post: Post): Promise<void> => {
    await addDoc(collection(db, 'posts'), post)
}

const getAllPosts = async (): Promise<Post[]> => {
    const querySnapshot = await getDocs(collection(db, 'posts'))
    const allPosts: Post[] = []
    querySnapshot.forEach((doc) => {
        allPosts.push({ ...doc.data(), id: doc.id } as Post)
    })
    return allPosts
}

export default { addPost, getAllPosts }
