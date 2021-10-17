import React, { useEffect } from 'react';
import {
    TextField, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, Button
} from '@material-ui/core/';


export default function MainPage() {
    const [values, setValues] = React.useState({
        title: '',
        content: '',
    });
    const [disabledPost, setDisabledPost] = React.useState(false)

    useEffect(() => {
        (values.title !== "" && values.content !== "") ?
            setDisabledPost(true) :
            setDisabledPost(false)
    }, [values.title, values.content]
    )

    const handleChange = event => {
        const { value, id } = event.target
        setValues(values => ({ ...values, [id]: value }))
    }

    const PostHandle = () => { };

    return (
        <Dialog
            fullWidth={true}
            maxWidth={'sm'}
            open={false}
            onClose={PostHandle}
            aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle id="max-width-dialog-title">Create a New Post</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You can also upload a picture or a any other media type
                </DialogContentText>
                <form noValidate>

                    <TextField
                        id="title"
                        placeholder="Title"
                        fullWidth
                        margin="normal"
                        variant="filled"
                        onChange={handleChange}
                        value={values.title}
                    />

                    <Button
                        variant="contained"
                        component="label"
                        fullWidth
                        rows="2"
                    >
                        Upload File
                        <input
                            type="file"
                            style={{ display: "none" }}
                        />
                    </Button>
                    <TextField
                        id="content"
                        placeholder="Text"
                        helperText="Be Creative!"
                        fullWidth
                        multiline
                        rows="4"
                        margin="normal"
                        variant="filled"
                        onChange={handleChange}
                        value={values.content}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button
                    disabled={disabledPost}
                    type="submit"
                    onClick={PostHandle()}
                    color="primary">
                    Post
                </Button>
                <Button onClick={PostHandle} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
