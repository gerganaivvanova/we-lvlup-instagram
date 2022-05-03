import { useEffect, useState } from 'react'
import PostSkeleton from '../../components/PostSkeleton/PostSkeleton'
import SinglePost from '../../components/SinglePost/SinglePost'
import useIsAuthenticated from '../../hooks/useIsAuthenticated'
import Header from '../../layouts/Header/Header'
import { Post } from '../../types/types'
import postServices from '../../utils/postServices'
import './HomePage.scss'

function HomePage(): JSX.Element {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(false)
    useIsAuthenticated()

    useEffect(() => {
        const getPosts = async (): Promise<void> => {
            setLoading(true)
            const allPosts = await postServices.getAllPosts()
            setPosts(allPosts)
            setLoading(false)
        }
        getPosts()
    }, [])

    return (
        <>
            <Header />
            <div className="main">
                {loading ? (
                    <PostSkeleton />
                ) : (
                    posts.map((post) => {
                        return <SinglePost post={post} key={post.id} />
                    })
                )}
            </div>
        </>
    )
}

export default HomePage
