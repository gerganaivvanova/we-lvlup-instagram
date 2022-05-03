import { Avatar } from '@mui/material'
import { ChatBubbleOutline, FavoriteBorder, Send } from '@mui/icons-material'
import { Post } from '../../types/types'
import './SinglePost.scss'

interface PostProps {
    post: Post
}

function SinglePost({ post }: PostProps): JSX.Element {
    return (
        <section className="post">
            <header className="post__header">
                <Avatar />
                <h3 className="post__username"> {post.authorName} </h3>
            </header>
            <img src={post.image} alt="Post" className="post__image" />
            <section className="post__icons">
                <FavoriteBorder style={{ marginLeft: 10 }} />
                <ChatBubbleOutline style={{ marginLeft: 10 }} />
                <Send style={{ marginLeft: 10 }} />
            </section>
            <section className="post__description">
                <p className="post__username">{post.authorName}</p>
                <p className="post__text">{post.description}</p>
            </section>
        </section>
    )
}

export default SinglePost
