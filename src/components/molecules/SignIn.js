/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import {
    TextField, Grid, Button, Link, InputLabel,
    FilledInput, FormControl, IconButton, InputAdornment
} from '@material-ui/core/'
import { makeStyles, } from '@material-ui/core/styles'
import { Visibility, VisibilityOff } from '@material-ui/icons/'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth } from '../Auth'
import axios from 'axios'
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
        email: 'test2@testing.com',
        password: 'Password12345678',
    })
    const [showPassword, setshowPassword] = useState(false)
    const [disabledSignIn, setdisabledSignIn] = useState(true)
    const [errors, setErrors] = useState({
        email: false,
        password: false
    })
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
        (data.email !== "" && data.password !== "" && data.password.length >= 8) ?
            setdisabledSignIn(false) :
            setdisabledSignIn(true)
    }, [data.email, data.password]
    )

    const handleClickShowPassword = () => {
        setshowPassword(!showPassword)
    }

    const handlesignIn = () => {


        // axios.post('http://localhost:3000/users/logout',
        //     {}, {
        //     headers: {
        //         'Access-Control-Allow-Origin': '*',
        //         'Authorization': 'Bearer ' + auth.userToken,
        //     },
        // })
        //     .then(function (res) {
        //         auth.signout()
        //     })
        //     .catch(function (err) {
        //         console.error(err);
        //     })




        axios.post('http://localhost:3000/users/login',
            {
                email: data.email,
                password: data.password
            }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        }
        )
            .then(function (res) {
                console.log(res)
                auth.signin(res.data.token, res.data.user)
            })
            .catch(function (err) {
                if (err.response) {
                    console.error(err.response.data);
                    setErrors(errors => ({
                        ...errors,
                        [err.response.data.toString()]: true
                    }))
                }
            })
    }

    const handleMouseDownPassword = event => {
        event.preventDefault()
    }

    return (
        <>
            <form className={classes.form} >
                <TextField
                    variant="filled"
                    margin="normal"
                    fullWidth
                    id="email"
                    label="email"
                    value={data.email}
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
                    //type="submit"
                    variant="contained"
                    onClick={handlesignIn}
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