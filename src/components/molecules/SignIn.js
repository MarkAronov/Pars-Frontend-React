import React, { useState, useEffect } from 'react'
import {
    TextField, Grid, Button, Link, InputLabel,
    FilledInput, FormControl, IconButton, InputAdornment
} from '@material-ui/core/'
import { makeStyles, } from '@material-ui/core/styles'
import { Visibility, VisibilityOff } from '@material-ui/icons/'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth } from '../Auth'

const useStyles = makeStyles(theme => ({
    form: {
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))


const SignIn = () => {
    const classes = useStyles()
    const auth = useAuth()
    const [data, setData] = useState({
        username: '',
        password: '',
    })
    const [showPassword, setshowPassword] = useState(false)
    const [disabledSignIn, setdisabledSignIn] = useState(true)

    const handleChange = event => {
        const { value, id } = event.target
        if (id !== "showPassword") {
            setData(data => ({
                ...data,
                [id]: value
            }))
        }
        else {
            setData(data => ({
                ...data,
                [id]: !value
            }))
        }
    }

    useEffect(() => {
        (data.username !== "" && data.password !== "" && data.password.length >= 8) ?
            setdisabledSignIn(false) :
            setdisabledSignIn(true)
    }, [data.username, data.password]
    )

    const handleClickShowPassword = () => {
        setshowPassword(!showPassword)
    }

    const handlesignIn = () => {
        localStorage.setItem("token", "set");
    }

    const handleMouseDownPassword = event => {
        event.preventDefault()
    }

    return (
        <>
            <form className={classes.form} onSubmit={handlesignIn} >
                <TextField
                    variant="filled"
                    margin="normal"
                    fullWidth
                    id="username"
                    label="Username"
                    value={data.username}
                    onChange={handleChange}
                />
                <FormControl
                    id="passwordform"
                    fullWidth variant="filled"
                >
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <FilledInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={data.password}
                        onChange={handleChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    id="showPassword"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <Button
                    id="signin"
                    disabled={disabledSignIn}
                    fullWidth
                    type="submit"
                    variant="contained"
                    className={classes.submit}
                >
                    Sign In
                </Button>

                <Grid container >
                    <Grid item xs>
                        <Link component={RouterLink} color="inherit" variant="body2" to="/">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item >
                        <Link component={RouterLink} color="inherit" variant="body2" to="/signup">
                            New to Pars? Sign Up
                        </Link>
                    </Grid>

                </Grid>
            </form >
        </>
    )
}

export default SignIn