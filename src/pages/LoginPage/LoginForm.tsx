import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import AuthButton from '../../components/AuthButton/AuthButton'
import { logIn } from '../../firebase/firebaseServices'

function LoginForm(): JSX.Element {
    const navigate = useNavigate()

    const [signin, setSignin] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const onLoginHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()

        setSignin(true)
        logIn(email, password)
        navigate('/')
    }

    return (
        <form
            method="POST"
            className="loginPage__form"
            onSubmit={onLoginHandler}
        >
            <input
                aria-label="Enter your email address"
                type="text"
                placeholder="Email address"
                className="loginPage__form--input"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <input
                aria-label="Enter your password"
                type="password"
                placeholder="Password"
                className="loginPage__form--input"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <AuthButton disabled={signin}>Log In</AuthButton>
            {signin && (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            )}
        </form>
    )
}

export default LoginForm
