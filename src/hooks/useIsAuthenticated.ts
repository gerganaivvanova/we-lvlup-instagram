import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadState } from '../store/browser-storage'

const useIsAuthenticated = (): void => {
    const navigate = useNavigate()

    const authenticated = loadState()

    useEffect(() => {
        if (!authenticated) {
            navigate('/login')
        }
    })
}

export default useIsAuthenticated
