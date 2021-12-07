import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    useMediaQuery, IconButton, Toolbar, AppBar, Box
} from '@mui/material/';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import SearchBar from '../atoms/SearchBar'
import MenuAppbar from '../atoms/MenuAppbar'
import MessagesAppbar from '../atoms/MessagesAppbar'
import NotificationsAppbar from '../atoms/NotificationsAppbar'
import ParsLogo from '../atoms/ParsLogo'

export default function Header(props) {
    const theme = useTheme();
    const [moblieSearchBar, setMoblieSearchBar] = React.useState(false);
    const widthChange = useMediaQuery(theme.breakpoints.down('sm'))

    useEffect(() => {
        if (!widthChange && moblieSearchBar) {
            setMoblieSearchBar(!moblieSearchBar)
        }
    }, [widthChange, moblieSearchBar]
    )
    const LeftSection = () => {
        return (
            <>
                <Box sx={{ display: (moblieSearchBar && widthChange) ? 'none' : 'flex', }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        onClick={props.handleDrawer}
                        sx={{
                            mr: 1,
                        }}
                    >
                        <MenuOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <ParsLogo
                            sx={{
                                mx: 3,
                                [theme.breakpoints.down('sm')]: {
                                    mx: 1,
                                },
                            }}
                            size={32}
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
    }

    const RightSection = () => {
        return (
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
    }

    return (
        <AppBar sx={{
            justifyContent: 'space-between',
            overflowX: 'auto',
            zIndex: (theme) => { return theme.zIndex.drawer },
            backgroundColor:
                theme.palette.mode === 'dark' ?
                    theme.palette.grey[1100] :
                    theme.palette.grey[50],
        }}>
            <Toolbar >
                <LeftSection />
                <SearchBar
                    moblieSearchBar={moblieSearchBar}
                    setMoblieSearchBar={setMoblieSearchBar}
                />
                <RightSection />
            </Toolbar>
        </AppBar>
    );
}
