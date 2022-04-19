import AuthButton from '../../components/AuthButton/AuthButton'

function LoginForm(): JSX.Element {
    return (
        <form method="POST" className="loginPage__form">
            <input
                aria-label="Enter your email address"
                type="text"
                placeholder="Email address"
                className="loginPage__form--input"
            />
            <input
                aria-label="Enter your password"
                type="password"
                placeholder="Password"
                className="loginPage__form--input"
            />
            <AuthButton>Log In</AuthButton>
        </form>
    )
}

export default LoginForm
