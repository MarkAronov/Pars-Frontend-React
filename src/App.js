import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import StartPage from './components/organisms/StartPage';
import { Route, Redirect, BrowserRouter } from "react-router-dom";
import MainPage from "./components/organisms/MainPage";
import { useAuth } from './components/Auth';


export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true });
  const auth = useAuth()

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <Route exact path="/">
          {auth.userToken !== null ?
            <MainPage /> :
            <StartPage mode="none" />
          }
        </Route>

        <Route path="/signup">
          {auth.userToken !== null ?
            <Redirect to="/" /> :
            <StartPage mode="signup" />
          }
        </Route>

        <Route path="/signin">
          {auth.userToken !== null ?
            <Redirect to="/" /> :
            <StartPage mode="signin" />
          }
        </Route>
      </BrowserRouter>
    </ThemeProvider>
  );
}