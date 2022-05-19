/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { doc, getDoc } from 'firebase/firestore'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import CloseIcon from '@mui/icons-material/Close'
import './SingleComment.scss'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import DialogContent from '@mui/material/DialogContent'
import { db } from '../../firebase/firebase.config'
import { useAppSelector } from '../../hooks/typed-hooks'
import { Comment } from '../../types/types'
import postServices from '../../utils/postServices'

interface SingleCommentProps {
    comment: Comment
}

interface User {
    avatar: string
    fullName: string
    uid: string
}

function SingleComment({ comment }: SingleCommentProps): JSX.Element {
    const currentUser = useAppSelector((state) => state.auth.uid)
    const [isLiked, setIsLiked] = useState<boolean>(
        comment.likes.includes(currentUser)
    )
    const [likes, setLikes] = useState<any>([])
    const [usersWhoLiked, setUsersWhoLiked] = useState<User[]>([])
    const [open, setOpen] = useState<boolean>(false)

    const navigate = useNavigate()
    const { postId } = useParams()

    useEffect(() => {
        const getUsersWhoLiked = async (): Promise<void> => {
            const userNames: User[] = []
            await comment.likes.forEach(async (uid) => {
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
        setLikes(comment.likes)
    }, [comment.likes])

    async function like(): Promise<void> {
        if (comment.likes.includes(currentUser)) {
            setIsLiked(true)
            const userIndex = comment.likes.indexOf(currentUser)
            const likesArr = comment.likes.splice(userIndex, 1)
            await postServices.updateCommentLikes(
                String(postId),
                comment.id,
                currentUser
            )
            setIsLiked(false)
            setLikes(likesArr)
        } else {
            setIsLiked(false)
            const likesArr = [...comment.likes]
            likesArr.push(currentUser)
            await postServices.updateCommentLikes(
                String(postId),
                comment.id,
                currentUser
            )
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
            <section className="comment__container">
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar
                            alt="user avatar"
                            src={comment.authorAvatar}
                            onClick={() => {
                                navigate(`/profile/${comment.author}`)
                            }}
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary={comment.authorName}
                        secondary={
                            <>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                />
                                {comment.comment}
                            </>
                        }
                    />
                </ListItem>
                <FavoriteBorder
                    sx={isLiked ? { color: 'red' } : null}
                    onClick={() => {
                        like()
                    }}
                />
            </section>
            <Stack direction="row" spacing={3} sx={{ marginLeft: '72px' }}>
                <Typography
                    sx={{ fontWeight: 'bold', fontSize: '13px' }}
                    onClick={showLikes}
                >
                    {likes.length} likes
                </Typography>
                <Typography sx={{ fontWeight: 'bold', fontSize: '13px' }}>
                    Reply
                </Typography>
            </Stack>
            <Divider />

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

export default SingleComment
