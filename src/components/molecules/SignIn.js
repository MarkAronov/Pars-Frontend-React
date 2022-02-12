import React, {useState, useEffect} from 'react';

import {
  Grid, Link, Box,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {useTheme} from '@mui/material/styles';
import {Link as RouterLink} from 'react-router-dom';

import TextInput from '../atoms/TextInputs/TextInput';
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
    email: 'asd@dd.com',
    password: 'Asd123453sasd',
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const [erroredValues, setErroredValues] = useState({
    email: '',
    password: '',
  });
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

    const timeout = setTimeout(() => {
      setErrorDisplayTimer(errorDisplayTimer - 1);
    }, 1000);

    return () => clearTimeout(timeout);
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
    return () => setdisabledSignIn(false);
  }, [data, errors, erroredValues, activeElement, errorDisplayTimer],
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
    return () => setErrors({});
  }, [
    data, activeElement, errorDisplayTimer,
  ]);


  const handleChange = (event) => {
    const {value, id} = event.target;
    setData((data) => ({...data, [id]: value}));
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
    <Box
      component="form"
    >
      <TextInput
        id="email"
        label="Email"
        value={data.email}
        handleChange={handleChange}
        error={errors.email}
        errorTextList={['Invalid Email.']}
        disabled={!hasDataLoaded}
      />
      <TextInput
        id="password"
        label="Password"
        value={data.password}
        handleChange={handleChange}
        error={errors.password}
        errorTextList={['Invalid Password.']}
        disabled={!hasDataLoaded}
      />
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
    </Box>
  );
};

export default SignIn;
