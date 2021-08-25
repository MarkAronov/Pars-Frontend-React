import React from 'react'
// eslint-disable-next-line
import { Avatar, Button, CssBaseline, Grid, Typography, useMediaQuery } from '@material-ui/core/'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Search, PeopleAlt, Chat, PlayCircleFilled } from '@material-ui/icons/'
import { Link } from "react-router-dom"
import pars from '../pars.png'
import Footer from './Footer'
// eslint-disable-next-line
import SignIn from './molecules/SignIn'
// eslint-disable-next-line
import SignUp from './molecules/SignUp'
// eslint-disable-next-line

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
    },
    image: {
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'cover',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
    },
    paper: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '60%',
    },
    avatar: {
        margin: theme.spacing(5, 1),
        boxShadow: '0 0 1em rgba(220,0,120,0.6)',
    },
    title: {
        margin: theme.spacing(0, 4),
        alignItems: 'left',
    },
    forms: {
        margin: theme.spacing(2, 0, 8),
    },
    paragraph: {
        display: 'flex',
        flexDirection: 'column '
    },
    intro: {
        margin: theme.spacing(4, 3),
        flexDirection: 'column',
        verticalAlign: 'middle',
        display: 'block',
    },
    main: {
        height: '23333px'
    }
}))

const SignButtons = (props) => {
    const [values, setValues] = React.useState({
        mode: props.mode,
    })
    const handleClickChnageSign = event => {
        setValues({ ...values, mode: event.currentTarget.id })
    }

    const handleMouseDownSign = event => {
        event.preventDefault()
    }
    let component = null
    switch (values.mode) {
        case 'none':
            component =
                <>
                    <Grid item xs={12} sm={12}>
                        <Button
                            id='signin'
                            type="button"
                            fullWidth
                            variant="contained"
                            onClick={handleClickChnageSign}
                            onMouseDown={handleMouseDownSign}
                            component={Link}
                            to="/signin"
                        >
                            Sign In
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Button
                            id='signup'
                            type="button"
                            fullWidth
                            variant="outlined"
                            onClick={handleClickChnageSign}
                            onMouseDown={handleMouseDownSign}
                            component={Link}
                            to="/signup"
                        >
                            Sign Up
                        </Button>
                    </Grid>
                </>
            break
        case 'signin':
            component = <SignIn handleClickChnageSign={handleClickChnageSign} />
            break
        case 'signup':
            component = <SignUp handleClickChnageSign={handleClickChnageSign} />
            break
        default:
            break
    }
    return (component)
}

const LockScreen = (props) =>{
    const theme = useTheme()
    const widthChange = useMediaQuery(theme.breakpoints.up('md'))
    const classes = useStyles()
    return (
        <Grid className={classes.root}>
            <CssBaseline />
            <Grid container direction="row" style={{ flex: 1, flexDirection: (widthChange) ? 'row' : 'column-reverse' }}>
                <Grid item xs={12} sm={12} md={6} className={classes.image} >
                    <Typography component={'span'} variant='h6' className={classes.intro}>
                        <p ><span ><Search /></span> Follow your interests.</p>
                        <p><span><PeopleAlt /></span> Hear what people are talking about.</p>
                        <p><span><Chat /></span> Join the conversation.</p>
                        <p><span><PlayCircleFilled /></span> Create original content.</p>
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} elevation={0} square="true">
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar} src={pars} />
                        <Typography component={'span'} variant='h5'>
                            See what’s going on at our party right now!
                        </Typography>
                        <Typography component={'span'} variant="h6" >
                            Join the information superhighway party NOW!
                        </Typography>
                        <Grid container spacing={2} className={classes.forms}>
                            <SignButtons mode={props.mode}/>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
            <Footer />
        </Grid >
    )
}
export default LockScreen