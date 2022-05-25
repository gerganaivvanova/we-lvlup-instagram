import { FieldValue, Timestamp } from 'firebase/firestore'
import assetsObject from '../assets/assetsObject'

export type ButtonProps = {
    // eslint-disable-next-line no-unused-vars
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    children?: React.ReactNode
    disabled?: boolean
}

export type FacebookProps = {
    classType: string
    imageURL: keyof typeof assetsObject
}

export interface IPageProps {
    name: string
}

export interface Post {
    id?: string | undefined
    authorAvatar: string | undefined
    createdAt: FieldValue
    authorName: string
    image: string
    description: string
    author: string | undefined
    likes: string[]
    comments: string[]
}

export interface Story {
    id?: string | undefined
    image: string
    createdAt: Timestamp
    expiredAt: Date
    username: string
    userAvatar: string | undefined
    userId: string
}

export interface Comment {
    comment: string
    author: string
    authorName: string
    authorAvatar: string
    replies: Reply[]
    likes: string[]
    id: string
}

export interface Reply {
    reply: string
    author: string
    authorName: string
    authorAvatar: string
    id: string
}
