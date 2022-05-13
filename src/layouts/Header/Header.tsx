import { Button, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import './Header.scss'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import SendIcon from '@mui/icons-material/Send'
import InstagramLogo from '../../components/InstagramLogo/InstagramLogo'

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
                        startIcon={<SendIcon style={{ fontSize: '35px' }} />}
                    />
                </li>
            </ul>
        </header>
    )
}

export default Header
