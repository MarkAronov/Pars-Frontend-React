import React, { useEffect } from 'react';
import Header from '../molecules/Header';
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, Button
} from '@material-ui/core/';


const useStyles = makeStyles(theme => ({
    header: {
        position: 'sticky',
        
    },
}))

export default function MainPage() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        title: '',
        content: '',
        disabledPost: true,
    });

    const HandleChange = prop => event => {
        let title = document.getElementById("title");
        let content = document.getElementById("content");

        if (title.value === "" || content.value === "") {
            setValues({
                ...values,
                [prop]: event.target.value,
                disabledPost: true,
            });
        }
        else {
            setValues({
                ...values,
                [prop]: event.target.value,
                disabledPost: false,
            });
        }
    };

    useEffect(() => { });


    const PostHandle = () => {
    };

    return (
        <React.Fragment>
            <Header className={classes.header} />





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
                    <form className={classes.form} noValidate>

                        <TextField
                            id="title"
                            placeholder="Title"
                            fullWidth
                            margin="normal"
                            variant="filled"
                            onChange={HandleChange('title')}
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
                            onChange={HandleChange('content')}
                            value={values.content}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        disabled={values.disabledPost}
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
        </React.Fragment>
    );
}
