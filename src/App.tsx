import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.scss'
import { routes } from './routes/routes'

function App(): JSX.Element {
    return (
        <Suspense
            fallback={
                <img
                    className="img__fallback"
                    src="./assets/images/logo512.png"
                    alt="Instagram Logo"
                />
            }
        >
            <div className="App">
                <Routes>
                    {routes.map((route) => (
                        <Route
                            key={route.key}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                </Routes>
            </div>
        </Suspense>
    )
}

export default App
