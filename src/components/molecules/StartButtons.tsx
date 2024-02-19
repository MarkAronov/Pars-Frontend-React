import React from 'react';

import { Button, Grid } from '@mui/material';

import { Link } from 'react-router-dom';

/**
 * The a chooser component
 * It let's the user the choice of either loging up or loging in
 * @return {JSX.Element} returns a signbuttons component
 */
const StartButtons = () => (
  <Grid container spacing={3}>
    <Grid item xs={12} sm={12}>
      <Button
        id="login"
        type="button"
        fullWidth
        variant="contained"
        component={Link}
        to="/login"
      >
        Log In
      </Button>
    </Grid>
    <Grid item xs={12} sm={12}>
      <Button
        id="signup"
        type="button"
        fullWidth
        variant="outlined"
        component={Link}
        to="/signup"
      >
        Sign Up
      </Button>
    </Grid>
  </Grid>
);

export default StartButtons;
