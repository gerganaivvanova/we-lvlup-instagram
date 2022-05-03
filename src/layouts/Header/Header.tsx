import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import HomeIcon from '@mui/icons-material/Home'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import { Avatar, Button, IconButton, Menu, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import InstagramLogo from '../../components/InstagramLogo/InstagramLogo'
import './Header.scss'
import { useAppDispatch } from '../../hooks/typed-hooks'
import { logout } from '../../store/authSlice'

function Header(): JSX.Element {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

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

    const logoutHandler = (): void => {
        handleClose()
        dispatch(logout())
        navigate('/')
    }

    return (
        <header className="nav">
            <section className="nav__logo">
                <IconButton onClick={toHomePageHandler}>
                    <InstagramLogo />
                </IconButton>
            </section>
            <section className="nav__line">
                <input
                    type="search"
                    placeholder="Search"
                    className="nav__search"
                />
                <button type="submit" className="nav__button">
                    <SearchIcon />
                </button>
            </section>
            <nav className="nav__menus">
                <ul className="nav__menu">
                    <li className="nav__menu--item">
                        <Button
                            onClick={toHomePageHandler}
                            disableRipple
                            sx={{
                                color: 'gray',
                                '&:hover': { backgroundColor: 'transparent' },
                            }}
                            startIcon={
                                <HomeIcon style={{ fontSize: '35px' }} />
                            }
                        />
                    </li>
                    <li className="nav__menu--item">
                        <Button
                            onClick={toUploadPageHandler}
                            disableRipple
                            sx={{
                                color: 'gray',
                                '&:hover': { backgroundColor: 'transparent' },
                            }}
                            startIcon={
                                <AddBoxOutlinedIcon
                                    style={{ fontSize: '35px' }}
                                />
                            }
                        />
                    </li>
                    <li className="nav__menu--item">
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            disableRipple
                            startIcon={<Avatar style={{ fontSize: '35px' }} />}
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
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        </Menu>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
