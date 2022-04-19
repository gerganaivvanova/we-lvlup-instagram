import facebookLogo from '../assets/images/Facebook.png'

function FacebookLogin(): JSX.Element {
    return (
        <button className="loginForm__facebook" type="button">
            <img
                src={facebookLogo}
                alt="Facebook Logo"
                className="loginForm__facebook--logo"
            />
            <span className="loginForm__facebook--text">
                Log in with Facebook
            </span>
        </button>
    )
}
export default FacebookLogin
