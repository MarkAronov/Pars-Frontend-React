import React from 'react';
import { useTheme, alpha, makeStyles } from '@material-ui/core/styles';
import {
    Menu, MenuItem, Badge, InputBase,
    Avatar, IconButton, Toolbar, AppBar, Drawer,
    Divider, List, ListItemText, ListItem, ListItemIcon
} from '@material-ui/core/';
import {
    Notifications as NotificationsIcon,
    Mail as MailIcon,
    Inbox as InboxIcon,
    Menu as MenuIcon,
    Search as SearchIcon,
    AccountCircle as AccountCircleIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
} from '@material-ui/icons/'
import { useAuth } from '../Auth'
import pars from '../../pars.png'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
        margin: theme.spacing(3, 3),
    },
    logo: {
        boxShadow: '0 0 1em rgba(220,0,120,0.4)',
        marginRight: 27,
        width: theme.spacing(4.5),
        height: theme.spacing(4.5),
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor:
            theme.palette.type === 'dark' ? alpha(theme.palette.common.white, 0.15) : alpha(theme.palette.common.black, 0.25),
        '&:hover': {
            backgroundColor: theme.palette.type === 'dark' ? alpha(theme.palette.common.white, 0.25) : alpha(theme.palette.common.black, 0.35),
        },
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.type === 'dark' ? theme.palette.grey[50] : theme.palette.grey[900],
    },
    inputRoot: {
        color: theme.palette.type === 'dark' ? theme.palette.grey[50] : theme.palette.grey[900],
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'flex',
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 15,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function PrimarySearchAppBar() {
    const classes = useStyles();
    const theme = useTheme();
    const auth = useAuth()
    const [values, setValues] = React.useState({
        anchorEl: null,
        mobileMoreAnchorEl: null,
    });

    const [drawerState, setdrawerState] = React.useState(false);

    const handleDrawer = () => {
        setdrawerState(!drawerState)
    };

    const isMenuOpen = Boolean(values.anchorEl);

    const handleProfileMenuOpen = event => {
        setValues({ ...values, anchorEl: event.currentTarget, });
    };

    const handleMenuClose = () => {
        setValues({ ...values, anchorEl: null, mobileMoreAnchorEl: null, });
    };

    const handleSignOut = async () => {
        const result = await auth.signOut()
        console.log(result);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={values.anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        </Menu>
    );
    const renderDrawer = (
        <Drawer
            className={classes.drawer}
            anchor="left"
            open={drawerState}
            classes={{
                paper: classes.drawerPaper,
            }}
            onClose={handleDrawer}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawer}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
    return (
        <div className={classes.grow}>
            <AppBar className={classes.appbar} variant='regular'>
                <Toolbar >
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        aria-label="open drawer"
                        onClick={handleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Avatar className={classes.logo} src={pars} />
                    <div className={classes.grow} />

                    <div
                        className={classes.search}
                    >
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow} />


                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show new mails">
                            <Badge badgeContent={0} color="secondary">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton aria-label="show new notifications">
                            <Badge badgeContent={0} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                        >
                            <AccountCircleIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderDrawer}
            {renderMenu}
        </div>
    );
}
