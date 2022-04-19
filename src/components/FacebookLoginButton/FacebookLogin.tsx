import assetsObject from '../../assets/assetsObject'
import { FacebookProps } from '../../types/types'
import './FacebookLogin.scss'

function FacebookLogin({ classType, imageURL }: FacebookProps): JSX.Element {
    const facebookClassNameButton = `${classType}__facebook`
    const facebookClassNameText = `${facebookClassNameButton}--text`
    const path = assetsObject[imageURL]

    return (
        <button className={facebookClassNameButton} type="button">
            <img src={path} alt="Facebook Logo" className="facebook__logo" />
            <span className={facebookClassNameText}>Log in with Facebook</span>
        </button>
    )
}
export default FacebookLogin
