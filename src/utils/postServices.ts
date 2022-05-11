/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    addDoc,
    collection,
    doc,
    getDocs,
    orderBy,
    query,
    updateDoc,
    where,
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
        let data = document.data()
        data = { ...data, id: document.id }
        allPosts.push(data as Post)
    })
    return allPosts
}

const getAllPostsFromUser = async (id: string): Promise<Post[]> => {
    const postRef = collection(db, 'posts')
    const sortedRef = query(
        postRef,
        where('author', '==', id),
        orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(sortedRef)
    const allPosts: Post[] = []
    querySnapshot.forEach((document) => {
        let data = document.data()
        data = { ...data, id: document.id }
        allPosts.push(data as Post)
    })
    return allPosts
}

const dislikePost = (array: string[], userId: string): string[] => {
    const index = array.indexOf(userId)
    array.splice(index, 1)
    return array
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updatePostLikes = async (
    postId: string,
    updatedPart: any
): Promise<void> => {
    await updateDoc(doc(db, 'posts', postId), { likes: updatedPart })
}

const updatePostComments = async (
    postId: string,
    updatedPart: any
): Promise<void> => {
    await updateDoc(doc(db, 'posts', postId), { comments: updatedPart })
}

export default {
    addPost,
    getAllPosts,
    dislikePost,
    updatePostLikes,
    getAllPostsFromUser,
    updatePostComments,
}
