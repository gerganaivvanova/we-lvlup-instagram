import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Comment, Post, ReduxComment, Reply } from '../../types'

export interface PostState {
    allPosts: Post[]
    allComments: Comment[]
}

const initialState: PostState = {
    allPosts: [],
    allComments: [],
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        loadAllPosts: (state, action: PayloadAction<Post[]>) => {
            state.allPosts = action.payload
        },
        addPost: (state, action: PayloadAction<Post>) => {
            state.allPosts.push(action.payload)
        },
        likeDislikePost: (
            state,
            action: PayloadAction<{ id: string; user: string }>
        ) => {
            const { id, user } = action.payload
            const currentPost = state.allPosts.find((post) => post.id === id)
            const currentPostIndex = state.allPosts
                .map((post) => post.id)
                .indexOf(id)
            if (!currentPost) {
                return
            }
            // if you have not liked it yet you are added to the likes array
            if (!currentPost.likedBy.includes(user)) {
                currentPost.likedBy.push(user)
            } else {
                const index = currentPost.likedBy.indexOf(user)
                currentPost.likedBy.splice(index, 1)
            }
            // upgrade the current post in allPosts array?
            state.allPosts.splice(currentPostIndex, 1, currentPost)
        },
        addComment: (state, action: PayloadAction<ReduxComment>) => {
            const { comment, commentator, id, commentatorID, commentID } =
                action.payload
            const currentPost = state.allPosts.find((post) => post.id === id)
            if (!currentPost) {
                return
            }
            const newComment: Comment = {
                comment,
                commentator,
                commentatorID,
                commentID,
                likes: [],
                replies: [],
            }
            currentPost.comments.push(newComment)
            state.allComments.push(newComment)
        },
        likeDislikeComment: (
            state,
            action: PayloadAction<{
                postID: string
                commentID: string
                userID: string
            }>
        ) => {
            const { postID, commentID, userID } = action.payload
            const currentPost = state.allPosts.find(
                (currPost) => currPost.id === postID
            )

            const currentComment = currentPost?.comments.find(
                (currPost) => currPost.commentID === commentID
            )

            if (!currentComment) {
                return
            }

            if (!currentComment?.likes.includes(userID)) {
                currentComment.likes.push(userID)
            } else {
                const userIndex = currentComment.likes.indexOf(userID)
                currentComment.likes.splice(userIndex, 1)
            }
        },
        addReplyToComment: (state, action: PayloadAction<Reply>) => {
            const {
                postID,
                replyUserID,
                commentID,
                reply,
                replier,
                replyID,
                replyLikes,
            } = action.payload

            const currentPost = state.allPosts.find(
                (post) => post.id === postID
            )

            const currentComment = currentPost?.comments.find(
                (comm) => comm.commentID === commentID
            )

            currentComment?.replies?.push({
                commentID,
                replier,
                reply,
                replyID,
                replyUserID,
                replyLikes,
            })
        },
        likeDislikeReply: (
            state,
            action: PayloadAction<{
                postID: string
                userID: string
                commentID: string
                reply: Reply
            }>
        ) => {
            const { postID, userID, commentID, reply } = action.payload
            const currentPost = state.allPosts.find(
                (post) => post.id === postID
            )

            const currentComment = currentPost?.comments.find(
                (comm) => comm.commentID === commentID
            )

            const currentReply = currentComment?.replies?.find(
                (currReply) => currReply.replyID === reply.replyID
            )

            if (!currentReply?.replyLikes.includes(userID)) {
                currentReply?.replyLikes.push(userID)
            } else {
                const replyLikeIndex = currentReply?.replyLikes.indexOf(userID)
                currentReply.replyLikes.splice(replyLikeIndex, 1)
            }
        },
    },
})

export const {
    loadAllPosts,
    addPost,
    likeDislikePost,
    addComment,
    likeDislikeComment,
    addReplyToComment,
    likeDislikeReply,
} = postSlice.actions

export default postSlice.reducer
