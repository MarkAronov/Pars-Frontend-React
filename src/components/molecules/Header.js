import React, { useEffect } from 'react';
import { useTheme, } from '@mui/material/styles';
import {
    useMediaQuery, Avatar, IconButton, Toolbar, AppBar, Box
} from '@mui/material/';
import {
    Menu as MenuIcon,
} from '@mui/icons-material/'
import SearchBar from '../atoms/SearchBar'
import MenuAppbar from '../atoms/MenuAppbar'
import MessagesAppbar from '../atoms/MessagesAppbar'
import NotificationsAppbar from '../atoms/NotificationsAppbar'
import pars from '../../pars.png'
import Drawers from '../atoms/Drawers';

export default function Header() {
    const theme = useTheme();
    const [drawerState, setdrawerState] = React.useState(false);
    const [moblieSearchBar, setMoblieSearchBar] = React.useState(false);
    const widthChange = useMediaQuery(theme.breakpoints.down('sm'))

    const handleDrawer = () => {
        setdrawerState(!drawerState)
    };

    useEffect(() => {
        if (!widthChange && moblieSearchBar) {
            setMoblieSearchBar(!moblieSearchBar)
        }
    }, [widthChange, moblieSearchBar]
    )
    const leftSection = (
        <>
            <Box
                sx={{
                    display: (moblieSearchBar && widthChange) ? 'none' : 'flex'
                }}
            >
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    onClick={handleDrawer}
                >
                    <MenuIcon />
                </IconButton>
                <IconButton
                    size="small"
                    sx={{
                        mx: 3,
                        [theme.breakpoints.down('sm')]: {
                            mx: 1,
                        },
                    }}
                >
                    <Avatar
                        sx={{
                            boxShadow: '0 0 1em rgba(220,0,120,0.4)',
                        }}
                        src={pars}
                    />
                </IconButton>
            </Box>
            <Box
                sx={{
                    flexGrow: (moblieSearchBar && widthChange) ? 0 : 1
                }}
            />
        </>
    )

    const rightSection = (
        <>
            <Box sx={{
                display: (moblieSearchBar && widthChange) ? 'none' : 'flex',
                flexGrow: 1,
                [theme.breakpoints.down('sm')]: {
                    flexGrow: 0
                },
            }} />
            <Box sx={{ display: (moblieSearchBar && widthChange) ? 'none' : 'flex', }}>
                <MessagesAppbar />
                <NotificationsAppbar />
                <MenuAppbar />
            </Box>
        </>
    )

    return (
        <Box >
            <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar >
                    {leftSection}
                    <SearchBar
                        moblieSearchBar={moblieSearchBar}
                        setMoblieSearchBar={setMoblieSearchBar}
                    />
                    {rightSection}
                </Toolbar>
            </AppBar>
            <Drawers drawerState={drawerState} setdrawerState={setdrawerState} />
        </Box>
    );
}
