import { ButtonProps } from '../../types/types'
import './AuthButton.scss'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function AuthButton({ children }: ButtonProps) {
    return (
        <button type="submit" className="auth__button">
            {children}
        </button>
    )
}

export default AuthButton
