/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar } from '@mui/material'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import SinglePost from '../../components/SinglePost/SinglePost'
import { db } from '../../firebase/firebase.config'
import { useAppSelector } from '../../hooks/typed-hooks'
import useIsAuthenticated from '../../hooks/useIsAuthenticated'
import Header from '../../layouts/Header/Header'
import postServices from '../../utils/postServices'
import './PostPage.scss'

function PostPage(): JSX.Element {
    const [post, setPost] = useState<any>()
    const [comment, setComment] = useState<string>('')
    const { postId } = useParams()
    const { uid, fullName, avatar } = useAppSelector((state) => state.auth)
    useIsAuthenticated()

    useEffect(() => {
        const getSinglePost = async (): Promise<void> => {
            const postRef = doc(db, 'posts', String(postId))
            const postSnap = await getDoc(postRef)

            if (postSnap.exists()) {
                setPost(postSnap.data())
            } else {
                // eslint-disable-next-line no-console
                console.log('We did not find this post!')
            }
        }
        getSinglePost()
    }, [postId])

    const addCommentHandler = async (): Promise<void> => {
        const commentsArray = post.comments
        if (comment !== '') {
            const commentData = {
                comment,
                author: uid,
                authorName: fullName,
                authorAvatar: avatar,
                replies: [],
                likes: [],
                id: uuidv4(),
            }
            commentsArray.push(commentData)
            await postServices.updatePostComments(String(postId), commentsArray)
            setComment('')
        }
    }

    return (
        <>
            <Header />
            <section className="postPage">
                {post ? (
                    <SinglePost id={String(postId)} post={post} key={postId} />
                ) : null}
                <section className="postPage__container">
                    <input
                        value={comment}
                        className="postPage__input"
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment"
                    />
                    <button
                        className="postPage__button"
                        type="submit"
                        onClick={addCommentHandler}
                    >
                        ADD
                    </button>
                </section>
                <section>
                    {post?.comments.map((com: any) => {
                        return (
                            <div key={com.id} className="postPage__comments">
                                <Avatar
                                    sx={{ width: '30px', height: '30px' }}
                                    src={com.authorAvatar}
                                />
                                <span className="postPage__comments--author">
                                    {com.authorName}
                                </span>
                                <span>{com.comment}</span>
                            </div>
                        )
                    })}
                </section>
            </section>
        </>
    )
}

export default PostPage
