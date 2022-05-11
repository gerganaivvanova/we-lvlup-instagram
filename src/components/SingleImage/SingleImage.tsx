/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useNavigate } from 'react-router-dom'
import './SingleImage.scss'

interface SinglePostImageProps {
    // eslint-disable-next-line react/require-default-props
    id?: string
    image: string
    description: string
}

function SingleImage({
    id,
    image,
    description,
}: SinglePostImageProps): JSX.Element {
    const navigate = useNavigate()
    return (
        <img
            onClick={() => navigate(`/posts/${id}`)}
            src={image}
            alt={description}
            className="singleImage"
        />
    )
}

export default SingleImage
