import SearchIcon from '@mui/icons-material/Search'
import HomeIcon from '@mui/icons-material/Home'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import { Avatar, Button, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import InstagramLogo from '../../components/InstagramLogo/InstagramLogo'
import './Header.scss'

function Header(): JSX.Element {
    const navigate = useNavigate()

    const toHomePageHandler = (): void => {
        navigate('/')
    }

    const toUploadPageHandler = (): void => {
        navigate('/upload')
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
                            disableRipple
                            startIcon={<Avatar style={{ fontSize: '35px' }} />}
                        />
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
