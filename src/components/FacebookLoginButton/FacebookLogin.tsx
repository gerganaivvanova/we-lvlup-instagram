import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import assetsObject from '../../assets/assetsObject'
import { FacebookProps } from '../../types/types'
import './FacebookLogin.scss'
import { auth, db } from '../../firebase/firebase.config'
import { dispatch } from '../../store'
import { updateUser } from '../../store/authSlice'

function FacebookLogin({ classType, imageURL }: FacebookProps): JSX.Element {
    const navigate = useNavigate()

    const facebookClassNameButton = `${classType}__facebook`
    const facebookClassNameText = `${facebookClassNameButton}--text`
    const path = assetsObject[imageURL]

    const signInWithFacebook = async (): Promise<void> => {
        const provider = new FacebookAuthProvider()
        signInWithPopup(auth, provider).then(async (result) => {
            const { user } = result
            const credential = FacebookAuthProvider.credentialFromResult(result)
            const token = credential?.accessToken
            const { email, uid, displayName } = user
            // eslint-disable-next-line max-len
            const avatar = `${user.providerData[0].photoURL}?access_token=${token}`

            const userRef = doc(db, 'users', uid)
            const docSnap = await getDoc(userRef)
            if (!docSnap.exists()) {
                await setDoc(userRef, {
                    uid,
                    email,
                    fullName: displayName,
                    avatar,
                    followers: [],
                    following: [],
                    username: displayName?.split(' ')[0],
                })
            }

            dispatch(
                updateUser({
                    email,
                    uid,
                    username: displayName?.split(' ')[0],
                    fullName: displayName,
                    avatar,
                })
            )
            navigate('/')
        })
    }
    return (
        <button
            className={facebookClassNameButton}
            type="button"
            onClick={signInWithFacebook}
        >
            <img src={path} alt="Facebook Logo" className="facebook__logo" />
            <span className={facebookClassNameText}>Log in with Facebook</span>
        </button>
    )
}
export default FacebookLogin
