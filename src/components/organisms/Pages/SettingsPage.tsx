import React from 'react';

import { Grid, Paper, Container } from '@mui/material';

import { useTheme } from '@mui/material/styles';

/**
 * The user's page
 * @param {object} props object file that contains the user's name
 * @return {JSX.Element} returns a user page
 */
const SettingsPage = (props: object): JSX.Element => {
  const theme = useTheme();

  return (
    <Container>
      <Grid
        container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '5px',
          position: 'relative',
          backgroundColor:
            theme.palette.mode === 'dark'
              ? theme.palette.grey[900]
              : theme.palette.grey[50],
        }}
        component={Paper}
      ></Grid>
    </Container>
  );
};

export default SettingsPage;
