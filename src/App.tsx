import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.scss'
import FallbackImage from './components/FallbackImage/FallbackImage'
import routes from './routes/routes'

function App(): JSX.Element {
    return (
        <Suspense fallback={<FallbackImage />}>
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
