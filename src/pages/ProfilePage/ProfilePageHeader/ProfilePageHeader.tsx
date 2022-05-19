/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { Button, Divider } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useEffect, useState } from 'react'
import { db, storage } from '../../../firebase/firebase.config'
import { useAppSelector } from '../../../hooks/typed-hooks'
import { dispatch } from '../../../store'
import { updateUser } from '../../../store/authSlice'
import { Post } from '../../../types/types'
import postServices from '../../../utils/postServices'
import './ProfilePageHeader.scss'

interface ProfilePageHeaderProps {
    profileUserId: string
    posts: Post[]
}
function ProfilePageHeader({
    profileUserId,
    posts,
}: ProfilePageHeaderProps): JSX.Element {
    const [profilePicture, setProfilePicture] = useState<File | null>(null)
    const [userData, setUserData] = useState<any>({})
    const [followers, setFollowers] = useState<any>([])
    const [following, setFollowing] = useState<any>([])
    const [isFollowing, setIsFollowing] = useState<boolean>(false)
    const currentLoggedInUserid = useAppSelector((state) => state.auth.uid)

    const isMyProfile = currentLoggedInUserid === profileUserId

    useEffect(() => {
        function checkIsFollowingState(data: any): void {
            if (data.followers.includes(String(currentLoggedInUserid))) {
                setIsFollowing(true)
            } else {
                setIsFollowing(false)
            }
        }

        const getUserById = async (): Promise<void> => {
            const userRef = doc(db, 'users', profileUserId)
            const docSnap = await getDoc(userRef)
            setUserData(docSnap.data())
            setFollowers(docSnap.data()?.followers)
            setFollowing(docSnap.data()?.following)
            checkIsFollowingState(docSnap.data())
        }
        getUserById()
    }, [profileUserId, currentLoggedInUserid])

    let avatarSrc
    if (profilePicture) {
        avatarSrc = URL.createObjectURL(profilePicture)
    } else if (!profilePicture) {
        avatarSrc = userData.avatar
    } else {
        avatarSrc = ''
    }

    const addProfilePictureHandler = async (e: Event): Promise<void> => {
        if (profileUserId !== currentLoggedInUserid) {
            // eslint-disable-next-line no-console
            console.log('This is not your profile page')
            return
        }
        const target = e.target as HTMLInputElement
        const file: File = (target.files as FileList)[0]
        setProfilePicture(file)
        const storageRef = ref(storage, `images/${file.name}`)
        await uploadBytes(storageRef, file as Blob)
        const downloadUrl = await getDownloadURL(storageRef)
        const currentUserRef = doc(db, 'users', profileUserId)
        await updateDoc(currentUserRef, {
            avatar: downloadUrl,
        })

        const newUserData = {
            ...userData,
            avatar: downloadUrl,
        }
        dispatch(updateUser(newUserData))
    }

    async function followUserHandler(): Promise<void> {
        if (followers.includes(currentLoggedInUserid)) {
            setIsFollowing(true)
            const index = followers.indexOf(currentLoggedInUserid)
            followers.splice(index, 1)
            setFollowers(followers)
            setIsFollowing(false)
        } else {
            setIsFollowing(false)
            const followersArr = [...followers]
            followersArr.push(currentLoggedInUserid)
            setFollowers(followersArr)
            setIsFollowing(true)
        }
        await postServices.updateFollow(currentLoggedInUserid, profileUserId)
    }
    return (
        <section className="header">
            <section className="header__avatar">
                <div className="header__picture">
                    <input
                        type="file"
                        name="file"
                        id="profilePicture"
                        className="header__picture--change"
                        accept="image/*"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            addProfilePictureHandler(e as unknown as Event)
                        }}
                    />
                    <label htmlFor="profilePicture">
                        <IconButton
                            component="span"
                            aria-label="upload picture"
                        >
                            <Avatar
                                src={avatarSrc}
                                sx={{ width: '80px', height: '80px' }}
                            />
                        </IconButton>
                    </label>
                </div>
                <div className="header__user">
                    <h2 className="header__user--name">{userData.fullName}</h2>
                    {isMyProfile ? (
                        <div className="header__user--buttons">
                            <Button
                                variant="outlined"
                                sx={{ width: '100px', margin: '2px' }}
                            >
                                SHOW FOLLOWERS
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{ width: '100px', margin: '2px' }}
                            >
                                SHOW FOLLOWING
                            </Button>
                        </div>
                    ) : (
                        <Button
                            variant="contained"
                            sx={{ background: '#0095F6' }}
                            onClick={() => {
                                followUserHandler()
                            }}
                        >
                            {isFollowing ? 'UNFOLLOW' : 'FOLLOW'}
                        </Button>
                    )}
                </div>
            </section>
            <Divider />
            <ul className="header__info">
                <li className="header__info--item">
                    <span>{posts.length}</span>
                    <span className="header__info--text">posts</span>
                </li>
                <li className="header__info--item">
                    <a href="/">{followers.length}</a>
                    <span className="header__info--text">followers</span>
                </li>
                <li className="header__info--item">
                    <a href="/">{following.length}</a>
                    <span className="header__info--text">following</span>
                </li>
            </ul>
            <Divider />
        </section>
    )
}

export default ProfilePageHeader