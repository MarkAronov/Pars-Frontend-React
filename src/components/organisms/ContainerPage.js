import React, { useLayoutEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { Container, Box, Toolbar } from '@mui/material';

import Header from '../molecules/Header';
import Drawers from '../atoms/Drawers';

/**
 * Warpping function that adds a header and a drawer to the page
 * @param {object} props contians the page
 * @return {JSX.Element} the specific page
 */
const ContainerPage = (props) => {
  const [drawerState, setdrawerState] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const header = useRef(null);
  const handleDrawer = () => {
    setdrawerState(!drawerState);
  };

  useLayoutEffect(() => {
    if (header.current) {
      setHeaderHeight(header.current.offsetHeight);
    }
  }, [header]);

  return (
    <Box sx={{ display: 'flex' }}>
      <React.StrictMode>
        <Header
          ref={header}
          sx={{ position: 'sticky' }}
          handleDrawer={handleDrawer}
        />
      </React.StrictMode>
      <Drawers
        drawerState={drawerState}
        setdrawerState={setdrawerState}
        handleDrawer={handleDrawer}
        headerHeight={headerHeight}
      />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? theme.palette.grey[900]
              : theme.palette.grey[100],
          flexGrow: 1,
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container
          maxWidth="lg"
          sx={{
            my: 3,
            px: 0,
          }}
        >
          {props.page}
        </Container>
      </Box>
    </Box>
  );
};

ContainerPage.propTypes = {
  page: PropTypes.object.isRequired,
};
ContainerPage.displayName = 'Container Page';

export default ContainerPage;
