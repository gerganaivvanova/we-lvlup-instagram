import React from 'react'

import { Avatar, Button, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import HomeIcon from '@mui/icons-material/Home'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import { useNavigate } from 'react-router-dom'
import './Header.scss'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import SendIcon from '@mui/icons-material/Send'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { useAppDispatch, useAppSelector } from '../../hooks/typed-hooks'
import { logout } from '../../store/authSlice'

import InstagramLogo from '../../components/InstagramLogo/InstagramLogo'

function Header(): JSX.Element {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const uid = useAppSelector((state) => state.auth.uid)
    const userAvatar = useAppSelector((state) => state.auth.avatar)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = (): void => {
        setAnchorEl(null)
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

    const toHomePageHandler = (): void => {
        navigate('/')
    }

    const toUploadPageHandler = (): void => {
        navigate('/upload')
    }

    return (
        <>
            <header className="nav__smallScreen">
                <ul className="nav__menu">
                    <li className="nav__menu--item">
                        <Button
                            onClick={toUploadPageHandler}
                            disableRipple
                            sx={{
                                color: 'black',
                                '&:hover': { backgroundColor: 'transparent' },
                            }}
                            startIcon={
                                <CameraAltIcon style={{ fontSize: '35px' }} />
                            }
                        />
                    </li>
                    <li className="nav__menu--item">
                        <IconButton
                            onClick={toHomePageHandler}
                            disableRipple
                            sx={{
                                '&:hover': { backgroundColor: 'transparent' },
                            }}
                        >
                            <InstagramLogo />
                        </IconButton>
                    </li>
                    <li className="nav__menu--item">
                        <Button
                            disableRipple
                            sx={{
                                color: 'black',
                                '&:hover': { backgroundColor: 'transparent' },
                            }}
                            startIcon={
                                <SendIcon style={{ fontSize: '35px' }} />
                            }
                        />
                    </li>
                </ul>
            </header>
            <header className="navigation__desktop">
                <section className="navigation__logo">
                    <IconButton
                        disableRipple
                        sx={{
                            justifyContent: 'flex-start',
                        }}
                        onClick={toHomePageHandler}
                    >
                        <InstagramLogo />
                    </IconButton>
                </section>
                <section className="navigation__line">
                    <input
                        type="search"
                        placeholder="Search"
                        className="navigation__search"
                    />
                    <button type="submit" className="navigation__button">
                        <SearchIcon />
                    </button>
                </section>
                <nav className="navigation__menus">
                    <ul className="navigation__menu">
                        <li className="navigation__menu--item">
                            <Button
                                onClick={toHomePageHandler}
                                disableRipple
                                sx={{
                                    color: 'gray',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                    },
                                }}
                                startIcon={
                                    <HomeIcon
                                        style={{
                                            color: 'black',
                                            fontSize: '35px',
                                        }}
                                    />
                                }
                            />
                        </li>
                        <li className="navigation__menu--item">
                            <Button
                                onClick={toUploadPageHandler}
                                disableRipple
                                sx={{
                                    color: 'gray',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                    },
                                }}
                                startIcon={
                                    <AddBoxOutlinedIcon
                                        style={{
                                            color: 'black',
                                            fontSize: '35px',
                                        }}
                                    />
                                }
                            />
                        </li>
                        <li className="navigation__menu--item">
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
                        </li>
                    </ul>
                </nav>
            </header>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={toProfilePageHandler}>Profile</MenuItem>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </Menu>
        </>
    )
}

export default Header
