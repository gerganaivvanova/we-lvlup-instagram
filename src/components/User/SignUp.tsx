import { Link } from 'react-router-dom'

function Signup(): JSX.Element {
    return (
        <div className="loginPage__signup">
            <p className="loginPage__signup--title">
                Don&apos;t have an account?{` `}
                <Link to="/register" className="loginPage__signup--button">
                    Sign up
                </Link>
            </p>
        </div>
    )
}
export default Signup
