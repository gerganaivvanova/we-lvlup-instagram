/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import SingleComment from '../../components/SingleComment/SingleComment'
import SinglePost from '../../components/SinglePost/SinglePost'
import { db } from '../../firebase/firebase.config'
import { useAppSelector } from '../../hooks/typed-hooks'
import useIsAuthenticated from '../../hooks/useIsAuthenticated'
import BottomNavFooter from '../../layouts/BottomNavigation/BottomNavigation'
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
                        Post
                    </button>
                </section>
                <section className="postPage__allComments">
                    {post?.comments.map((com: any) => {
                        return <SingleComment key={com.id} comment={com} />
                    })}
                </section>
            </section>
            <BottomNavFooter />
        </>
    )
}

export default PostPage
