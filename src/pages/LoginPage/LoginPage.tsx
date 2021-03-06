import { LazyLoadImage } from 'react-lazy-load-image-component'
import FacebookLogin from '../../components/FacebookLoginButton/FacebookLogin'
import InstagramLogo from '../../components/InstagramLogo/InstagramLogo'
import OptionalLogin from '../../components/OptionalLogin/OptionalLogin'
import Signup from '../../components/User/SignUp'
import Footer from '../../layouts/Footer/Footer'
import LoginForm from './LoginForm'
import './LoginPage.scss'
import iphone from '../../assets/images/iphone.webp'

function LoginPage(): JSX.Element {
    return (
        <>
            <section className="loginPage">
                <section className="loginPage__image">
                    <LazyLoadImage
                        src={iphone}
                        alt="Iphone with account"
                        className="loginPage__image--file"
                        loading="lazy"
                    />
                </section>
                <section className="loginPage__details">
                    <InstagramLogo />
                    <LoginForm />
                    <OptionalLogin />
                    <FacebookLogin
                        classType="loginPage"
                        imageURL="facebookBlue"
                    />
                    <Signup />
                </section>
            </section>
            <Footer />
        </>
    )
}

export default LoginPage
