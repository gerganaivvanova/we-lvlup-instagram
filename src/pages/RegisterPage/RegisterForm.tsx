import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import { AuthButton } from '../../components/AuthButton/AuthButton'
import { register } from '../../firebase/firebaseServices'

function RegisterForm(): JSX.Element {
    const [registering, setRegistering] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [fullName, setFullname] = useState<string>('')

    const [error, setError] = useState<string>('')

    const validEmail =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,4}/

    if (!email.match(validEmail)) {
        setError('Please provide a valid email.')
    }

    if (password.length < 6) {
        setError('The password must be at least 6 characters long')
    }

    const userData = { email, username, password, fullName }

    const navigate = useNavigate()

    const registerHandler: React.FormEventHandler<HTMLFormElement> = async (
        e
    ) => {
        e.preventDefault()
        setRegistering(true)
        register(userData)
        navigate('/')
        setRegistering(false)
    }

    return (
        <form
            method="POST"
            className="registerPage__form"
            onSubmit={registerHandler}
        >
            <input
                aria-label="Your email address"
                type="text"
                placeholder="Email address"
                className="registerPage__form--input"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <input
                aria-label="Your fullname"
                type="text"
                placeholder="Fullname"
                className="registerPage__form--input"
                onChange={(e) => setFullname(e.target.value)}
                value={fullName}
            />
            <input
                aria-label="Enter username"
                type="text"
                placeholder="Username"
                className="registerPage__form--input"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            <input
                aria-label="Enter your password"
                type="password"
                placeholder="Password"
                className="registerPage__form--input"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <AuthButton disabled={registering}>Next</AuthButton>
            {error && <p className="registerPage__form--error">{error}</p>}
            {registering && (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            )}
        </form>
    )
}

export default RegisterForm
