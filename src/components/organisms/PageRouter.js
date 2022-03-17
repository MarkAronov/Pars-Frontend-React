import React from 'react';

import {
  Route,
  Redirect,
  BrowserRouter,
  useParams,
  Switch,
} from 'react-router-dom';

import ContainerPage from './ContainerPage';

import AboutUsPage from './Pages/AboutUsPage';
import ErrorPage from './Pages/ErrorPage';
import ExplorePage from './Pages/ExplorePage';
// eslint-disable-next-line no-unused-vars
import FavoritesPage from './Pages/FavoritesPage';
import HomePage from './Pages/HomePage';
import InterestsPage from './Pages/InterestsPage';
import StartPage from './Pages/StartPage';
import UserPage from './Pages/UserPage';
import SettingsPage from './Pages/SettingsPage';

import StartButtons from '../molecules/StartButtons';
import SignUp from '../molecules/SignUp';
import Login from '../molecules/Login';

import { useAuth } from '../../hooks/useAuth';

/**
 * Routing function, used for routing the app according to a given url
 * @return {JSX.Element} the specific page
 */
const PageRouter = () => {
  const auth = useAuth();

  const UserRoute = () => {
    const { username } = useParams();
    return <UserPage username={username} />;
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {auth.userToken !== null ? (
            <Redirect to="/home" />
          ) : (
            <Redirect to="/start" />
          )}
        </Route>
        <Route path="/aboutus">
          <AboutUsPage />
        </Route>
        <Route path="/home">
          <ContainerPage page={<HomePage />} />
        </Route>
        <Route path="/explore">
          {auth.userToken !== null ? (
            <ContainerPage page={<ExplorePage />} />
          ) : (
            <Redirect to="/start" />
          )}
        </Route>
        <Route path="/interests">
          {auth.userToken !== null ? (
            <ContainerPage page={<InterestsPage />} />
          ) : (
            <Redirect to="/start" />
          )}
        </Route>
        <Route path="/settings">
          {auth.userToken !== null ? (
            <ContainerPage page={<SettingsPage />} />
          ) : (
            <Redirect to="/start" />
          )}
        </Route>
        {/* <Route path="/favorites">
          {auth.userToken !== null ?
                        <ContainerPage page={<FavoritesPage />} /> :
                        <Redirect to="/start" />
          }
        </Route> */}
        <Route path="/user/:username">
          <ContainerPage page={<UserRoute />} />
        </Route>
        <Route path="/start">
          {auth.userToken !== null ? (
            <Redirect to="/home" />
          ) : (
            <StartPage page={<StartButtons />} />
          )}
        </Route>
        <Route path="/signup">
          {auth.userToken !== null ? (
            <Redirect to="/home" />
          ) : (
            <StartPage page={<SignUp />} />
          )}
        </Route>
        <Route path="/login">
          {auth.userToken !== null ? (
            <Redirect to="/home" />
          ) : (
            <StartPage page={<Login />} />
          )}
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default PageRouter;
