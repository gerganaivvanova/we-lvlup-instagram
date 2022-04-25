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

export default interface IPageProps {
    name: string
}
