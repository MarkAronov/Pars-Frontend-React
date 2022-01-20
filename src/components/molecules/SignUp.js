import React, {useState, useEffect} from 'react';

import {
  Box, TextField, Grid, Link, InputLabel, FilledInput, FormControl,
  FormHelperText, IconButton, InputAdornment, Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {useTheme} from '@mui/material/styles';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material/';

import {Link as RouterLink} from 'react-router-dom';
import * as Valid from 'validator';

import useActiveElement from '../../hooks/useActiveElement';
import usePrevious from '../../hooks/usePrevious';
import {useAuth} from '../../hooks/useAuth';

/**
 * The SignUp component
 * @return {JSX.Element} returns a signup component
 */
const SignUp = () => {
  const theme = useTheme();
  const auth = useAuth();
  const [data, setData] = useState({
    username: 'asd',
    email: 'asd@dd.com',
    emailRepeat: 'asd@dd.com',
    password: 'Asd123453sasd',
    passwordRepeat: 'Asd123453sasd',
  });
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    emailRepeat: false,
    password: false,
    passwordRepeat: false,
  });
  const [erroredValues, setErroredValues] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [passwordErrorList, setpasswordErrorList] = useState([]);

  const [showPassword, setshowPassword] = useState(false);
  const [showPasswordRepeat, setshowPasswordRepeat] = useState(false);
  const [disabledSignUp, setdisabledSignUp] = useState(true);
  const [errorDisplayTimer, setErrorDisplayTimer] = useState(0);
  const [hasDataLoaded, setHasDataLoaded] = useState(true);

  const {activeElement, listenersReady} = useActiveElement();
  const prevData = usePrevious(data);


  /**
   * Removes dupes in array
   * @param {array} arr the error array list
   * @return {object} returns a filtered array
   */
  const filterDupes = (arr) => {
    const map = new Map();
    let filtered = [];
    for (const a of arr) {
      if (map.get(a) === undefined) {
        map.set(a, true);
        filtered = filtered.concat(a);
      }
    }
    return filtered;
  };

  /**
   * The passwordChecker component, checks for whether if the
   * password meets the minimum requirements
   * @param {string} str the password
   * @param {array} passwordErrors the error array list
   * @return {object} returns a signup component
   */
  const passwordChecker = (str, passwordErrors) => {
    const lowercase = str.match(/[a-z]/);
    const uppercase = str.match(/[A-Z]/);
    const numbers = str.match(/[0-9]/);

    passwordErrors = [];
    // Minimum: 10 chars | 1 Uppercase | 1 lowercase | 1 digit
    if (str.length < 10) {
      passwordErrors.push('Password is less than 10 characters');
    }
    if (!lowercase) {
      passwordErrors.push('Password must have at least one lowercase');
    }
    if (!uppercase) {
      passwordErrors.push('Password must have at least one uppercase');
    }
    if (!numbers) {
      passwordErrors.push('Password must have at least one digit');
    }
    setpasswordErrorList(passwordErrors);

    // Password entropy used to mesure the strenght
    const Entropy = str.length * Math.log2(filterDupes(str.split('')).length);

    return {passwordErrors, Entropy};
  };

  const getAsyncTimer = async () =>{
    return errorDisplayTimer;
  };


  useEffect(() => {
    if (!errorDisplayTimer) return;

    const intervalId = setInterval(() => {
      setErrorDisplayTimer(errorDisplayTimer - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [errorDisplayTimer]);

  useEffect(() => {
    setdisabledSignUp(
        data.username === '' ||
        data.email === '' ||
        data.emailRepeat === '' ||
        data.password === '' ||
        data.passwordRepeat === '' ||
        errors.username ||
        errors.email ||
        errors.emailRepeat ||
        errors.password ||
        errors.passwordRepeat ||
        (errorDisplayTimer !== 0 &&
        activeElement?.id !== undefined),
    );
  }, [data, errors, erroredValues, activeElement, errorDisplayTimer],
  );

  useEffect(async () => {
    const {passwordErrors, Entropy} =
    passwordChecker(data.password, passwordErrorList);
    const errorMap = new Map([
      ['username', (data.username.length >= 64 ||
                    erroredValues.username === data.username),
      ],
      ['email', (!Valid.isEmail(data.email) && !Valid.isEmpty(data.email)||
                erroredValues.email === data.email),
      ],
      ['emailRepeat', (data.email !== data.emailRepeat &&
                      data.emailRepeat !== ''),
      ],
      ['password', (data.password !== '' && passwordErrors.length !== 0)],
      ['passwordRepeat', (data.password !== data.passwordRepeat &&
                          data.passwordRepeat !== ''),
      ],
    ]);

    console.log(Entropy);

    if (listenersReady) {
      setErrors((prevState) =>(
        {...prevState,
          [activeElement?.id]: false,
        }));

      if (prevData !== data ) setErrorDisplayTimer(2);
      const time = await getAsyncTimer();

      if ((!time && prevData === data ) || !activeElement?.id) {
        for (const key of errorMap.keys()) {
          setErrors((prevState) =>(
            {...prevState,
              [key]: errorMap.get(key),
            }));
        }
      }
    }
  }, [
    data, activeElement, errorDisplayTimer,
  ]);


  const handleChange = (event) => {
    const {value, id} = event.target;
    setData((data) => ({...data, [id]: value}));
  };

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const handleClickShowPasswordRepeat = () => {
    setshowPasswordRepeat(!showPasswordRepeat);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const signUpHandle = async () => {
    setHasDataLoaded(false);
    const results = await auth.signUp(data.username, data.email, data.password);
    setHasDataLoaded(true);

    if (results !== undefined) {
      for (const key of Object.keys(results)) {
        if (results[key].length !== 0) {
          setErrors((prevState) =>(
            {...prevState,
              [key]: true,
            }));
          setErroredValues((prevErrors) =>(
            {...prevErrors,
              [key]: data[key],
            }));
        }
      }
    }
  };


  return (
    <Box
      component="form"
    >
      <TextField
        error={errors.username}
        helperText={errors.username ?
          <Typography
            component={'span'}
            sx={{display: 'block'}}
          >
            {(erroredValues.username === data.username)?
                  `Username is already taken.`:
                  `Invalid Username.`
            }
          </Typography> :
          ''
        }
        value={data.username}
        variant="filled"
        fullWidth
        id="username"
        label="Username"
        onChange={handleChange}
        disabled={!hasDataLoaded}
      />
      <TextField
        error={errors.email}
        helperText={errors.email ?
          <Typography
            component={'span'}
            sx={{display: 'block'}}
          >
            {(erroredValues.email === data.email)?
                  `Email is already taken.`:
                  `Invalid Email.`
            }
          </Typography> :
          ''
        }
        value={data.email}
        variant="filled"
        fullWidth
        id="email"
        label="Email Address"
        onChange={handleChange}
        disabled={!hasDataLoaded}
      />
      <TextField
        error={errors.emailRepeat}
        helperText={errors.emailRepeat ?
          <Typography
            component={'span'}
            sx={{display: 'block'}}
          >
            {`Emails don't match.`}
          </Typography> :
          ''
        }
        value={data.emailRepeat}
        variant="filled"
        fullWidth
        id="emailRepeat"
        label="Repeat your Email"
        onChange={handleChange}
        disabled={!hasDataLoaded}
      />
      <FormControl
        id="passwordform"
        fullWidth
        variant="filled"
        disabled={!hasDataLoaded}
        error={errors.password}
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
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          }
        />
        {errors.password ?
                    <FormHelperText
                      error={true}
                      id="component-helper-text"
                      sx={{
                        alignItems: 'center',
                      }}
                    >
                      {
                        passwordErrorList.map((error, i) =>
                          <Typography
                            component={'span'}
                            key={i}
                            sx={{display: 'block'}}
                          >
                            {error}
                          </Typography>)
                      }
                    </FormHelperText> :
                    <></>
        }
      </FormControl>
      <FormControl
        id="passwordform"
        fullWidth
        variant="filled"
        disabled={!hasDataLoaded}
        error={errors.passwordRepeat}
      >
        <InputLabel htmlFor="password">Repeat your password</InputLabel>
        <FilledInput
          id="passwordRepeat"
          type={showPasswordRepeat ? 'text' : 'password'}
          value={data.passwordRepeat}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPasswordRepeat}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {(showPasswordRepeat) ?
                    <VisibilityIcon /> :
                    <VisibilityOffIcon />
                }
              </IconButton>
            </InputAdornment>
          }
        />
        {errors.passwordRepeat ?
                    <FormHelperText
                      error={true}
                      id="component-helper-text"
                      sx={{
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        component={'span'}
                        sx={{display: 'block'}}
                      >
                        {`Passwords don't match`}
                      </Typography>
                    </FormHelperText> :
                    <></>
        }
      </FormControl>
      <LoadingButton
        id="signup"
        disabled={disabledSignUp}
        loading={!hasDataLoaded}
        fullWidth
        variant="contained"
        onClick={signUpHandle}
        sx={{margin: theme.spacing(3, 0, 2)}}
      >
        <Typography
          component={'span'}
          sx={{display: 'block'}}
        >
          {`Sign Up`}
        </Typography>
      </LoadingButton>
      <Grid container >
        <Grid item>
          <Link
            component={RouterLink}
            color="inherit"
            variant="body2"
            to="/signin"
          >
            <Typography
              component={'span'}
              sx={{display: 'block'}}
            >
              {`Already have an account? Sign In instead`}
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUp;
