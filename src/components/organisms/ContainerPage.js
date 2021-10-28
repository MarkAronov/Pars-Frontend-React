import React, { useState } from 'react';
import { Container, Box } from '@mui/material'
import Header from '../molecules/Header';
import Drawers from '../atoms/Drawers'
import UserPage from './UserPage'
import HomePage from './HomePage'
import { Route, Redirect, useParams } from "react-router-dom";
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
        <Container maxWidth="lg">
            <Header sx={{ position: 'sticky' }} handleDrawer={handleDrawer} />
            <Drawers
                drawerState={drawerState}
                setdrawerState={setdrawerState}
                handleDrawer={handleDrawer}
            />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
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
            </Box>
        </Container>
    );
}
