import React from 'react';
import { useTheme, } from '@mui/material/styles';
import {
    Badge,
    Avatar, IconButton, Toolbar, AppBar, Box
} from '@mui/material/';
import {
    Notifications as NotificationsIcon,
    Mail as MailIcon,
    Menu as MenuIcon,
    // eslint-disable-next-line no-unused-vars
    Search as SearchIcon,
} from '@mui/icons-material/'
import SearchBar from '../atoms/SearchBar'
import AccountMenuIcon from '../atoms/AccountMenuIcon'
import pars from '../../pars.png'
import StaticDrawer from '../atoms/StaticDrawer';

export default function Header() {
    const theme = useTheme();
    const [drawerState, setdrawerState] = React.useState(false);

    const handleDrawer = () => {
        setdrawerState(!drawerState)
    };

    const renderDrawer = (
        <></>
    );
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar >
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Avatar
                        sx={{
                            boxShadow: '0 0 1em rgba(220,0,120,0.4)',
                            width: theme.spacing(4.5),
                            height: theme.spacing(4.5),
                            [theme.breakpoints.up('sm')]: {
                                width: theme.spacing(5),
                                height: theme.spacing(5),
                            },
                            mx: 4,
                        }}
                        src={pars}
                    />
                    <Box sx={{ flexGrow: 1 }} />

                    <SearchBar/>

                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ display: 'flex' }}>
                        <IconButton
                            size={"large"}
                            aria-label="show new mails"
                            color="inherit"
                        >
                            <Badge badgeContent={0} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>

                        <IconButton
                            size="large"
                            aria-label="show new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={0} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>

                        <AccountMenuIcon />
                    </Box>

                </Toolbar>
            </AppBar>
            {renderDrawer}
            <StaticDrawer open={drawerState}/>

        </Box>
    );
}
