import React from 'react';

import { Route, Redirect, BrowserRouter, useParams, Switch } from "react-router-dom";

import ContainerPage from './ContainerPage';

import StartPage from './Pages/StartPage';
import ErrorPage from './Pages/ErrorPage';
import HomePage from './Pages/HomePage';
import UserPage from './Pages/UserPage';

import SignButtons from '../molecules/SignButtons';
import SignUp from '../molecules/SignUp';
import SignIn from '../molecules/SignIn';

import { useAuth } from '../../hooks/useAuth';

export default function PageRouter() {
    const auth = useAuth();

    const UserRoute = () => {
        const { username } = useParams();

        if (auth.userToken !== null) {
            return( <UserPage username={username} />);
        }
        return <Redirect to="/start" />;
    };
    
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    {auth.userToken !== null ?
                        <Redirect to="/home" /> :
                        <Redirect to="/start" />
                    }
                </Route>
                <Route path="/home">
                    {auth.userToken !== null ?
                        <ContainerPage page={<HomePage />} /> :
                        <Redirect to="/start" />
                    }
                </Route>
                <Route path="/explore">
                    {auth.userToken !== null ?
                        <ContainerPage page={<HomePage />} /> :
                        <Redirect to="/start" />
                    }
                </Route>
                <Route path="/interests">
                    {auth.userToken !== null ?
                        <ContainerPage page={<HomePage />} /> :
                        <Redirect to="/start" />
                    }
                </Route>
                <Route path="/favorites">
                    {auth.userToken !== null ?
                        <ContainerPage page={<HomePage />} /> :
                        <Redirect to="/start" />
                    }
                </Route>
                <Route path="/user/:username">
                    {auth.userToken !== null ?
                        <ContainerPage page={<UserRoute />} /> :
                        <Redirect to="/start" />
                    }
                </Route>
                <Route path="/start">
                    {auth.userToken !== null ?
                        <Redirect to="/home" /> :
                        <StartPage page={<SignButtons />} />
                    }
                </Route>
                <Route path="/signup">
                    {auth.userToken !== null ?
                        <Redirect to="/home" /> :
                        <StartPage page={<SignUp />} />
                    }
                </Route>
                <Route path="/signin">
                    {auth.userToken !== null ?
                        <Redirect to="/home" /> :
                        <StartPage page={<SignIn />} />
                    }
                </Route>
                <Route path="*">
                    <ErrorPage />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}