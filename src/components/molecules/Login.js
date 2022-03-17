import React, { useState, useEffect } from 'react';

import { Grid, Link, Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

import TextInput from '../atoms/TextInputs/TextInput';
import { useAuth } from '../../hooks/useAuth';
import { emailChecker } from '../../funcs/checkers';
/**
 * The login component
 * @return {JSX.Element} returns a login component
 */
const Login = () => {
  const theme = useTheme();
  const auth = useAuth();
  const formKeys = [
    ['email', 'Email'],
    ['password', 'Password'],
  ];
  // const [data, setData] = useState(
  //   formKeys.reduce(
  //     (object, key) => ({
  //       ...object,
  //       [key]: '',
  //     }),
  //     {}
  //   )
  // );
  const [data, setData] = useState({
    email: 'asd@dd.com',
    password: 'Asd123453sasd',
  });
  const [errors, setErrors] = useState(
    formKeys.reduce(
      (object, key) => ({
        ...object,
        [key[0]]: {
          state: false,
          message: null,
          data: null,
        },
      }),
      {}
    )
  );
  const [disabledLogin, setDisabledLogin] = useState(true);
  const [hasDataLoaded, setHasDataLoaded] = useState(true);
  const errorMap = {
    email: {
      state:
        emailChecker(data.email, errors.email.data, 'login').length !== 0 &&
        data.email !== '',
      message: emailChecker(data.email, errors.email.data, 'login'),
    },
    password: {
      state: data.password === errors.password.data && data.password !== '',
      message: ['Incorrect password'],
    },
  };

  useEffect(() => {
    setDisabledLogin(true);
    formKeys.forEach((key) => {
      setErrors((errors) => ({
        ...errors,
        [key[0]]: {
          ...errors[key[0]],
          state: false,
        },
      }));
    });
    const timeout = setTimeout(() => {
      formKeys.forEach((key) => {
        setErrors((errors) => ({
          ...errors,
          [key[0]]: {
            ...errors[key[0]],
            state: errorMap[key[0]].state,
            message: errorMap[key[0]].message,
          },
        }));
      });

      setDisabledLogin(false);
    }, 1000);

    return () => {
      setDisabledLogin(false);
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setData((data) => ({ ...data, [id]: value }));
  };

  const handleLogin = async () => {
    setHasDataLoaded(false);
    const results = await auth.dispatch({
      type: 'login',
      params: {
        email: data.email,
        password: data.password,
      },
    });
    setHasDataLoaded(true);

    if (results !== null && results !== undefined) {
      for (const key of Object.keys(results)) {
        if (results[key].length !== 0) {
          const msgArr = [];
          results[key].forEach((res) => msgArr.push(res[1]));
          setErrors((errors) => ({
            ...errors,
            [key]: {
              state: true,
              message: msgArr,
              data: data[key],
            },
          }));
        }
      }
      setDisabledLogin(true);
    }
  };

  return (
    <Box component="form">
      {formKeys.map((value) => (
        <TextInput
          key={value}
          id={value[0]}
          label={value[1]}
          value={data[value[0]]}
          handleChange={handleChange}
          error={errors[value[0]].state}
          errorTextList={errors[value[0]].message}
          disabled={!hasDataLoaded}
        />
      ))}
      <LoadingButton
        id="login"
        disabled={
          disabledLogin ||
          !Object.keys(data).every((key) => data[key] !== '') ||
          !Object.keys(errors).every((key) => !errors[key].state) ||
          data.password.length < 10
        }
        loading={!hasDataLoaded}
        fullWidth
        variant="contained"
        onClick={handleLogin}
        sx={{ margin: theme.spacing(3, 0, 2) }}
      >
        {'Log In'}
      </LoadingButton>
      <Grid container direction="row" alignItems="center">
        <Grid item xs>
          <Link component={RouterLink} color="inherit" variant="body2" to="/">
            {'Forgot password?'}
          </Link>
        </Grid>
        <Grid item>
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

export default Login;
