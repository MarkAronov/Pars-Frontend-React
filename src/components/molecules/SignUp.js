import React, {useState, useEffect} from 'react';

import {
  Box, Grid, Link, Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {useTheme} from '@mui/material/styles';

import {Link as RouterLink} from 'react-router-dom';
import * as Valid from 'validator';

import TextInput from '../atoms/TextInputs/TextInput';
import useActiveElement from '../../hooks/useActiveElement';
import usePrevious from '../../hooks/usePrevious';
import {useAuth} from '../../hooks/useAuth';
import passwordChecker from '../../funcs/PasswordChecker';
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

  const [disabledSignUp, setdisabledSignUp] = useState(true);
  const [errorDisplayTimer, setErrorDisplayTimer] = useState(0);
  const [hasDataLoaded, setHasDataLoaded] = useState(true);

  const {activeElement, listenersReady} = useActiveElement();
  const prevData = usePrevious(data);


  const getAsyncTimer = async () =>{
    return errorDisplayTimer;
  };


  useEffect(() => {
    if (!errorDisplayTimer) return;

    const timeout = setTimeout(() => {
      setErrorDisplayTimer(errorDisplayTimer - 1);
    }, 1000);

    return () => clearTimeout(timeout);
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
    return () => setdisabledSignUp(false);
  }, [data, errors, erroredValues, activeElement, errorDisplayTimer],
  );

  useEffect(async () => {
    // eslint-disable-next-line no-unused-vars
    const {passwordErrors, Entropy} =
    passwordChecker(data.password, passwordErrorList, setpasswordErrorList);
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


    if (listenersReady) {
      setErrors((prevState) =>(
        {...prevState,
          [activeElement?.id]: false,
        }));

      if (prevData !== data ) setErrorDisplayTimer(1);
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
      <TextInput
        id="username"
        label="Username"
        value={data.username}
        handleChange={handleChange}
        error={errors.username}
        errorTextList={
          (erroredValues.username === data.username)?
            ['Username is already taken.']:
            ['Invalid Username.']
        }
        disabled={!hasDataLoaded}
      />
      <TextInput
        id="email"
        label="Email"
        value={data.email}
        handleChange={handleChange}
        error={errors.email}
        errorTextList={
          (erroredValues.email === data.email)?
            ['Email is already taken.']:
            ['Invalid Email.']
        }
        disabled={!hasDataLoaded}
      />
      <TextInput
        id="emailRepeat"
        label="Repeat your Email"
        value={data.emailRepeat}
        handleChange={handleChange}
        error={errors.emailRepeat}
        errorTextList={['Emails don\'t match.']}
        disabled={!hasDataLoaded}
      />
      <TextInput
        id="password"
        label="Password"
        value={data.password}
        handleChange={handleChange}
        error={errors.password}
        errorTextList={passwordErrorList}
        disabled={!hasDataLoaded}
      />
      <TextInput
        id="passwordRepeat"
        label="Repeat your password"
        value={data.passwordRepeat}
        handleChange={handleChange}
        error={errors.passwordRepeat}
        errorTextList={['Passwords don\'t match']}
        disabled={!hasDataLoaded}
      />
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
