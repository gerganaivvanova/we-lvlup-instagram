import footerLinks from './footerLinks'
import './Footer.scss'

function Footer(): JSX.Element {
    return (
        <footer className="footer">
            <ul className="footer__container">
                {footerLinks.map((link) => (
                    <li key={link.name} className="footer__container-link">
                        <a href={link.path}>{link.name}</a>
                    </li>
                ))}
            </ul>
        </footer>
    )
}

export default Footer
