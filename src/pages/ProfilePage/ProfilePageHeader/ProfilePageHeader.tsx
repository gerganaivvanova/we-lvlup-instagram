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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [userData, setUserData] = useState<any>({})
    const currentLoggedInUserid = useAppSelector((state) => state.auth.uid)

    useEffect(() => {
        const getUserById = async (): Promise<void> => {
            const userRef = doc(db, 'users', profileUserId)
            const docSnap = await getDoc(userRef)
            setUserData(docSnap.data())
        }
        getUserById()
    }, [profileUserId])

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
                    <Button variant="contained" sx={{ background: '#0095F6' }}>
                        FOLLOW
                    </Button>
                </div>
            </section>
            <Divider />
            <ul className="header__info">
                <li className="header__info--item">
                    <span>{posts.length}</span>
                    <span className="header__info--text">posts</span>
                </li>
                <li className="header__info--item">
                    <a href="/">5</a>
                    <span className="header__info--text">followers</span>
                </li>
                <li className="header__info--item">
                    <a href="/">5</a>
                    <span className="header__info--text">following</span>
                </li>
            </ul>
            <Divider />
        </section>
    )
}

export default ProfilePageHeader
