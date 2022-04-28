import { Button, CardActions } from '@mui/material'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'
import { storage } from '../../firebase/firebase.config'
import useIsAuthenticated from '../../hooks/useIsAuthenticated'
import Header from '../../layouts/Header/Header'
import { RootState } from '../../store'
import addPost from '../../utils/postServices'
import './UploadPage.scss'

function ImageForm(): JSX.Element {
    const [image, setImage] = useState<File | null>(null)
    const [description, setDescription] = useState<string>('')

    useIsAuthenticated()

    const navigate = useNavigate()
    const uid = useSelector((state: RootState) => state.auth.uid)
    // eslint-disable-next-line no-console
    console.log(uid)

    const handleChange = (e: Event): void => {
        const target = e.target as HTMLInputElement
        const file: File = (target.files as FileList)[0]
        setImage(file)
    }

    const uploadPost = (): void => {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const postRef = ref(storage, `images/${image?.name + v4()}`)
        uploadBytes(postRef, image as Blob).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                const newPost = {
                    image: url,
                    description,
                    author: uid,
                    likes: [],
                    comments: [],
                    id: v4(),
                }
                addPost(newPost).then(() => {
                    navigate('/')
                })
            })
        })
    }

    return (
        <>
            <Header />
            <Divider style={{ margin: '10px' }}>
                <Chip label="Create new post" />
            </Divider>
            <section className="upload__content">
                <TextField
                    id="outlined-full-width"
                    label="Description"
                    style={{ margin: 8 }}
                    multiline
                    placeholder="Enter your description for the image"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    onChange={(event) => setDescription(event.target.value)}
                />
                <TextField
                    id="outlined-full-width"
                    label="Image Upload"
                    style={{ margin: 8 }}
                    name="upload-photo"
                    type="file"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    // eslint-disable-next-line react/jsx-no-bind
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e as unknown as Event)
                    }}
                />
                {image && (
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt="new post image"
                                height="200"
                                image={URL.createObjectURL(image)}
                                title="new post image"
                            />
                            <CardContent>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button
                                size="small"
                                color="primary"
                                onClick={uploadPost}
                            >
                                Upload
                            </Button>
                        </CardActions>
                    </Card>
                )}
            </section>
        </>
    )
}

export default ImageForm
