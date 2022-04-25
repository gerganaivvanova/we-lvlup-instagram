import { ButtonProps } from '../../types/types'
import './AuthButton.scss'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function AuthButton({ children, disabled }: ButtonProps) {
    return (
        <button type="submit" className="auth__button" disabled={disabled}>
            {children}
        </button>
    )
}

export default AuthButton
