import React, {useState, useEffect} from 'react'
import {
    TextField, Grid, Button, Link, InputLabel, FilledInput, FormControl,
    FormHelperText, IconButton, InputAdornment,
} from '@material-ui/core/'
import { makeStyles, } from '@material-ui/core/styles'
import { Visibility, VisibilityOff } from '@material-ui/icons/'
import {emailVerifier, passwordVerifier, usernameVerifier} from '../verifiers'
const useStyles = makeStyles(theme => ({
    form: {
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

const SignUp = (props) => {
    const classes = useStyles()
    const handleSign = props.handleClickChnageSign
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
    const [showPassword, setshowPassword] = useState(false)
    const [showPasswordRepeat, setshowPasswordRepeat] = useState(false)

    const handleChange = event  => {
        const {value, id} = event.target
        setData(data => ({...data, [id]: value}))
    }

    useEffect(() => {
        (   data.username       !== "" && 
            data.password       !== "" && 
            data.email          !== "" &&
            data.emailRepeat    !== "" &&
            data.passwordRepeat !== "" &&
            !emailRepeatError     &&
            !passwordRepeatError)?
            setdisabledSignUp(false):
            setdisabledSignUp(true)        
       }, [ data.username,data.password, 
            data.email, data.emailRepeat, 
            data.passwordRepeat, emailRepeatError, 
            passwordRepeatError]
    )
    /**
        const timer = setTimeout(() => {

        }, 500)
        return () => {
            clearTimeout(timer)
        }
    */

    useEffect(() => {
        (data.username !== "" && !usernameVerifier(data.username))?
            setusernameValidationError(true):
            setusernameValidationError(false)
        }, [data.username]
    )

    useEffect(() => {
        (data.email !== "" && !emailVerifier(data.email))?
            setemailValidationError(true):
            setemailValidationError(false)
        }, [data.email]
    )

    useEffect(() => {
        (data.password !== "" && !passwordVerifier(data.password))?
            setpasswordValidationError(true):
            setpasswordValidationError(false)
        }, [data.password]
    )

    useEffect(() => {
            (data.email !== data.emailRepeat && data.emailRepeat !== "")?
            setemailRepeatError(true):
            setemailRepeatError(false)
        }, [data.email, data.emailRepeat]
    )

    useEffect(() => {
            (data.password !== data.passwordRepeat && data.passwordRepeat !== "")?
            setpasswordRepeatError(true):
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
        <form className={classes.form} noValidate>
            <TextField
                error={usernameValidationError}
                helperText={usernameValidationError? "Invalid Username." : ""}
                value={data.username}
                variant="filled"
                fullWidth
                id="username"
                label="Username"
                onChange={handleChange}
            />
            <TextField
                error={emailValidationError}
                helperText={emailValidationError? "Invalid Email." : ""}
                value={data.email}
                variant="filled"
                fullWidth
                id="email"
                label="Email Address"
                onChange={handleChange}
            />
            <TextField
                error={emailRepeatError}
                helperText={emailRepeatError? "Emails don't match." : ""}
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
                <FormHelperText 
                        error={passwordValidationError} 
                        id="component-helper-text"
                >
                    {passwordValidationError? "Invalid password." : ""}
                </FormHelperText>                
            </FormControl>

            <FormControl
                id="passwordform"
                fullWidth variant="filled"
                error={passwordRepeatError}
            >
                <InputLabel htmlFor="password">Repeat your password</InputLabel>
                <FilledInput
                    helperText={passwordRepeatError? "Passwords don't match." : ""}   
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
                <FormHelperText 
                        error={passwordRepeatError} 
                        id="component-helper-text"
                >
                    {passwordRepeatError? "Passwords don't match" : ""}
                </FormHelperText>
            </FormControl>
            <Button
                id="signup"
                disabled={disabledSignUp}
                fullWidth
                type="button"
                variant="contained"
                onClick={signUpHandle}
                className={classes.submit}
            >
                Sign Up
            </Button>

            <Grid container >
                <Grid item xs>
                    <Link component="button" color="inherit" id="signIn" onClick={handleSign} variant="body2">
                        Already have an account? Sign In instead
                    </Link>
                </Grid>
            </Grid>
        </form >        
    )
}

export default SignUp