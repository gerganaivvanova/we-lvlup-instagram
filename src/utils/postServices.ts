/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    updateDoc,
    where,
} from 'firebase/firestore'
import { db } from '../firebase/firebase.config'
import { Comment, Post, Story } from '../types/types'

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

const getSinglePost = async (postId: string): Promise<any> => {
    const postRef = doc(db, 'posts', postId)
    const querySnapshot = await getDoc(postRef)
    return querySnapshot.data()
}

const getAllStories = async (): Promise<Story[]> => {
    const storiesRef = collection(db, 'stories')
    const currentData = new Date()
    const sortedRef = query(
        storiesRef,
        where('expiredAt', '>', currentData),
        orderBy('expiredAt', 'desc')
    )
    const querySnapshot = await getDocs(sortedRef)

    const allStories: Story[] = []

    querySnapshot.forEach((document) => {
        let data = document.data()
        data = { ...data, id: document.id }

        allStories.push(data as Story)
    })
    return allStories
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

const updateCommentLikes = async (
    postId: string,
    commentId: string,
    uid: string
): Promise<void> => {
    const postRef = doc(db, 'posts', postId)
    const currentPost = await getSinglePost(postId)
    const currentComment = currentPost?.comments.find(
        (comment: Comment) => comment.id === commentId
    )

    if (currentComment?.likes.includes(uid)) {
        const userIndex = currentComment.likes.indexOf(uid)
        currentComment.likes.splice(userIndex, 1)
    } else {
        currentComment?.likes.push(uid)
    }

    await updateDoc(postRef, {
        ...currentPost,
    })
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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const updateFollow = async (currentUserId: string, profileUserId: string) => {
    const currentUserRef = doc(db, 'users', currentUserId)
    const currentUserSnap = await getDoc(currentUserRef)
    const following = currentUserSnap.data()?.following
    const followingsArr = [...following]

    const profileUserRef = doc(db, 'users', profileUserId)
    const profileUserSnap = await getDoc(profileUserRef)
    const followers = profileUserSnap.data()?.followers
    const followersArr = [...followers]

    if (followers.includes(currentUserId)) {
        const indexInFollowers = followers.indexOf(currentUserId)
        followers.splice(indexInFollowers, 1)
        const indexInFollowing = following.indexOf(profileUserId)
        following.splice(indexInFollowing, 1)
    } else {
        followersArr.push(currentUserId)
        followingsArr.push(profileUserId)
    }

    await updateDoc(currentUserRef, { following: followingsArr })
    await updateDoc(profileUserRef, { followers: followersArr })
}
export default {
    addPost,
    getAllPosts,
    getAllStories,
    dislikePost,
    updatePostLikes,
    getAllPostsFromUser,
    updatePostComments,
    updateFollow,
    updateCommentLikes,
}
