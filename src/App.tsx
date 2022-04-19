import { Routes, Route } from 'react-router-dom'
import './App.scss'
import LoginPage from './pages/LoginPage/LoginPage'

function App(): JSX.Element {
    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </div>
    )
}

export default App
