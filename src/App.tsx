import { Routes, Route } from 'react-router-dom'
import './App.scss'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import HomePage from './pages/HomePage/HomePage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import UploadPage from './pages/UploadPage/UploadPage'
import PostPage from './pages/PostPage/PostPage'
import ProfilePage from './pages/ProfilePage/ProfilePage/ProfilePage'

function App(): JSX.Element {
    return (
        <div className="App">
            <Routes>
                <Route path="/posts/:postId" element={<PostPage />} />
                <Route path="/profile/:profileId" element={<ProfilePage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    )
}

export default App
