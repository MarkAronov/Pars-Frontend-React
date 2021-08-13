import React from 'react';
import { useTheme, fade, makeStyles } from '@material-ui/core/styles';
import {
    Menu, MenuItem, Badge, InputBase,
    Typography, IconButton, Toolbar, AppBar, Drawer,
    Divider, List, ListItemText, ListItem, ListItemIcon
} from '@material-ui/core/';
import {
    Notifications as NotificationsIcon, Mail as MailIcon,
    Inbox as InboxIcon, Menu as MenuIcon, Search as SearchIcon,
    AccountCircle as AccountCircleIcon, MoreVert as MoreIcon,
    ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon,
} from '@material-ui/icons/'
import clsx from 'clsx';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },

    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        color:
            theme.palette.type === 'dark' ? theme.palette.grey[50] : theme.palette.grey[700],
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor:
            theme.palette.type === 'dark' ? fade(theme.palette.common.white, 0.15) : fade(theme.palette.common.black, 0.25),
        '&:hover': {
            backgroundColor: theme.palette.type === 'dark' ? fade(theme.palette.common.white, 0.25) : fade(theme.palette.common.black, 0.35),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
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
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
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
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
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
    const [values, setValues] = React.useState({
        anchorEl: null,
        mobileMoreAnchorEl: null,
    });
    // eslint-disable-next-line

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    const isMenuOpen = Boolean(values.anchorEl);
    const isMobileMenuOpen = Boolean(values.mobileMoreAnchorEl);

    // eslint-disable-next-line
    const HandleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleProfileMenuOpen = event => {
        setValues({ ...values, anchorEl: event.currentTarget, });
    };

    const handleMobileMenuClose = () => {
        setValues({ ...values, mobileMoreAnchorEl: null, });
    };

    const handleMenuClose = () => {
        setValues({ ...values, anchorEl: null, mobileMoreAnchorEl: null, });
    };

    const handleSignOut = () => {

        window.location.reload();

    };

    const handleMobileMenuOpen = event => {
        setValues({ ...values, mobileMoreAnchorEl: event.currentTarget, });
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

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={values.mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show new mails" >
                    <Badge badgeContent={0} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show new notifications" >
                    <Badge badgeContent={0} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"

                >
                    <AccountCircleIcon />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <>
            <div className={classes.grow}>
                <AppBar className={classes.appbar}>
                    <Toolbar >
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Pars!
                    </Typography>
                        <div className={classes.search} color="inherit"
                        >
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
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
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                            >
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>

                {renderMobileMenu}
                {renderMenu}
            </div>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
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
        </>
    );
}
