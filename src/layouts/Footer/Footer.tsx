import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import footerLinks from './footerLinks'
import './Footer.scss'

function Footer(): JSX.Element {
    return (
        <Box component="footer" className="footer">
            <Box component="div" className="footer__container">
                <Box component="ul" className="footer__container-links">
                    {footerLinks.map((link) => (
                        <ListItem
                            key={link.name}
                            className="footer__container-link"
                        >
                            <a href={link.path}>{link.name}</a>
                        </ListItem>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default Footer
