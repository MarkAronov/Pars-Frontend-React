import * as React from 'react';
import {
    SwipeableDrawer as MuiSwipeableDrawer, Drawer as MuiDrawer, Toolbar, List,
    Divider, ListItem, ListItemIcon, ListItemText, useMediaQuery
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Inbox as InboxIcon, Mail as MailIcon } from '@mui/icons-material/';

const drawerWidth = 200;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: '0',
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const StaticDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const SwipeableDrawer = styled(MuiSwipeableDrawer)(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function Drawers(props) {
    const theme = useTheme()
    const widthChange = useMediaQuery(theme.breakpoints.up('sm'))
    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        props.setdrawerState(open)
    }
    const drawerContent =
        (<>
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </>)

    return (
        (widthChange) ?
            (
                <StaticDrawer
                    variant="permanent"
                    open={props.drawerState}
                >
                    < Toolbar />
                    {drawerContent}
                </StaticDrawer>
            ) :
            (
                <SwipeableDrawer
                    open={props.drawerState}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                >
                    < Toolbar />
                    {drawerContent}
                </SwipeableDrawer>
            )
    );
}
