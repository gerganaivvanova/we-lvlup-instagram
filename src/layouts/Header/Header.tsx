import SearchIcon from '@mui/icons-material/Search'
import HomeIcon from '@mui/icons-material/Home'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import { Avatar } from '@mui/material'
import InstagramLogo from '../../components/InstagramLogo/InstagramLogo'
import './Header.scss'

function Header(): JSX.Element {
    return (
        <header className="nav">
            <section className="nav__logo">
                <InstagramLogo />
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
                        <HomeIcon
                            sx={{
                                fontSize: '35px',
                                '&:hover': { cursor: 'pointer' },
                            }}
                        />
                    </li>
                    <li className="nav__menu--item">
                        <AddBoxOutlinedIcon
                            sx={{
                                fontSize: '35px',
                                '&:hover': { cursor: 'pointer' },
                            }}
                        />
                    </li>
                    <li className="nav__menu--item">
                        <Avatar
                            sx={{
                                '&:hover': { cursor: 'pointer' },
                            }}
                        />
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
