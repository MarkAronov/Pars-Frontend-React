import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import PageRouter from './PageRouter'

export default function ThemeEngine() {
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
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <PageRouter />
        </ThemeProvider>
    );
}