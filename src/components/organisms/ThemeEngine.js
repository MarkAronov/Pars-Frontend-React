import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, useMediaQuery } from '@mui/material';

import PageRouter from './PageRouter';

/**
 * Theming function, here we use our own presets for the app
 * @return {JSX.Element} the app
 */
const ThemeEngine = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', {
    noSsr: true,
  });

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PageRouter />
    </ThemeProvider>
  );
};

export default ThemeEngine;
