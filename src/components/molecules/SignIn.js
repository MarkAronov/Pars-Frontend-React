/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';

import {
  Box, TextField, Grid, Button, Link, InputLabel, FormHelperText,
  FilledInput, FormControl, IconButton, InputAdornment,
} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material/';

import {Link as RouterLink} from 'react-router-dom';

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
  const [showPassword, setshowPassword] = useState(false);
  const [disabledSignIn, setdisabledSignIn] = useState(true);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const handleChange = (event) => {
    const {value, id} = event.target;
    if (id !== 'showPassword') {
      setData((data) => ({
        ...data,
        [id]: value,
      }));
    } else {
      setData((data) => ({
        ...data,
        [id]: !value,
      }));
    }
  };

  useEffect(() => {
    setErrors((errors) => ({
      errors: false,
    }));
        (data.email !== '' &&
        data.password !== '' &&
        data.password.length >= 8) ?
            setdisabledSignIn(false) :
            setdisabledSignIn(true);
  }, [data.email, data.password],
  );

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const handleSignIn = async () => {
    const results = await auth.signIn(data.email, data.password);
    console.log(results);

    if (results !== undefined) {
      setErrors((errors) => ({
        ...errors,
        [results.data.replace('Error: ', '')]: true,
      }));
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <form >
        <TextField
          error={errors.email}
          helperText={errors.email ? 'Invalid Email.' : ''}
          value={data.email}
          variant="filled"
          fullWidth
          id="email"
          label="email"
          onChange={handleChange}
        />
        <FormControl
          id="passwordform"
          fullWidth variant="filled"
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
                          {'Invalid password'}
                        </FormHelperText> :
                        <></>
          }
        </FormControl>
        <Button
          id="signin"
          disabled={disabledSignIn}
          fullWidth
          // type="submit"
          variant="contained"
          onClick={handleSignIn}
          sx={{margin: theme.spacing(3, 0, 2)}}
        >
          {'Sign In'}
        </Button>

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
