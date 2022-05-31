import { LazyLoadImage } from 'react-lazy-load-image-component'
import logo from '../../assets/images/instagram.webp'
import './InstagramLogo.scss'

function InstagramLogo(): JSX.Element {
    return <LazyLoadImage src={logo} alt="Instagram Logo" className="logo" />
}
export default InstagramLogo
