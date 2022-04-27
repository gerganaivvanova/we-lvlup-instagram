import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from '../../layouts/Header/Header'
import { isAuthenticatedSelector } from '../../store/selectors/auth'

function HomePage(): JSX.Element {
    const navigate = useNavigate()
    const authenticated = useSelector(isAuthenticatedSelector)

    useEffect(() => {
        if (!authenticated) {
            navigate('/login')
        }
    })

    return (
        <>
            <Header />
            <div className="main">
                <h1>Home Page</h1>
            </div>
        </>
    )
}

export default HomePage
