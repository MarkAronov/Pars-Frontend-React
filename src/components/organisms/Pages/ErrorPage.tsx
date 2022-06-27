import React from 'react';

import { Typography, Box } from '@mui/material';

/**
 * The error page
 * @return {JSX.Element} returns an error (currently it's only 404)
 */
const ErrorPage = (): JSX.Element => (
  <Box
    component="main"
    sx={{
      backgroundColor: (theme) =>
        theme.palette.mode === 'dark'
          ? theme.palette.grey[900]
          : theme.palette.grey[100],
      height: '100vh',
      overflow: 'auto',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <Typography
      variant="h2"
      sx={{
        fontSize: '7vw',
      }}
    >
      Error 404: No Such Page.
    </Typography>
  </Box>
);

export default ErrorPage;
