import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostSkeleton from '../../../components/PostSkeleton/PostSkeleton'
import SingleImage from '../../../components/SingleImage/SingleImage'
import useIsAuthenticated from '../../../hooks/useIsAuthenticated'
import Header from '../../../layouts/Header/Header'
import { Post } from '../../../types/types'
import postServices from '../../../utils/postServices'
import ProfilePageHeader from '../ProfilePageHeader/ProfilePageHeader'
import './ProfilePage.scss'

function ProfilePage(): JSX.Element {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(false)
    useIsAuthenticated()
    const { profileId } = useParams()

    useEffect(() => {
        const getPosts = async (): Promise<void> => {
            setLoading(true)
            const allPosts = await postServices.getAllPostsFromUser(
                String(profileId)
            )
            setPosts(allPosts)
            setLoading(false)
        }
        getPosts()
    }, [profileId])
    return (
        <>
            <Header />
            <ProfilePageHeader profileUserId={String(profileId)} />
            <section className="profile__main">
                {loading ? (
                    <PostSkeleton />
                ) : (
                    posts.map((post) => (
                        <SingleImage
                            key={post.id}
                            image={post.image}
                            description={post.description}
                            id={post.id}
                        />
                    ))
                )}
            </section>
        </>
    )
}

export default ProfilePage
