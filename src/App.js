import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import StartPage from './components/StartPage';
import { Route, BrowserRouter} from "react-router-dom"

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
            <StartPage mode="none"/>
          </Route>

          <Route path="/signup">
            <StartPage mode="signup"/>
          </Route>

          <Route path="/signin">
            <StartPage mode="signin"/>
          </Route>
      </BrowserRouter>
    </ThemeProvider>
  );
}
