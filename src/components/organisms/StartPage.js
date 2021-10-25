import React from 'react'
import { Avatar, Button, Grid, Box, Paper, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import {
    Search as SearchIcon,
    People as PeopleIcon,
    Chat as ChatIcon,
    PlayCircle as PlayCircleIcon
} from '@mui/icons-material/'
import { Link } from "react-router-dom"
import pars from '../../pars.png'
import Footer from '../molecules/Footer'
import SignIn from '../molecules/SignIn'
import SignUp from '../molecules/SignUp'


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
                    <Grid item xs={12} sm={12} >
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
                    <Grid item xs={12} sm={12} >
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

export default function StartPage(props) {
    const theme = useTheme()
    const widthChange = useMediaQuery(theme.breakpoints.up('md'))
    return (
        <Grid
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
            }}
        >
            <Grid
                container
                direction="row"
                sx={{
                    flex: 1,
                    flexDirection: (widthChange) ? 'row' : 'column-reverse'
                }}
            >
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    sx={{
                        backgroundColor:
                            theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Grid
                        component={'span'}
                        sx={{
                            margin: theme.spacing(4, 3),
                            flexDirection: 'column',
                            verticalAlign: 'middle',
                            display: 'block',
                        }}
                    >
                        {
                            [[<SearchIcon />, <>Follow your interests</>],
                            [<PeopleIcon />, <>Make some friends</>],
                            [<ChatIcon />, <>Join the conversation</>],
                            [<PlayCircleIcon />, <>Create original content</>]
                            ].map((value, index) => (
                                <Grid
                                    key={index}
                                    container
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                    sx={{
                                        py: 1.5,
                                        px: 1.5,
                                    }}
                                >
                                    <Grid item >
                                        {value[0]}
                                    </Grid>
                                    <Grid item >
                                        <Typography variant='h6'>
                                            {value[1]}
                                        </Typography>
                                    </Grid>
                                </Grid >
                            ))
                        }
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    sx={{
                        backgroundColor:
                            theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
                        alignItems: 'center',
                        display: (widthChange) ? 'flex' : '',
                        justifyContent: 'center',
                    }}
                    elevation={6}
                    square
                    component={Paper}
                >
                    <Box
                        sx={{
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            width: {
                                xs: '70%',
                                sm: '60%',
                                md: '60%',
                                lg: '55%',
                            },
                            my: 6,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar
                            sx={{
                                margin: theme.spacing(5, 1),
                                boxShadow: '0 0 1em rgba(220,0,120,0.6)',
                            }}
                            src={pars}
                        />

                        <Typography component="h1" variant="h5">
                            See what’s going on at our party right now!
                        </Typography>

                        <Typography component="h1" variant="h6" >
                            Join the information superhighway party NOW!
                        </Typography>

                        <Grid container
                            spacing={3}
                            sx={{
                                margin: theme.spacing(2, 0, 8),
                            }}
                        >
                            <SignButtons mode={props.mode} />
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            <Footer />
        </Grid >
    )
}