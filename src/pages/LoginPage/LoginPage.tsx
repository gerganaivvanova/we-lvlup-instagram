import FacebookLogin from '../../components/FacebookLogin'
import InstagramLogo from '../../components/InstagramLogo'
import OptionalLogin from '../../components/OptionalLogin'
import Signup from '../../components/SignUp'
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
                <FacebookLogin />
                <Signup />
            </section>
            <Footer />
        </>
    )
}

export default LoginPage
