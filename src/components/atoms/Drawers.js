import React from 'react';
import PropTypes from 'prop-types';

import {
  SwipeableDrawer as MuiSwipeableDrawer,
  Drawer as MuiDrawer, Toolbar, Link, List,
  Divider, ListItemButton, ListItemIcon,
  ListItemText, useMediaQuery, IconButton,
} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import {
  MenuOutlined as MenuOutlinedIcon,
  Home as HomeIcon,
  HomeOutlined as HomeOutlinedIcon,
  Explore as ExploreIcon,
  ExploreOutlined as ExploreOutlinedIcon,
  Interests as InterestsIcon,
  InterestsOutlined as InterestsOutlinedIcon,
  // eslint-disable-next-line no-unused-vars
  FavoriteBorder as FavoriteBorderIcon,
  // eslint-disable-next-line no-unused-vars
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
} from '@mui/icons-material/';

import {useLocation} from 'react-router-dom';

import ParsLogo from './CustomIcons/ParsLogo';

const drawerWidth = 180;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  height: '100%',
  top: 0,
  [theme.breakpoints.up('sm')]: {
    height: 'calc(100% -64px)',
    top: 64,
  },
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: '0',
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
  height: 'calc(100% -64px)',
  top: 64,
});

const StaticDrawer = styled(MuiDrawer,
    {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
      borderRight: 0,
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      paper: {
        color: (theme.palette.mode === 'dark') ?
                theme.palette.grey[1000] :
                theme.palette.grey[50],
      },
      ...(open && {
        ...openedMixin(theme, true),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
);

const SwipeableDrawer = styled(MuiSwipeableDrawer)(
    ({theme, open}) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme, false),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
    }),
);

/**
 * The Drawers component
 * @param {object} props object file that contains all the needed props to
 *                       control the Drawers
 * @return {JSX.Element} returns a Drawers component
 */
const Drawers = (props) => {
  const theme = useTheme();
  const location = useLocation();
  const widthChange = useMediaQuery(theme.breakpoints.down('sm'));
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    props.setdrawerState(open);
  };

  const drawerItemComponent = (props) => {
    const listData = props;

    return (
      <List>
        {
          listData.map((value, index) => (
            <ListItemButton
              sx={{pl: 3}}
              component={Link}
              href={value[3]}
              key={value[2]}
            >
              <ListItemIcon>
                {(location.pathname === value[3]) ? value[1] : value[0]}
              </ListItemIcon>
              <ListItemText primary={value[2]} />
            </ListItemButton>
          ))
        }
      </List>
    );
  };

  const drawerContent =
        (
          <>
            {drawerItemComponent(
                [[<HomeOutlinedIcon key={1}/>,
                  <HomeIcon key={2}/>,
                  'Home', '/home'],
                [<ExploreOutlinedIcon key={1}/>,
                  <ExploreIcon key={2}/>,
                  'Explore', '/explore'],
                [<InterestsOutlinedIcon key={1}/>,
                  <InterestsIcon key={2}/>,
                  'Interests', '/interests'],
                ])
            }
            <Divider />
            {/* {drawerItemComponent(
                [[<FavoriteBorderOutlinedIcon key={1}/>,
                  <FavoriteBorderIcon key={2}/>,
                  'Favorites', '/favorites'],
                ])
            } */}
          </>
        );

  return (
        (widthChange) ?
            (<SwipeableDrawer
              open={props.drawerState}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
            >
              < Toolbar sx={{ml: 1}}>
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
                <ParsLogo />
              </Toolbar>
              <Divider />
              {drawerContent}
            </SwipeableDrawer>) :
            (<StaticDrawer
              variant="permanent"
              open={props.drawerState}
            >
              {drawerContent}
            </StaticDrawer>)
  );
};

Drawers.propTypes = {
  drawerState: PropTypes.bool.isRequired,
  handleDrawer: PropTypes.func.isRequired,
  setdrawerState: PropTypes.func.isRequired,
};

export default Drawers;
