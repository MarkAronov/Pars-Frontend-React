import React, { useEffect, useState, memo } from 'react';
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
import NotificationsAppBar from '../atoms/AppBarItems/NotificationsAppBar';
import MenuAppBar from '../atoms/AppBarItems/MenuAppBar';
import ParsLogo from '../atoms/CustomIcons/ParsLogo';

/**
 * The Header component
 * @param {object} props object file that contains all the needed props to
 *                       control the Header
 * @return {JSX.Element} returns a Header component
 */
const Header = (props: { sx: any; handleDrawer: any }): JSX.Element => {
  const theme = useTheme();
  const [mobileSearchBar, setMobileSearchBar] = useState(false);
  const widthChange = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (!widthChange && mobileSearchBar) {
      setMobileSearchBar(!mobileSearchBar);
    }
  }, [widthChange, mobileSearchBar]);

  const LeftSection = () => (
    <>
      <Box sx={{ display: mobileSearchBar && widthChange ? 'none' : 'flex' }}>
        <IconButton
          size="large"
          edge="start"
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

  const RightSection = memo(() => (
    <>
      <Box
        sx={{
          display: mobileSearchBar && widthChange ? 'none' : 'flex',
          flexGrow: 1,
          [theme.breakpoints.down('sm')]: {
            flexGrow: 0,
          },
        }}
      />
      <Box sx={{ display: mobileSearchBar && widthChange ? 'none' : 'flex' }}>
        <NotificationsAppBar />
        <MenuAppBar />
      </Box>
    </>
  ));
  RightSection.displayName = 'RightSection';

  return (
    <AppBar
      sx={{
        justifyContent: 'space-between',
        overflowX: 'auto',
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Toolbar sx={{ backgroundColor: 'inherit' }} variant="dense">
        <LeftSection />
        <SearchBar
          mobileSearchBar={mobileSearchBar}
          setMobileSearchBar={setMobileSearchBar}
        />
        <RightSection />
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  handleDrawer: PropTypes.func.isRequired,
};
Header.displayName = 'Header';

export default Header;
