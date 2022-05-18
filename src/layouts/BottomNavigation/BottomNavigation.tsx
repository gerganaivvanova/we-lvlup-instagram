import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import CssBaseline from '@mui/material/CssBaseline'
import Paper from '@mui/material/Paper'
import HomeIcon from '@mui/icons-material/Home'
import Avatar from '@mui/material/Avatar'
import SearchIcon from '@mui/icons-material/Search'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import { useAppDispatch, useAppSelector } from '../../hooks/typed-hooks'
import { logout } from '../../store/authSlice'

function BottomNavFooter(): JSX.Element {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const uid = useAppSelector((state) => state.auth.uid)
    const userAvatar = useAppSelector((state) => state.auth.avatar)

    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = (): void => {
        setAnchorEl(null)
    }

    const toHomePageHandler = (): void => {
        navigate('/')
    }

    const toUploadPageHandler = (): void => {
        navigate('/upload')
    }

    const toProfilePageHandler = (): void => {
        handleClose()
        navigate(`/profile/${uid}`)
    }
    const logoutHandler = (): void => {
        handleClose()
        dispatch(logout())
        navigate('/')
    }
    return (
        <Box sx={{ pb: 7 }}>
            <CssBaseline />

            <Paper
                sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
                elevation={3}
            >
                <BottomNavigation>
                    <BottomNavigationAction
                        icon={
                            <HomeIcon
                                fontSize="medium"
                                sx={{ color: 'text.primary' }}
                                onClick={toHomePageHandler}
                            />
                        }
                    />
                    <BottomNavigationAction
                        icon={
                            <SearchIcon
                                fontSize="medium"
                                sx={{ color: 'text.primary' }}
                            />
                        }
                    />
                    <BottomNavigationAction
                        icon={
                            <AddCircleOutlineIcon
                                fontSize="medium"
                                sx={{ color: 'text.primary' }}
                                onClick={toUploadPageHandler}
                            />
                        }
                    />
                    <BottomNavigationAction
                        icon={
                            <FavoriteBorderIcon
                                fontSize="medium"
                                sx={{ color: 'text.primary' }}
                            />
                        }
                    />
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        disableRipple
                        startIcon={
                            <Avatar
                                style={{ fontSize: '35px' }}
                                src={userAvatar}
                            />
                        }
                    />

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={toProfilePageHandler}>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                    </Menu>
                </BottomNavigation>
            </Paper>
        </Box>
    )
}

export default BottomNavFooter
