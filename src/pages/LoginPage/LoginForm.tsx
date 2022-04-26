import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import AuthButton from '../../components/AuthButton/AuthButton'
// import { logIn } from '../../firebase/firebaseServices'
import { auth } from '../../firebase/firebase.config'
import { dispatch } from '../../store'
import { login } from '../../store/authSlice'

function LoginForm(): JSX.Element {
    const navigate = useNavigate()

    const [signin, setSignin] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')

    const onLoginHandler: React.FormEventHandler<HTMLFormElement> = async (
        e
    ) => {
        e.preventDefault()
        try {
            setSignin(true)
            const userData = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )
            dispatch(login({ email, uid: userData.user.uid }))
            setSignin(false)
            navigate('/')
        } catch (err: unknown) {
            setSignin(false)
            if (err instanceof FirebaseError) {
                if (err.code.includes('auth/user-not-found')) {
                    setError('User not found.')
                } else if (err.code.includes('auth/wrong-password')) {
                    setError('Wrong password.')
                } else {
                    setError('Unable to login. Please try again later.')
                }
            }
        }
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
            <AuthButton>Log In</AuthButton>
            {error && <p className="loginPage__form--error">{error}</p>}
            {signin && (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            )}
        </form>
    )
}

export default LoginForm
