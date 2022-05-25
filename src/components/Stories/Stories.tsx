import Avatar from '@mui/material/Avatar/Avatar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { v4 } from 'uuid'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import {
    addDoc,
    collection,
    serverTimestamp,
    Timestamp,
} from 'firebase/firestore'
import LinearProgress from '@mui/material/LinearProgress'
import DialogContent from '@mui/material/DialogContent'
import { useNavigate } from 'react-router-dom'
import { db, storage } from '../../firebase/firebase.config'
import './Stories.scss'
import postServices from '../../utils/postServices'
import { Story } from '../../types/types'
import SingleStory from './SingleStory'
import { useAppSelector } from '../../hooks/typed-hooks'

function Stories(): JSX.Element {
    const [image, setImage] = useState<File | null>(null)
    const [stories, setStories] = useState<Story[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false)

    const navigate = useNavigate()
    const theme = useTheme()
    const userAvatar = useAppSelector((state) => state.auth.avatar)
    const userId = useAppSelector((state) => state.auth.uid)
    const username = useAppSelector((state) => state.auth.username)

    const desktopScreen = useMediaQuery(theme.breakpoints.up('md'))

    useEffect(() => {
        const getAllStories = async (): Promise<void> => {
            setLoading(true)
            const allStories = await postServices.getAllStories()
            setStories(allStories)
            setLoading(false)
        }
        getAllStories()
    }, [])

    const handleClickOpen = (): void => {
        setOpen(true)
    }

    const handleClose = (): void => {
        setOpen(false)
    }

    const handleChange = (e: Event): void => {
        const target = e.target as HTMLInputElement
        const file: File = (target.files as FileList)[0]
        setImage(file)
        handleClickOpen()
    }

    const addStoryHandler = async (): Promise<void> => {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const storyRef = ref(storage, `stories/${image?.name + v4()}`)
        try {
            setLoading(true)
            await uploadBytes(storyRef, image as Blob)
            const downloadUrl = await getDownloadURL(storyRef)
            const now = new Date()

            await addDoc(collection(db, 'stories'), {
                image: downloadUrl,
                createdAt: serverTimestamp() as Timestamp,
                expiredAt: new Date(
                    new Date(now).getTime() + 60 * 60 * 24 * 1000
                ),
                userAvatar,
                userId,
                username,
            })
            setLoading(false)
            navigate(0)
        } catch (err) {
            setLoading(false)
            setError('Something went wrong. Please, try again later.')
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexFlow: 'row nowrap',
                margin: desktopScreen ? '12px auto' : '12px',
                marginLeft: desktopScreen ? 'none' : '0px',
                alignItems: 'center',
                background: 'white',
                border: '1px solid #DBDBDB',
                overflowX: 'auto',
                width: desktopScreen ? '45%' : '100%',
                borderRadius: desktopScreen ? '10px' : 'none',
            }}
        >
            <input
                type="file"
                name="file"
                id="storyPicture"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e as unknown as Event)
                }}
            />
            <label
                htmlFor="storyPicture"
                style={{ marginLeft: '10px', marginTop: '5px' }}
            >
                <Stack
                    direction="column"
                    sx={{
                        marginLeft: '2',
                        width: '100px',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Badge
                        overlap="circular"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        badgeContent={<AddCircleIcon color="primary" />}
                    >
                        <Avatar
                            alt="user profile picture"
                            src={userAvatar}
                            sx={{ width: 56, height: 56 }}
                        />
                    </Badge>
                    <Typography
                        sx={{
                            fontSize: '18px',
                            marginTop: '8px',
                        }}
                    >
                        Your Story
                    </Typography>
                </Stack>
            </label>
            {stories.map((story) => {
                return <SingleStory key={story.id} story={story} />
            })}
            {error && <p className="stories__error">{error}</p>}
            {loading && (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            )}
            <Dialog fullScreen open={open} onClose={handleClose}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => {
                                setImage(null)
                                handleClose()
                            }}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Button
                            color="inherit"
                            onClick={() => {
                                addStoryHandler()
                                handleClose()
                            }}
                        >
                            Add to your Story
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogContent
                    sx={{
                        padding: '0',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {image && (
                        <img
                            className="story__preview"
                            src={URL.createObjectURL(image)}
                            alt="Story preview"
                        />
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default Stories
