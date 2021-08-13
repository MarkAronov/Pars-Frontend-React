import React, { useEffect } from 'react';
import Header from './Header';
import { makeStyles } from '@material-ui/core/styles';
// eslint-disable-next-line
import {
    Grid, CssBaseline, TextField, Fab,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button
} from '@material-ui/core/';
import Router from './Router';
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line
import CreateIcon from '@material-ui/icons/Create';



const useStyles = makeStyles(theme => ({
    header: {
        position: 'fixed',
    },
    contents: {
        display: 'flex',

    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        left: theme.spacing(2),
    },
}))

export default function MainPage() {
    const classes = useStyles();
    const [OpenFab, setOpenFab] = React.useState(false);
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

    const handleOpenFab = () => {
        setOpenFab(true);
    };

    const handleCloseFab = () => {
        setOpenFab(false);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Header className={classes.header} />

            <Grid container style={{
                marginTop: '100px',
            }}>
                <Grid container item xs={12}
                    direction="column"
                    alignItems="center">
                    <BrowserRouter>
                        <Router />
                    </BrowserRouter>


                </Grid>
                <Fab aria-label='Add' className={classes.fab} color='secondary' onClick={handleOpenFab}>
                    <CreateIcon />
                </Fab>
            </Grid>







            <Dialog
                fullWidth={true}
                maxWidth={'sm'}
                open={OpenFab}
                onClose={handleCloseFab}
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
                    <Button onClick={handleCloseFab} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
