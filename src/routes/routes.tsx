import { lazy } from "react"

const HomePage = lazy(() => import("../pages/HomePage/HomePage"))
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'))
const RegisterPage = lazy(() => import('../pages/RegisterPage/RegisterPage'))
const UploadPage = lazy(() => import('../pages/UploadPage/UploadPage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'))
const ProfilePage = lazy(() => import('../pages/ProfilePage/ProfilePage/ProfilePage'))
const PostPage = lazy(() => import('../pages/PostPage/PostPage'))


interface Routes {
    path: string
    element: JSX.Element
    key: number
}

export const routes: Routes[] = [
    {
        path: '/',
        element: <HomePage />,
        key: 1,
    },
    {
        path: '/login',
        element: <LoginPage />,
        key: 2,
    },
    {
        path: '/register',
        element: <RegisterPage/>,
        key: 3,
    },
    {
        path: '/upload',
        element: <UploadPage />,
        key: 4,
    },
    {
        path: '/profile/:profileId',
        element: <ProfilePage/>,
        key: 5,
    },
    
    {
        path: `/posts/:postId`,
        element: <PostPage />,
        key: 6,
    },
    {
        path: '*',
        element: <NotFoundPage />,
        key: 7,
    },
]