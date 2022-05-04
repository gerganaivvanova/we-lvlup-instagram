/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    addDoc,
    collection,
    doc,
    getDocs,
    orderBy,
    query,
    updateDoc,
} from 'firebase/firestore'
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
    querySnapshot.forEach((document) => {
        allPosts.push({ ...document.data(), id: document.id } as Post)
    })
    return allPosts
}

const dislikePost = (array: string[], userId: string): string[] => {
    const index = array.indexOf(userId)
    array.splice(index, 1)
    return array
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updatePost = async (postId: string, updatedPart: any): Promise<void> => {
    await updateDoc(doc(db, 'posts', postId), { likes: updatedPart })
}

export default {
    addPost,
    getAllPosts,
    dislikePost,
    updatePost,
}
