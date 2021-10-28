import React, { useState } from 'react';
import { Container, Box, Toolbar } from '@mui/material'
import Header from '../molecules/Header';
import Drawers from '../atoms/Drawers'
import UserPage from './UserPage'
import HomePage from './HomePage'
import { Route, Redirect, Switch, useParams } from "react-router-dom";
import { useAuth } from '../Auth';

export default function ContainerPage() {
    const [drawerState, setdrawerState] = useState(false);
    const auth = useAuth()

    const handleDrawer = () => {
        setdrawerState(!drawerState)
    };

    const UserRoute = () => {
        const { name } = useParams()
        const userdetails = (auth.user.name === name) ? auth.user : auth.findUser(name).result
        if (auth.userToken !== null) {
            return <UserPage user={userdetails} />
        }
        return <Redirect to="/" />
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <Header sx={{ position: 'sticky' }} handleDrawer={handleDrawer} />
            <Drawers
                drawerState={drawerState}
                setdrawerState={setdrawerState}
                handleDrawer={handleDrawer}
            />
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                            ? theme.palette.grey[900] :
                            theme.palette.grey[100],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Switch>
                        <Route exact path="/home">
                            {auth.userToken !== null ?
                                <HomePage /> :
                                <Redirect to="/" />
                            }
                        </Route>
                        <Route exact path="/user/:name">
                            {auth.userToken !== null ?
                                <UserRoute /> :
                                <Redirect to="/" />
                            }
                        </Route>
                    </Switch>
                </Container>
            </Box>
        </Box>
    );
}
