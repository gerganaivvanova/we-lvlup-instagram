import { Link } from 'react-router-dom'

function Login(): JSX.Element {
    return (
        <div className="registerPage__login">
            <p className="registerPage__login--title">
                Have an account?{` `}
                <Link to="/login" className="registerPage__login--button">
                    Log in
                </Link>
            </p>
        </div>
    )
}
export default Login
