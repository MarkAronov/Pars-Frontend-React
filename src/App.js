import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Route, Redirect, BrowserRouter } from "react-router-dom";
import { useAuth } from './components/Auth';
import StartPage from './components/organisms/StartPage';
import ContainerPage from './components/organisms/ContainerPage'

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
                        <Redirect to="/home" /> :
                        <StartPage mode="none" />
                    }
                </Route>
                <Route path="/:path">
                    {auth.userToken !== null ?
                        <ContainerPage /> :
                        <StartPage mode="none" />
                    }
                </Route>
                <Route path="/signup">
                    {auth.userToken !== null ?
                        <Redirect to="/home" /> :
                        <StartPage mode="signup" />
                    }
                </Route>
                <Route path="/signin">
                    {auth.userToken !== null ?
                        <Redirect to="/home" /> :
                        <StartPage mode="signin" />
                    }
                </Route>
            </BrowserRouter>
        </ThemeProvider>
    );
}