/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import {
    TextField, Grid, Button, Link, InputLabel, FilledInput, FormControl,
    FormHelperText, IconButton, InputAdornment,
} from '@material-ui/core/'
import { makeStyles, } from '@material-ui/core/styles'
import { Visibility, VisibilityOff } from '@material-ui/icons/'
import { Link as RouterLink } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    form: {
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    errorlist: {
        display: "block"
    },
}))

const SignUp = () => {
    const classes = useStyles()
    const [data, setData] = useState({
        username: '',
        email: '',
        emailRepeat: '',
        password: '',
        passwordRepeat: '',
    })
    const [disabledSignUp, setdisabledSignUp] = useState(true)
    const [emailRepeatError, setemailRepeatError] = useState(false)
    const [usernameValidationError, setusernameValidationError] = useState(false)
    const [emailValidationError, setemailValidationError] = useState(false)
    const [passwordRepeatError, setpasswordRepeatError] = useState(false)
    const [passwordValidationError, setpasswordValidationError] = useState(false)
    const [passwordErrorList, setpasswordErrorList] = useState([])
    const [showPassword, setshowPassword] = useState(false)
    const [showPasswordRepeat, setshowPasswordRepeat] = useState(false)

    const handleChange = event => {
        const { value, id } = event.target
        setData(data => ({ ...data, [id]: value }))
    }

    useEffect(() => {
        (data.username !== "" &&
            data.password !== "" &&
            data.email !== "" &&
            data.emailRepeat !== "" &&
            data.passwordRepeat !== "" &&
            !emailRepeatError &&
            !emailValidationError &&
            !passwordRepeatError &&
            !passwordValidationError) ?
            setdisabledSignUp(false) :
            setdisabledSignUp(true)
    },
        [data.username, data.password,
        data.email, data.emailRepeat,
        data.passwordRepeat, emailRepeatError,
            emailValidationError, passwordRepeatError,
            passwordValidationError]
    )
    /**
        const timer = setTimeout(() => {

        }, 500)
        return () => {
            clearTimeout(timer)
        }
    */

    useEffect(() => {
        (data.username !== "" ) ?
            setusernameValidationError(true) :
            setusernameValidationError(false)
    }, [data.username]
    )

    useEffect(() => {
        (data.email !== "") ?
            setemailValidationError(true) :
            setemailValidationError(false)
    }, [data.email]
    )

    useEffect(() => {
        if (data.password !== "") {
            setpasswordValidationError(true)
        }
        else {
            setpasswordValidationError(false)
        }
    }, [data.password]
    )

    useEffect(() => {
        (data.email !== data.emailRepeat && data.emailRepeat !== "") ?
            setemailRepeatError(true) :
            setemailRepeatError(false)
    }, [data.email, data.emailRepeat]
    )

    useEffect(() => {
        (data.password !== data.passwordRepeat && data.passwordRepeat !== "") ?
            setpasswordRepeatError(true) :
            setpasswordRepeatError(false)
    }, [data.password, data.passwordRepeat]
    )

    const handleClickShowPassword = () => {
        setshowPassword(!showPassword)
    }

    const handleClickShowPasswordRepeat = () => {
        setshowPasswordRepeat(!showPasswordRepeat)
    }

    const handleMouseDownPassword = event => {
        event.preventDefault()
    }

    const signUpHandle = () => {
        console.log(data)
    }

    return (
        <>
            <form className={classes.form} noValidate>
                <TextField
                    error={usernameValidationError}
                    helperText={usernameValidationError ? "Invalid Username." : ""}
                    value={data.username}
                    variant="filled"
                    fullWidth
                    id="username"
                    label="Username"
                    onChange={handleChange}
                />
                <TextField
                    error={emailValidationError}
                    helperText={emailValidationError ? "Invalid Email." : ""}
                    value={data.email}
                    variant="filled"
                    fullWidth
                    id="email"
                    label="Email Address"
                    onChange={handleChange}
                />
                <TextField
                    error={emailRepeatError}
                    helperText={emailRepeatError ? "Emails don't match." : ""}
                    value={data.emailRepeat}
                    variant="filled"
                    fullWidth
                    id="emailRepeat"
                    label="Repeat your Email"
                    onChange={handleChange}
                />
                <FormControl
                    id="passwordform"
                    fullWidth variant="filled"
                    error={passwordValidationError}
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
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    {passwordValidationError ?
                        <FormHelperText
                            error={true}
                            id="component-helper-text"
                        >
                            {passwordErrorList.map((error, i) => <span key={i} className={classes.errorlist} >{error}</span>)}
                        </FormHelperText> :
                        <></>
                    }
                </FormControl>
                <FormControl
                    id="passwordform"
                    fullWidth variant="filled"
                    error={passwordRepeatError}
                >
                    <InputLabel htmlFor="password">Repeat your password</InputLabel>
                    <FilledInput
                        helpertext={passwordRepeatError ? "Passwords don't match." : ""}
                        id="passwordRepeat"
                        type={showPasswordRepeat ? 'text' : 'password'}
                        value={data.passwordRepeat}
                        onChange={handleChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPasswordRepeat}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPasswordRepeat ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    {passwordRepeatError ?
                        <FormHelperText
                            error={true}
                            id="component-helper-text"
                        >
                            Passwords don't match
                        </FormHelperText> :
                        <></>
                    }
                </FormControl>
                <Button
                    id="signup"
                    disabled={disabledSignUp}
                    fullWidth
                    type="submit"
                    variant="contained"
                    onSubmit={signUpHandle}
                    className={classes.submit}
                >
                    Sign Up
                </Button>


            </form >
            <Grid container >
                <Grid item>
                    <Link component={RouterLink} color="inherit" variant="body2" to="/signin">
                        Already have an account? Sign In instead
                    </Link>
                </Grid>
            </Grid>
        </>
    )
}

export default SignUp