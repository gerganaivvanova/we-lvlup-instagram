import { AuthButton } from '../../components/AuthButton/AuthButton'

function RegisterForm(): JSX.Element {
    return (
        <form method="POST" className="registerPage__form">
            <input
                aria-label="Your email address"
                type="text"
                placeholder="Email address"
                className="registerPage__form--input"
            />
            <input
                aria-label="Your fullname"
                type="text"
                placeholder="Fullname"
                className="registerPage__form--input"
            />
            <input
                aria-label="Enter username"
                type="text"
                placeholder="Username"
                className="registerPage__form--input"
            />
            <input
                aria-label="Enter your password"
                type="password"
                placeholder="Password"
                className="registerPage__form--input"
            />
            <AuthButton>Next</AuthButton>
        </form>
    )
}

export default RegisterForm
