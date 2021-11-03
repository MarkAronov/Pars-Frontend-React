import React from 'react';
import { Route, Redirect, BrowserRouter, useParams, Switch } from "react-router-dom";
import { useAuth } from './Auth';
import StartPage from './organisms/StartPage';
import ContainerPage from './organisms/ContainerPage'
import ErrorPage from './organisms/ErrorPage'
import HomePage from './organisms/HomePage'
import UserPage from './organisms/UserPage'
import SignUp from './molecules/SignUp'
import SignButtons from './molecules/SignButtons'
import SignIn from './molecules/SignIn'

export default function PageRouter() {
    const auth = useAuth()

    const UserRoute = () => {
        const { name } = useParams()
        const userdetails = (auth.user.name === name) ? auth.user : auth.findUser(name).result
        if (auth.userToken !== null) {
            return <UserPage user={userdetails} />
        }
        return <Redirect to="/start" />
    }

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
                <Route path="/user/:name">
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