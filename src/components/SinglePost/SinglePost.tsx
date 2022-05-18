/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ChatBubbleOutline, FavoriteBorder, Send } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Post } from '../../types/types'
import './SinglePost.scss'
import { useAppSelector } from '../../hooks/typed-hooks'
import postServices from '../../utils/postServices'

interface PostProps {
    post: Post
    // eslint-disable-next-line react/require-default-props
    id?: string
}

function SinglePost({ post, id }: PostProps): JSX.Element {
    const currentUser = useAppSelector((state) => state.auth.uid)

    const [isLiked, setIsLiked] = useState<boolean>(
        post.likes.includes(currentUser)
    )
    const [postPage, setPostPage] = useState<boolean>(false)

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/') {
            setPostPage(false)
        } else {
            setPostPage(true)
        }
    }, [location.pathname])

    async function like(): Promise<void> {
        if (post.likes.includes(currentUser)) {
            setIsLiked(true)
            const likesArr = postServices.dislikePost(post.likes, currentUser)
            await postServices.updatePostLikes(String(id), likesArr)
            setIsLiked(false)
        } else {
            setIsLiked(false)
            const likesArr = [...post.likes]
            likesArr.push(currentUser)
            await postServices.updatePostLikes(String(id), likesArr)
            setIsLiked(true)
            navigate(0)
        }
    }
    return (
        <section className="post">
            <header className="post__header">
                <Avatar src={post.authorAvatar} />
                <h3
                    className="post__username"
                    onClick={() => {
                        navigate(`/profile/${post.author}`)
                    }}
                >
                    {' '}
                    {post.authorName}{' '}
                </h3>
            </header>
            <img
                src={post.image}
                alt="Post"
                className="post__image"
                onClick={() => {
                    navigate(`/posts/${String(id)}`)
                }}
            />
            <section className="post__icons">
                <FavoriteBorder
                    style={{ marginLeft: 10 }}
                    sx={isLiked ? { color: 'red' } : null}
                    onClick={() => {
                        like()
                    }}
                />
                <ChatBubbleOutline
                    style={{ marginLeft: 10 }}
                    onClick={() => {
                        postPage ? null : navigate(`/posts/${post.id}`)
                    }}
                />
                <Send style={{ marginLeft: 10 }} />
            </section>
            <section className="post__likes">
                {' '}
                {post.likes.length} likes
            </section>
            <section className="post__description">
                <p className="post__username">{post.authorName}</p>
                <p className="post__text">{post.description}</p>
            </section>
        </section>
    )
}

export default SinglePost
