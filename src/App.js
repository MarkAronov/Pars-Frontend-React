import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ProvideAuth } from "./components/Auth"
import PageRouter from './components/PageRouter'

export default function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true });

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
        <ProvideAuth>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <PageRouter />
            </ThemeProvider>
        </ProvideAuth>
    );
}