function LoginForm(): JSX.Element {
    return (
        <form method="POST" className="loginForm">
            <input
                aria-label="Enter your email address"
                type="text"
                placeholder="Email address"
                className="loginForm__email"
            />
            <input
                aria-label="Enter your password"
                type="password"
                placeholder="Password"
                className="loginForm__password"
            />
            <button type="submit" className="loginForm__button">
                Log In
            </button>
        </form>
    )
}

export default LoginForm
