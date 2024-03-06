/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Grid, Box, Paper, Container } from '@mui/material';

import { useTheme, alpha } from '@mui/material/styles';

import UserTabs from '../../atoms/UserTabs';
import UserCard from '../../molecules/UserCard';
import PostCardGroup from '../../molecules/PostCardGroup';

import { useAuth } from '../../../hooks/useAuth';
import { useAsync } from '../../../hooks/useAsync';

/**
 * The user's page
 * @param {object} props object file that contains the user's name
 * @return {JSX.Element} returns a user page
 */
const UserPage = (props) => {
  const auth = useAuth();
  const { username } = props;
  const [user, setUser] = useState<any>(null);
  const [tabValue, setTabValue] = useState<any>(0);

  const userFinder = useAsync(auth?.dispatch, false, {
    type: 'findUser',
    username,
  });
  const theme = useTheme();

  const userLoaded = userFinder.status !== 'pending';

  useEffect(() => {
    if (user === null || username !== user?.username) {
      if (userFinder.status === 'idle') userFinder.execute();
      else if (userFinder.status === 'success') setUser(userFinder.value);
      else if (userFinder.status === 'error') setUser(null);
    }
    return () => setUser(userFinder.value);
  }, [user, username, auth?.user, userFinder]);

  return (
    <Container>
      <UserCard username={username} user={user} userLoaded={userLoaded} />

      {/* <Grid
        container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '5px',
          position: 'relative',
          backgroundColor:
            theme.palette.mode === 'dark'
              ? theme.palette.grey[900]
              : theme.palette.grey[50],
        }}
        component={Paper}
      >
        <Grid
          item
          sx={{
            backgroundColor: alpha(
              theme.palette.mode === 'dark'
                ? theme.palette.grey[900]
                : theme.palette.grey[50],
              0.3
            ),
            borderRadius: '0px 0px 5px 5px ',
            width: '100%',
            height: '60%',
          }}
          square
          component={Box}
          elevation={6}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              top: '20%',
              py: 1,
              mt: 1,
              width: 'auto',
            }}
          >
            <UserTabs
              tabValue={tabValue}
              setTabValue={setTabValue}
              tabList={['Posts', 'More Info']} // 'Favorites',
            />
          </Box>
        </Grid>
      </Grid> */}

      <PostCardGroup
        cardlist={[
          [
            1,
            'Got a new bike!',
            'Wish me luck :)',
            'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg',
          ],
          [
            2,
            'Got a new bike!',
            'Wish me luck :)',
            'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg',
          ],
          [
            8,
            'Got a new bike!',
            'Wish me luck :)',
            'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg',
          ],
          [
            3,
            'Got a new bike!',
            'Wish me luck :)',
            'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg',
          ],
          [
            4,
            'Got a new bike!',
            'Wish me luck :)',
            'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg',
          ],
          [
            5,
            'Got a new bike!',
            'Wish me luck :)',
            'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg',
          ],
          [
            6,
            'Got a new bike!',
            'Wish me luck :)',
            'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg',
          ],
          [
            7,
            'Got a new bike!',
            'Wish me luck :)',
            'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg',
          ],
        ]}
      />
    </Container>
  );
};

UserPage.propTypes = {
  username: PropTypes.string.isRequired,
};
UserPage.displayName = `User's Page`;

export default UserPage;
