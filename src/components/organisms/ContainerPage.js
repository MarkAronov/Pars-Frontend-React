import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {Container, Box, Toolbar} from '@mui/material';

import Header from '../molecules/Header';
import Drawers from '../atoms/Drawers';

/**
 * Warpping function that adds a header and a drawer to the page
 * @param {object} props contians the page
 * @return {JSX.Element} the specific page
 */
const ContainerPage = (props) => {
  const [drawerState, setdrawerState] = useState(false);

  const handleDrawer = () => {
    setdrawerState(!drawerState);
  };

  return (
    <Box sx={{display: 'flex'}}>
      <Header sx={{position: 'sticky'}} handleDrawer={handleDrawer} />
      <Drawers
        drawerState={drawerState}
        setdrawerState={setdrawerState}
        handleDrawer={handleDrawer}
      />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
                        (theme.palette.mode === 'dark') ?
                            theme.palette.grey[900] :
                            theme.palette.grey[100],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth='lg' sx={{my: 3, px: 0}}>
          {props.page}
        </Container>
      </Box>
    </Box>
  );
};

ContainerPage.propTypes = {
  page: PropTypes.object.isRequired,
};

export default ContainerPage;
