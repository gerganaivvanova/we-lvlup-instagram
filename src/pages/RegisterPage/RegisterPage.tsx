import FacebookLogin from '../../components/FacebookLoginButton/FacebookLogin'
import InstagramLogo from '../../components/InstagramLogo/InstagramLogo'
import OptionalLogin from '../../components/OptionalLogin/OptionalLogin'
import Login from '../../components/User/Login'
import Footer from '../../layouts/Footer/Footer'
import RegisterForm from './RegisterForm'
import './RegisterPage.scss'

function registerPage(): JSX.Element {
    return (
        <>
            <section className="registerPage">
                <InstagramLogo />
                <p className="registerPage__intro">
                    Sign up to see photos and videos from your friends.
                </p>
                <FacebookLogin
                    imageURL="facebookWhite"
                    classType="registerPage"
                />
                <OptionalLogin />
                <RegisterForm />
                <p className="registerPage__terms">
                    By signing up, you agree to our Terms. Learn how we collect,
                    use and share your data in our Data Policy and how we use
                    cookies and similar technology in our Cookies Policy.
                </p>
                <Login />
            </section>
            <Footer />
        </>
    )
}

export default registerPage
