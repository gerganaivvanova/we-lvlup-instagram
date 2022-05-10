import Avatar from '@mui/material/Avatar'

export default function ImageAvatar(src: string): JSX.Element {
    return <Avatar alt="Profile Picture" src={src} />
}
