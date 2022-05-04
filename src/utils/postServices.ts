import { addDoc, collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase/firebase.config'
import { Post } from '../types/types'

const addPost = async (post: Post): Promise<void> => {
    await addDoc(collection(db, 'posts'), post)
}

const getAllPosts = async (): Promise<Post[]> => {
    const postRef = collection(db, 'posts')
    const sortedRef = query(postRef, orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(sortedRef)
    const allPosts: Post[] = []
    querySnapshot.forEach((doc) => {
        allPosts.push({ ...doc.data(), id: doc.id } as Post)
    })
    return allPosts
}

export default { addPost, getAllPosts }
