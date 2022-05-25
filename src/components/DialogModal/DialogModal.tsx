import Avatar from '@mui/material/Avatar'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

interface DialogProps {
    handleClickClosed: () => void
    isShowFollowersBtnClicked: boolean
    users: User[]
}

interface User {
    avatar: string
    fullName: string
    uid: string
}

function DialogModal({
    handleClickClosed,
    isShowFollowersBtnClicked,
    users,
}: DialogProps): JSX.Element | null {
    const navigate = useNavigate()

    return (
        <>
            <DialogTitle sx={{ textAlign: 'center', borderRadius: '50px' }}>
                {isShowFollowersBtnClicked ? 'Followers' : 'Following'}
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
            {users.length > 0 ? (
                <DialogContent>
                    {users.map((user: User) => (
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
            ) : (
                <DialogContent>No users to show</DialogContent>
            )}
        </>
    )
}

export default DialogModal
