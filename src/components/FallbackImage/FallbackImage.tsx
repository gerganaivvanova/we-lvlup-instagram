import Box from '@mui/material/Box'
import './FallbackImage.scss'

function FallbackImage(): JSX.Element {
    return (
        <Box>
            <img
                // eslint-disable-next-line max-len
                src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
                alt="logo"
                className="fallback__image"
            />
        </Box>
    )
}

export default FallbackImage
