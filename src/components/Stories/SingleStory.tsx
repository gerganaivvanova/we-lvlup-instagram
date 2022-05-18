import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useState } from 'react'
import { LinearProgress } from '@mui/material'
import Box from '@mui/material/Box'
import { Story } from '../../types/types'
import './Stories.scss'

interface StoryProps {
    story: Story
}
function SingleStory({ story }: StoryProps): JSX.Element {
    const [open, setOpen] = useState<boolean>(false)
    const [progress, setProgress] = useState<number>(0)

    useEffect(() => {
        if (open) {
            const timer = setInterval(() => {
                setProgress((prevProgress) =>
                    prevProgress === 100 ? 0 : prevProgress + 10
                )
            }, 300)

            return () => {
                setProgress(0)
                clearInterval(timer)
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return () => {}
    }, [open])

    const handleClickOpen = (): void => {
        setOpen(true)
    }

    const handleClose = (): void => {
        setOpen(false)
    }

    const checkStoryHandler = (): void => {
        handleClickOpen()
        setOpen(true)
        setTimeout(() => {
            handleClose()
        }, 3500)
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexFlow: 'row nowrap',
                margin: '12px',
            }}
        >
            <Stack
                direction="column"
                spacing={1}
                sx={{ justifyContent: 'center', alignItems: 'center' }}
            >
                <Stack
                    sx={{
                        borderRadius: '50%',
                        border: '2px solid red',
                    }}
                >
                    <Avatar
                        alt="profile picture of the user"
                        src={story.userAvatar}
                        sx={{ width: 56, height: 56 }}
                        onClick={checkStoryHandler}
                    />
                </Stack>
                <Typography
                    sx={{
                        fontSize: '18px',
                        marginTop: '8px',
                    }}
                >
                    {story.username}
                </Typography>
            </Stack>
            <Dialog
                maxWidth="lg"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0',
                }}
                open={open}
                onClose={handleClose}
            >
                <LinearProgress variant="determinate" value={progress} />
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        color: 'primary.text',
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent sx={{ padding: '0', display: 'flex' }}>
                    <img
                        className="story__prreview"
                        src={story.image}
                        alt="user story"
                    />
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default SingleStory
