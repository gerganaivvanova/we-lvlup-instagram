import useIsAuthenticated from '../../hooks/useIsAuthenticated'
import Header from '../../layouts/Header/Header'

function HomePage(): JSX.Element {
    useIsAuthenticated()

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
