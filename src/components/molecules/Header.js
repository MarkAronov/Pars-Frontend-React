import React, { useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';

import {
  useMediaQuery,
  IconButton,
  Toolbar,
  AppBar,
  Box,
} from '@mui/material/';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useTheme } from '@mui/material/styles';

import SearchBar from '../atoms/TextInputs/SearchBar';
import NotificationsAppbar from '../atoms/AppbarItems/NotificationsAppbar';
// eslint-disable-next-line
import MessagesAppbar from '../atoms/AppbarItems/MessagesAppbar';
import MenuAppbar from '../atoms/AppbarItems/MenuAppbar';
import ParsLogo from '../atoms/CustomIcons/ParsLogo';

/**
 * The Header component
 * @param {object} props object file that contains all the needed props to
 *                       control the Header
 * @return {JSX.Element} returns a Header component
 */
const Header = forwardRef((props, ref) => {
  const theme = useTheme();
  const [moblieSearchBar, setMoblieSearchBar] = React.useState(false);
  const widthChange = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (!widthChange && moblieSearchBar) {
      setMoblieSearchBar(!moblieSearchBar);
    }
  }, [widthChange, moblieSearchBar]);

  const LeftSection = () => (
    <>
      <Box sx={{ display: 'flex' }}>
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
          flexGrow: 1,
        }}
      />
    </>
  );

  const RightSection = () => (
    <>
      <Box
        sx={{
          display: moblieSearchBar && widthChange ? 'none' : 'flex',
          flexGrow: 1,
          [theme.breakpoints.down('sm')]: {
            flexGrow: 0,
          },
        }}
      />
      <Box sx={{ display: 'flex' }}>
        {/* <MessagesAppbar /> */}
        <NotificationsAppbar />
        <MenuAppbar />
      </Box>
    </>
  );

  return (
    <AppBar
      ref={ref}
      sx={{
        height: '48px',
        justifyContent: 'space-between',
        overflowX: 'auto',
        zIndex: (theme) => theme.zIndex.drawer,
        backgroundColor:
          theme.palette.mode === 'dark'
            ? theme.palette.grey[1100]
            : theme.palette.grey[50],
      }}
    >
      <Toolbar variant="dense">
        <LeftSection />
        <SearchBar
          moblieSearchBar={moblieSearchBar}
          setMoblieSearchBar={setMoblieSearchBar}
        />
        <RightSection />
      </Toolbar>
    </AppBar>
  );
});

Header.propTypes = {
  handleDrawer: PropTypes.func.isRequired,
};
Header.displayName = 'Header';

export default Header;
