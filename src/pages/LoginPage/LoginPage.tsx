import FacebookLogin from '../../components/FacebookLoginButton/FacebookLogin'
import InstagramLogo from '../../components/InstagramLogo/InstagramLogo'
import OptionalLogin from '../../components/OptionalLogin/OptionalLogin'
import Signup from '../../components/User/SignUp'
import Footer from '../../layouts/Footer/Footer'
import LoginForm from './LoginForm'
import './LoginPage.scss'

function LoginPage(): JSX.Element {
    return (
        <>
            <section className="loginPage">
                <InstagramLogo />
                <LoginForm />
                <OptionalLogin />
                <FacebookLogin classType="loginPage" imageURL="facebookBlue" />
                <Signup />
            </section>
            <Footer />
        </>
    )
}

export default LoginPage
