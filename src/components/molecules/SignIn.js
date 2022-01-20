import React, {useState, useEffect} from 'react';

import {
  TextField, Grid, Link, InputLabel, FormHelperText,
  FilledInput, FormControl, IconButton, InputAdornment, Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {useTheme} from '@mui/material/styles';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material/';

import {Link as RouterLink} from 'react-router-dom';

import useActiveElement from '../../hooks/useActiveElement';
import usePrevious from '../../hooks/usePrevious';
import {useAuth} from '../../hooks/useAuth';
/**
 * The SignIn component
 * @return {JSX.Element} returns a signin component
 */
const SignIn = () => {
  const theme = useTheme();
  const auth = useAuth();
  const [data, setData] = useState({
    email: 'test2@testing.com',
    password: 'Password12345678',
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const [erroredValues, setErroredValues] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setshowPassword] = useState(false);
  const [disabledSignIn, setdisabledSignIn] = useState(true);
  const [errorDisplayTimer, setErrorDisplayTimer] = useState(0);
  const [hasDataLoaded, setHasDataLoaded] = useState(true);

  const {activeElement, listenersReady} = useActiveElement();
  const prevData = usePrevious(data);


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
    setdisabledSignIn(
        data.email === '' ||
        data.password === '' ||
        errors.email ||
        errors.password ||
        data.password.length < 8 ||
        (errorDisplayTimer !== 0 &&
        activeElement?.id !== undefined),
    );
  }, [data, errors, activeElement, errorDisplayTimer],
  );

  useEffect(async () => {
    const errorMap = new Map([
      ['email', (erroredValues.email === data.email)],
      ['password', (erroredValues.password === data.password)],
    ]);

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

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSignIn = async () => {
    setHasDataLoaded(false);
    const results = await auth.signIn(data.email, data.password);
    setHasDataLoaded(true);

    if (results !== undefined) {
      setErrors((errors) => ({
        ...errors,
        [results]: true,
      }));
      setErroredValues((prevErrors) =>(
        {...prevErrors,
          [results]: data[results],
        }));
    }
  };


  return (
    <>
      <form >
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
          label="email"
          onChange={handleChange}
          disabled={!hasDataLoaded}
        />
        <FormControl
          id="passwordform"
          fullWidth
          variant="filled"
          error={errors.password}
          disabled={!hasDataLoaded}
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
                  id="showPassword"
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
          id="signin"
          disabled={disabledSignIn}
          loading={!hasDataLoaded}
          fullWidth
          variant="contained"
          onClick={handleSignIn}
          sx={{margin: theme.spacing(3, 0, 2)}}
        >
          {'Sign In'}
        </LoadingButton>

      </form>
      <Grid
        container
        direction="row"
        alignItems="center"
      >
        <Grid item xs>
          <Link
            component={RouterLink}
            color="inherit"
            variant="body2"
            to="/"
          >
            {'Forgot password?'}
          </Link>
        </Grid>
        <Grid item >
          <Link
            component={RouterLink}
            color="inherit"
            variant="body2"
            to="/signup"
          >
            {'New to Pars? Sign Up'}
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

export default SignIn;
