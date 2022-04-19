import { Link } from 'react-router-dom'

function Signup(): JSX.Element {
    return (
        <div className="loginForm__signup">
            <p className="loginForm__signup--title">
                Don&apos;t have an account?{` `}
                <Link to="signup" className="loginForm__signup--button">
                    Sign up
                </Link>
            </p>
        </div>
    )
}
export default Signup
