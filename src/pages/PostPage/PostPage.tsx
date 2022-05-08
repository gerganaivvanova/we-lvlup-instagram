import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SinglePost from '../../components/SinglePost/SinglePost'
import { db } from '../../firebase/firebase.config'
import useIsAuthenticated from '../../hooks/useIsAuthenticated'
import Header from '../../layouts/Header/Header'
import './PostPage.scss'

function PostPage(): JSX.Element {
    const [post, setPost] = useState<any>()
    const [comment, setComment] = useState<string>('')
    const { postId } = useParams()
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

    return (
        <>
            <Header />
            <section className="postPage">
                {post ? <SinglePost post={post} key={postId} /> : null}
                <section className="postPage__container">
                    <input
                        value={comment}
                        className="postPage__input"
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment"
                    />
                    <button className="postPage__button" type="submit">
                        ADD
                    </button>
                </section>
            </section>
        </>
    )
}

export default PostPage
