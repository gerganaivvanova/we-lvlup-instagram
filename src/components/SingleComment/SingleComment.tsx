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
import { v4 as uuidv4 } from 'uuid'
import { db } from '../../firebase/firebase.config'
import { useAppSelector } from '../../hooks/typed-hooks'
import { Comment, Reply } from '../../types/types'
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
    const currentUserAvatar = useAppSelector((state) => state.auth.avatar)
    const currentUserName = useAppSelector((state) => state.auth.fullName)

    const [isCommentLiked, setIsCommentLiked] = useState<boolean>(
        comment.likes.includes(currentUser)
    )
    const [commentLikes, setCommentLikes] = useState<any>([])
    const [usersWhoLiked, setUsersWhoLiked] = useState<User[]>([])
    const [open, setOpen] = useState<boolean>(false)
    const [replyInput, setReplyInput] = useState<boolean>(false)
    const [reply, setReply] = useState<string>('')

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
                setUsersWhoLiked([...userNames])
            })
        }
        getUsersWhoLiked()
        setCommentLikes([...comment.likes])
    }, [comment.likes])

    async function like(): Promise<void> {
        if (commentLikes.includes(currentUser)) {
            setIsCommentLiked(true)
            const userIndex = commentLikes.indexOf(currentUser)
            commentLikes.splice(userIndex, 1)
            const users = usersWhoLiked.filter(
                (user) => user.uid !== currentUser
            )
            await postServices.updateCommentLikes(
                String(postId),
                comment.id,
                currentUser
            )
            setIsCommentLiked(false)
            setUsersWhoLiked(users)
        } else {
            setIsCommentLiked(false)
            const commentslikesArr = [...comment.likes]
            commentslikesArr.push(currentUser)
            setCommentLikes((prev: string[]) => [...prev, currentUser])
            setUsersWhoLiked((prev) => [
                ...prev,
                {
                    uid: currentUser,
                    avatar: currentUserAvatar,
                    fullName: currentUserName,
                },
            ])
            await postServices.updateCommentLikes(
                String(postId),
                comment.id,
                currentUser
            )
            setIsCommentLiked(true)
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

    const showReplyInput = (): void => {
        setReplyInput(true)
    }

    const addReplyHandler = async (): Promise<void> => {
        const repliesArray = comment.replies
        if (reply !== '') {
            const replyData: Reply = {
                reply,
                author: currentUser,
                authorName: currentUserName,
                authorAvatar: currentUserAvatar,
                id: uuidv4(),
            }
            repliesArray.push(replyData)
            const id = uuidv4()
            await postServices.updateCommentReplies(
                String(postId),
                comment.id,
                reply,
                currentUser,
                currentUserName,
                currentUserAvatar,
                id
            )
            setReply('')
            setReplyInput(false)
        }
    }

    return (
        <>
            <section className="comment__container">
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar
                            alt="user avatar"
                            src={comment.authorAvatar}
                            sx={{
                                cursor: 'pointer',
                            }}
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
                    sx={
                        isCommentLiked
                            ? { color: 'red', cursor: 'pointer' }
                            : {
                                  cursor: 'pointer',
                              }
                    }
                    onClick={() => {
                        like()
                    }}
                />
            </section>
            <Stack direction="row" spacing={3} sx={{ marginLeft: '72px' }}>
                <Typography
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '13px',
                        cursor: 'pointer',
                    }}
                    onClick={showLikes}
                >
                    {commentLikes.length} likes
                </Typography>
                <Typography
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '13px',
                        cursor: 'pointer',
                    }}
                    onClick={showReplyInput}
                >
                    Reply
                </Typography>
            </Stack>
            {replyInput && (
                <section className="reply__container">
                    <input
                        value={reply}
                        className="reply__input"
                        onChange={(e) => setReply(e.target.value)}
                        placeholder="Add a comment"
                    />
                    <button
                        className="reply__button"
                        type="submit"
                        onClick={addReplyHandler}
                    >
                        Post
                    </button>
                </section>
            )}

            {comment.replies?.map((currentReply) => {
                return (
                    <ListItem
                        alignItems="flex-start"
                        key={currentReply.id}
                        sx={{ marginLeft: '55px' }}
                    >
                        <ListItemAvatar>
                            <Avatar
                                alt="user avatar"
                                src={currentReply.authorAvatar}
                                sx={{
                                    cursor: 'pointer',
                                }}
                                onClick={() => {
                                    navigate(`/profile/${currentReply.author}`)
                                }}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={currentReply.authorName}
                            secondary={
                                <>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    />
                                    {currentReply.reply}
                                </>
                            }
                        />
                    </ListItem>
                )
            })}
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
