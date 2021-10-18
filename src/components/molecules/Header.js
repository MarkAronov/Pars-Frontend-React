import React from 'react';
import { useTheme, styled, alpha } from '@mui/material/styles';
import {
    Badge, InputBase,
    Avatar, IconButton, Toolbar, AppBar, Box
} from '@mui/material/';
import {
    Notifications as NotificationsIcon,
    Mail as MailIcon,
    Menu as MenuIcon,
    Search as SearchIcon,
} from '@mui/icons-material/'
import AccountMenuIcon from '../atoms/AccountMenuIcon'
import pars from '../../pars.png'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 3,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 0, 1, 0),
        paddingLeft: `calc(0.5em + ${theme.spacing(0.5)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

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
            <AppBar>
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

                    <Search >
                        <StyledInputBase
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>

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
        </Box>
    );
}



// import React from 'react';
// import { useTheme, styled, alpha } from '@mui/material/styles';
// import {
//     Badge, InputBase,
//     Avatar, IconButton, Toolbar, AppBar, Drawer,
//     Divider, List, ListItemText, ListItem, ListItemIcon
// } from '@mui/material/';
// import {
//     Notifications as NotificationsIcon,
//     Mail as MailIcon,
//     Inbox as InboxIcon,
//     Menu as MenuIcon,
//     Search as SearchIcon,
//     ChevronLeft as ChevronLeftIcon,
//     ChevronRight as ChevronRightIcon,
// } from '@mui/icons-material/'
// import AccountMenuIcon from '../atoms/AccountMenuIcon'
// import pars from '../../pars.png'


// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import AccountCircle from '@mui/icons-material/AccountCircle';


// const drawerWidth = 240;

// const useStyles = makeStyles(theme => ({
//     grow: {
//         flexGrow: 1,
//         margin: theme.spacing(1, 1),
//     },
//     logo: {
//         boxShadow: '0 0 1em rgba(220,0,120,0.4)',
//         width: theme.spacing(4.5),
//         height: theme.spacing(4.5),
//         marginLeft: 15,
//     },
//     search: {
//         position: 'relative',
//         borderRadius: theme.shape.borderRadius,
//         width: 'auto',
//         backgroundColor:
//             theme.palette.type === 'dark' ? alpha(theme.palette.common.white, 0.15) : alpha(theme.palette.common.black, 0.25),
//         '&:hover': {
//             backgroundColor: theme.palette.type === 'dark' ? alpha(theme.palette.common.white, 0.25) : alpha(theme.palette.common.black, 0.35),
//         },
//         [theme.breakpoints.up('sm')]: {
//             width: 'auto',
//         },
//     },
//     searchIcon: {
//         width: theme.spacing(7),
//         height: '100%',
//         position: 'absolute',
//         pointerEvents: 'none',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         color: theme.palette.type === 'dark' ? theme.palette.grey[50] : theme.palette.grey[900],
//     },
//     inputRoot: {
//         color: theme.palette.type === 'dark' ? theme.palette.grey[50] : theme.palette.grey[900],
//     },
//     inputInput: {
//         padding: theme.spacing(1, 1, 1, 7),
//         transition: theme.transitions.create('width'),
//         width: '100%',
//         [theme.breakpoints.up('md')]: {
//             width: 200,
//         },
//     },
//     section: {
//         display: 'flex',
//     },

//     appBar: {
//         zIndex: theme.zIndex.drawer + 1,
//         transition: theme.transitions.create(['width', 'margin'], {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.leavingScreen,
//         }),
//         colorPrimary:
//             theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
//     },
//     appBarShift: {
//         marginLeft: drawerWidth,
//         width: `calc(100% - ${drawerWidth}px)`,
//         transition: theme.transitions.create(['width', 'margin'], {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.enteringScreen,
//         }),
//     },

//     drawer: {
//         width: drawerWidth,
//         flexShrink: 0,
//         whiteSpace: 'nowrap',
//     },
//     toolbar: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'flex-end',
//         padding: theme.spacing(0, 1),
//         ...theme.mixins.toolbar,
//     },
//     content: {
//         flexGrow: 1,
//         padding: theme.spacing(3),
//     },
// }));

// export default function Header() {
//     const classes = useStyles();
//     const theme = useTheme();
//     const [drawerState, setdrawerState] = React.useState(false);

//     const handleDrawer = () => {
//         setdrawerState(!drawerState)
//     };

//     const renderDrawer = (
//         <Drawer
//             className={classes.drawer}
//             anchor="left"
//             open={drawerState}
//             classes={{
//                 paper: classes.drawerPaper,
//             }}
//             onClose={handleDrawer}
//         >
//             <div className={classes.drawerHeader}>
//                 <IconButton onClick={handleDrawer}>
//                     {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
//                 </IconButton>
//             </div>
//             <Divider />
//             <List>
//                 {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//                     <ListItem button key={text}>
//                         <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//                         <ListItemText primary={text} />
//                     </ListItem>
//                 ))}
//             </List>
//             <Divider />
//             <List>
//                 {['All mail', 'Trash', 'Spam'].map((text, index) => (
//                     <ListItem button key={text}>
//                         <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//                         <ListItemText primary={text} />
//                     </ListItem>
//                 ))}
//             </List>
//         </Drawer>
//     );
//     return (
//         <div className={classes.grow}>
//             <AppBar className={classes.appbar} variant='regular'>
//                 <Toolbar >
//                     <IconButton
//                         edge="start"
//                         className={classes.menuButton}
//                         aria-label="open drawer"
//                         onClick={handleDrawer}
//                     >
//                         <MenuIcon />
//                     </IconButton>
//                     <Avatar className={classes.logo} src={pars} />
//                     <div className={classes.grow} />
//                     <div className={classes.search}>
//                         <div className={classes.searchIcon}>
//                             <SearchIcon />
//                         </div>
//                         <InputBase
//                             placeholder="Search"
//                             classes={{
//                                 root: classes.inputRoot,
//                                 input: classes.inputInput,
//                             }}
//                             inputProps={{ 'aria-label': 'search' }}
//                         />
//                     </div>
//                     <div className={classes.grow} />
//                     <div className={classes.section}>
//                         <IconButton aria-label="show new mails">
//                             <Badge badgeContent={0} color="secondary">
//                                 <MailIcon />
//                             </Badge>
//                         </IconButton>
//                         <IconButton aria-label="show new notifications">
//                             <Badge badgeContent={0} color="secondary">
//                                 <NotificationsIcon />
//                             </Badge>
//                         </IconButton>
//                         <AccountMenuIcon />
//                     </div>
//                 </Toolbar>
//             </AppBar>
//             {renderDrawer}
//         </div>
//     );
// }
