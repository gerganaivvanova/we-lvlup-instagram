import { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import { collection, getDocs } from 'firebase/firestore'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import PostSkeleton from '../../components/PostSkeleton/PostSkeleton'
import SinglePost from '../../components/SinglePost/SinglePost'
import useIsAuthenticated from '../../hooks/useIsAuthenticated'
import BottomNavFooter from '../../layouts/BottomNavigation/BottomNavigation'
import Header from '../../layouts/Header/Header'
import { Post } from '../../types/types'
import postServices from '../../utils/postServices'
import './HomePage.scss'
import Stories from '../../components/Stories/Stories'
import { useAppSelector } from '../../hooks/typed-hooks'
import { db } from '../../firebase/firebase.config'

interface User {
    avatar: string
    fullName: string
    uid: string
}

function HomePage(): JSX.Element {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(false)
    const [usersSuggestions, setUsersSuggestions] = useState<User[]>([])

    useIsAuthenticated()

    const navigate = useNavigate()

    const fullname = useAppSelector((state) => state.auth.fullName)
    const userAvatar = useAppSelector((state) => state.auth.avatar)
    const userId = useAppSelector((state) => state.auth.uid)

    useEffect(() => {
        const getPosts = async (): Promise<void> => {
            setLoading(true)
            const allPosts = await postServices.getAllPosts()
            setPosts(allPosts)
            setLoading(false)
        }
        getPosts()
    }, [])

    useEffect(() => {
        const getUsersToSuggest = async (): Promise<void> => {
            const userNames: User[] = []
            const querySnapshot = await getDocs(collection(db, 'users'))
            querySnapshot.forEach((user) => {
                const userData = user.data()
                if (
                    !userData.followers.includes(userId) &&
                    userData.uid !== userId &&
                    userNames.length < 5
                ) {
                    userNames.push({
                        avatar: userData.avatar,
                        fullName: userData.fullName,
                        uid: userData.uid,
                    })
                }
                setUsersSuggestions([...userNames])
            })
        }
        getUsersToSuggest()
    }, [userId])

    async function followUserHandler(userToFollow: string): Promise<void> {
        await postServices.updateFollow(userId, userToFollow)
        const newUsersSuggestions = usersSuggestions.filter(
            (user) => user.uid !== userToFollow
        )
        setUsersSuggestions(newUsersSuggestions)
    }

    return (
        <>
            <Header />
            <section className="main__container">
                <article className="main__page">
                    <Stories />
                    <div className="main__posts">
                        {loading ? (
                            <PostSkeleton />
                        ) : (
                            posts.map((post) => {
                                return (
                                    <SinglePost
                                        id={post.id}
                                        post={post}
                                        key={post.id}
                                    />
                                )
                            })
                        )}
                    </div>
                </article>
                <article className="main__aside">
                    <div className="aside__avatar">
                        <Avatar src={userAvatar} />
                        <p className="aside__avatar--name">{fullname}</p>
                    </div>
                    <p>Suggestions for you</p>
                    {usersSuggestions.map((user) => {
                        return (
                            <ListItem
                                alignItems="center"
                                key={user.uid}
                                sx={{ paddingLeft: '0px' }}
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        alt="user avatar"
                                        src={user.avatar}
                                        onClick={() => {
                                            navigate(`/profile/${user.uid}`)
                                        }}
                                    />
                                </ListItemAvatar>
                                <ListItemText primary={user.fullName} />
                                <Button
                                    variant="text"
                                    sx={{
                                        fontSize: '0.85em',
                                        fontWeight: 'bold',
                                        justifySelf: 'flex-end',
                                    }}
                                    onClick={() => {
                                        followUserHandler(user.uid)
                                    }}
                                >
                                    Follow
                                </Button>
                            </ListItem>
                        )
                    })}
                </article>
            </section>

            <BottomNavFooter />
        </>
    )
}

export default HomePage
