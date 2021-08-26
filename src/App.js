import React, { useState, useContext, createContext } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import StartPage from './components/organisms/StartPage';
import { Route, Redirect, BrowserRouter } from "react-router-dom";
import MainPage from "./components/organisms/MainPage";

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () => createTheme({
      palette: {
        type: prefersDarkMode ? 'dark' : 'light',
      },
    }),
    [prefersDarkMode],
  );
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/">
          {localStorage.getItem("token") !== null ?
            <MainPage /> :
            <StartPage mode="none" />
          }
        </Route>

        <Route path="/signup">
          {localStorage.getItem("token") !== null ?
            <Redirect to="/" /> :
            <StartPage mode="signup" />
          }
        </Route>

        <Route path="/signin">
          {localStorage.getItem("token") !== null ?
            <Redirect to="/" /> :
            <StartPage mode="signin" />
          }
        </Route>
      </BrowserRouter>
    </ThemeProvider>
  );
}
