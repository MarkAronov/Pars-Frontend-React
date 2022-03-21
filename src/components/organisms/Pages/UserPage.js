import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';

import {
  Grid,
  Box,
  Paper,
  Typography,
  Container,
  Button,
  Skeleton,
} from '@mui/material';

import { useTheme, alpha } from '@mui/material/styles';

import UserTabs from '../../atoms/UserTabs';
import UserProfileIcon from '../../atoms/CustomIcons/UserProfileIcon';
import ViewMediaDialog from '../../atoms/Dialogs/ViewMediaDialog';
import DynamicTypography from '../../atoms/Typographies/DynamicTypography';
import ProfileButton from '../../atoms/Buttons/ProfileButton';
import PostCardGroup from '../../molecules/PostCardGroup';

import { useAuth } from '../../../hooks/useAuth';
import { useAsync } from '../../../hooks/useAsync';

/**
 * The user's page
 * @param {object} props object file that contains the user's name
 * @return {JSX.Element} returns a user page
 */
const UserPage = React.memo(
  (props) => {
    const auth = useAuth();
    const { username } = props;
    const [user, setUser] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const [showMediaDialog, setShowMediaDialog] = useState(false);
    const [mediaDialogType, setMediaDialogType] = useState('');
    const userFinder = useAsync(auth.dispatch, false, {
      type: 'findUser',
      username,
    });
    const theme = useTheme();

    const userLoaded =
      userFinder.status === 'success' ||
      userFinder.status === 'error' ||
      userFinder.status === 'idle';

    useEffect(() => {
      if (user === null || username !== user.username) {
        if (userFinder.status === 'idle') userFinder.execute();
        else if (userFinder.status === 'success') setUser(userFinder.value);
        else if (userFinder.status === 'error') setUser(null);
      }
      return () => setUser(userFinder.value);
    }, [user, username, auth.user, userFinder]);

    const handleUserMediaDialog = () => {
      setShowMediaDialog(!showMediaDialog);
    };

    const handleUserAvatarDialog = () => {
      setMediaDialogType('avatar');
      setShowMediaDialog(!showMediaDialog);
    };

    const handleUserBackgroundDialog = () => {
      setMediaDialogType('backgroundImage');
      setShowMediaDialog(!showMediaDialog);
    };

    return (
      <Container>
        <Grid
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
            onClick={user?.backgroundImage ? handleUserBackgroundDialog : null}
            component={Button}
            sx={{
              borderRadius: '5px 5px 0px 0px',
              width: '100%',
              height: '120px',
              [theme.breakpoints.down('sm')]: {
                height: '90px',
              },
              alignItems: 'center',
              justifyContent: 'center',
              py: 0,
              px: 0,
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.grey[850]
                  : theme.palette.grey[100],
            }}
          >
            {userLoaded ? (
              user?.backgroundImage ? (
                <img
                  style={{
                    objectFit: 'cover',
                    borderRadius: '5px 5px 0px 0px',
                    height: '100%',
                    width: '100%',
                  }}
                  src={
                    // eslint-disable-next-line max-len
                    `${process.env.REACT_APP_BACKEND_URL}/users/${user.username}/backgroundImage#` +
                    new Date().getTime()
                  }
                  alt={''}
                />
              ) : (
                <></>
              )
            ) : (
              <Skeleton
                variant="rectangular"
                sx={{
                  borderRadius: '5px 5px 0px 0px',
                  width: '100%',
                  height: '100%',
                }}
              />
            )}
          </Grid>
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
              direction="row"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                position: 'relative',
                alignItems: 'center',
                flex: 1,
                borderRadius: '0px 0px 7px 7px ',
                mx: 2,
                my: 2,
                [theme.breakpoints.down('sm')]: {
                  mx: 1,
                  my: 1,
                },
              }}
            >
              <Box
                onClick={user?.avatar ? handleUserAvatarDialog : null}
                component={Button}
                sx={{
                  px: 0,
                  py: 0,
                  mr: 3,
                  width: '70px',
                  height: '70px',
                  [theme.breakpoints.down('md')]: {
                    mr: 1,
                  },
                  verticalAlign: 'middle',
                  alignItems: 'center',
                  borderRadius: '50%',
                  borderStyle: 'solid',
                  borderWidth: '5px',
                  borderColor:
                    theme.palette.mode === 'dark'
                      ? theme.palette.grey[800]
                      : theme.palette.grey[100],
                  backgroundColor:
                    theme.palette.mode === 'dark'
                      ? theme.palette.grey[800]
                      : theme.palette.grey[100],
                }}
              >
                {userLoaded ? (
                  <UserProfileIcon sizeChange={true} user={user} />
                ) : (
                  <Skeleton variant="circular" width="100%" height="100%" />
                )}
              </Box>
              <Box
                sx={{
                  flexDirection: 'column',
                  width: '30%',
                }}
              >
                {userLoaded ? (
                  <Typography variant="h5" color="inherit">
                    {user ? user.displayName : 'No user with such name'}
                  </Typography>
                ) : (
                  <Skeleton width="100%" height="10%" />
                )}
                {userLoaded ? (
                  <Typography variant="h7" color="inherit">
                    {user ? `@${user.username}` : 'No user with such name'}
                  </Typography>
                ) : (
                  <Skeleton width="100%" height="10%" />
                )}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexGrow: 1,
                }}
              />
              <ProfileButton
                userLoaded={userLoaded}
                user={user}
                username={username}
              />
            </Box>
            <Box
              component="div"
              sx={{
                mt: 2,
                mx: 4,
                minHeight: '48px',
              }}
            >
              {userLoaded ? (
                <DynamicTypography type={'bio'} user={user} />
              ) : (
                <>
                  <Skeleton width="100%" height="10%" />
                  <Skeleton width="100%" height="10%" />
                  <Skeleton width="100%" height="10%" />
                </>
              )}
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                borderTopStyle: 'solid',
                top: '20%',
                borderTopWidth: '2px',
                borderColor:
                  theme.palette.mode === 'dark'
                    ? alpha(theme.palette.common.white, 0.1)
                    : alpha(theme.palette.common.black, 0.1),
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
        </Grid>
        <PostCardGroup cardlist={[1, 2, 3]} />
        <ViewMediaDialog
          open={showMediaDialog}
          handleClose={handleUserMediaDialog}
          user={user}
          mediaType={mediaDialogType}
        />
      </Container>
    );
  },
  (prev, current) => {
    console.log(prev, current);
    console.log(lodash.isEqual(prev.user, current.user));
    lodash.isEqual(prev.user, current.user);
    return true;
  }
);

UserPage.propTypes = {
  username: PropTypes.string.isRequired,
};
UserPage.displayName = `User's Page`;

export default UserPage;
