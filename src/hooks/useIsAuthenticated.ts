import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from './typed-hooks'

const useIsAuthenticated = (): void => {
    const navigate = useNavigate()

    const authenticated = useAppSelector((state) => state.auth.isAuthenticated)

    useEffect(() => {
        if (!authenticated) {
            navigate('/login')
        }
    }, [authenticated, navigate])
}

export default useIsAuthenticated
