import { Avatar } from '@mui/material'
import { ChatBubbleOutline, FavoriteBorder, Send } from '@mui/icons-material'
import { Post } from '../../types/types'
import { useAppSelector } from '../../hooks/typed-hooks'
import './SinglePost.scss'

interface PostProps {
    post: Post
}

function SinglePost({ post }: PostProps): JSX.Element {
    const fullName = useAppSelector((state) => state.auth.fullName)

    return (
        <section className="post">
            <header className="post__header">
                <Avatar />
                <h3 className="post__username"> {fullName} </h3>
            </header>
            <img src={post.image} alt="Post" className="post__image" />
            <section className="post__icons">
                <FavoriteBorder style={{ marginLeft: 10 }} />
                <ChatBubbleOutline style={{ marginLeft: 10 }} />
                <Send style={{ marginLeft: 10 }} />
            </section>
            <section className="post__description">
                <p className="post__username">{fullName}</p>
                <p className="post__text">{post.description}</p>
            </section>
        </section>
    )
}

export default SinglePost
