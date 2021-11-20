import React, { useState } from 'react';
import { Container, Box, Toolbar } from '@mui/material'
import Header from '../molecules/Header';
import Drawers from '../atoms/Drawers'

export default function ContainerPage(props) {
    const [drawerState, setdrawerState] = useState(false);

    const handleDrawer = () => {
        setdrawerState(!drawerState)
    };

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
                <Container width='200' sx={{ my: 4 }}>
                    {props.page}
                </Container>
            </Box>
        </Box>
    );
}
