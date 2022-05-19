/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ChatBubbleOutline, FavoriteBorder, Send } from '@mui/icons-material'
import {
    Avatar,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Stack,
    Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { Post } from '../../types/types'
import './SinglePost.scss'
import { useAppSelector } from '../../hooks/typed-hooks'
import postServices from '../../utils/postServices'
import { db } from '../../firebase/firebase.config'

interface PostProps {
    post: Post
    // eslint-disable-next-line react/require-default-props
    id?: string
}

interface User {
    avatar: string
    fullName: string
    uid: string
}

function SinglePost({ post, id }: PostProps): JSX.Element {
    const currentUser = useAppSelector((state) => state.auth.uid)

    const [isLiked, setIsLiked] = useState<boolean>(
        post.likes.includes(currentUser)
    )
    const [likes, setLikes] = useState<any>([])
    const [postPage, setPostPage] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const [usersWhoLiked, setUsersWhoLiked] = useState<User[]>([])

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/') {
            setPostPage(false)
        } else {
            setPostPage(true)
        }
    }, [location.pathname])

    useEffect(() => {
        const getUsersWhoLiked = async (): Promise<void> => {
            const userNames: User[] = []
            await post.likes.forEach(async (uid) => {
                const userRef = doc(db, 'users', uid)
                const userSnapshot = await getDoc(userRef)
                userNames.push({
                    avatar: userSnapshot.data()?.avatar,
                    fullName: userSnapshot.data()?.fullName,
                    uid: userSnapshot.data()?.uid,
                })
                setUsersWhoLiked(userNames)
            })
        }
        getUsersWhoLiked()
        setLikes(post.likes)
    }, [post.likes])

    async function like(): Promise<void> {
        if (likes.includes(currentUser)) {
            setIsLiked(true)
            const likesArr = postServices.dislikePost(post.likes, currentUser)
            await postServices.updatePostLikes(String(id), likesArr)
            setIsLiked(false)
            setLikes(likesArr)
        } else {
            setIsLiked(false)
            const likesArr = [...post.likes]
            likesArr.push(currentUser)
            await postServices.updatePostLikes(String(id), likesArr)
            setIsLiked(true)
            setLikes(likesArr)
        }
    }

    const handleClickOpen = (): void => {
        setOpen(true)
    }

    const handleClickClosed = (): void => {
        setOpen(false)
    }

    const showLikes = (): void => {
        handleClickOpen()
    }
    return (
        <>
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
                <section className="post__likes" onClick={showLikes}>
                    {' '}
                    {likes.length} likes
                </section>
                <section className="post__description">
                    <span className="post__username">{post.authorName}</span>
                    <span className="post__text">{post.description}</span>
                </section>
                {post.comments.length > 0 ? (
                    <section className="post__comments">
                        <span
                            className="post__commentsCount"
                            onClick={() => {
                                navigate(`/posts/${String(id)}`)
                            }}
                        >
                            {' '}
                            View all {post.comments.length} comments
                        </span>
                    </section>
                ) : null}
            </section>
            <Dialog open={open} onClose={handleClickClosed}>
                <DialogTitle sx={{ textAlign: 'center', borderRadius: '50px' }}>
                    Likes
                </DialogTitle>
                <Divider />
                <IconButton
                    aria-label="close"
                    onClick={handleClickClosed}
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    {usersWhoLiked.map((user) => (
                        <Stack
                            key={user?.uid}
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            sx={{
                                margin: '15px',
                            }}
                        >
                            <Avatar
                                onClick={() =>
                                    navigate(`/profile/${user?.uid}`)
                                }
                                src={user?.avatar}
                                sx={{ width: '40px', height: '40px' }}
                            />
                            <Typography
                                sx={{
                                    fontWeight: 'bolder',
                                    marginBottom: '4px',
                                }}
                                onClick={() =>
                                    navigate(`/profile/${user?.uid}`)
                                }
                            >
                                {user?.fullName}
                            </Typography>
                        </Stack>
                    ))}
                </DialogContent>
            </Dialog>
        </>
    )
}

export default SinglePost
