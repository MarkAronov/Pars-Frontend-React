import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {
  Grid, Box, Paper, Typography,
  Container, Button, Skeleton, Tooltip,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  CheckOutlined as CheckOutlinedIcon,
  InterestsOutlined as InterestsOutlinedIcon,
} from '@mui/icons-material/';
import {useTheme, alpha} from '@mui/material/styles';

import UserTabs from '../../atoms/UserTabs';
import UserProfileIcon from '../../atoms/CustomIcons/UserProfileIcon';
import ViewMediaDialog from '../../atoms/Dialogs/ViewMediaDialog';
import DynamicTypography from '../../atoms/DynamicTypography';
import PostCardGroup from '../../molecules/PostCardGroup';

import {useAuth} from '../../../hooks/useAuth';
import {useAsync} from '../../../hooks/useAsync';

/**
 * The user's page
 * @param {object} props object file that contains the user's name
 * @return {JSX.Element} returns a user page
 */
const UserPage = (props) => {
  const auth = useAuth();
  const {username} = props;
  const [user, setUser] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [showMediaDialog, setShowMediaDialog] = useState(false);
  const [isUserInsterested, setIsUserInsterested] = useState(false);
  const [updatingInterest, setUpdatingInterest] = useState(false);
  const userFinder = useAsync(auth.findUser, false, username );
  const theme = useTheme();
  let userBackgroundImage;

  const hasDataLoaded = (
    (userFinder.status === 'success' || userFinder.status === 'idle')
  );

  useEffect(() => {
    if (user === null || username !== user.username) {
      if (username === auth.user.username) {
        setUser(auth.user);
      } else {
        if (userFinder.status === 'idle') userFinder.execute();
        else if (userFinder.status === 'success') setUser(userFinder.value);
      }
    }
  }, [user, username, auth,
    userFinder.value, userFinder.status],
  );

  const handleAvatarDialog = () => {
    setShowMediaDialog(!showMediaDialog);
  };

  const handleInterest = async () => {
    setUpdatingInterest(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    setUpdatingInterest(false);
    setIsUserInsterested(!isUserInsterested);
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
            (theme.palette.mode === 'dark') ?
            theme.palette.grey[900] :
            theme.palette.grey[50],
        }}
        component={Paper}
      >
        <Grid item sx={{
          width: '100%',
          height: '120px',
          [theme.breakpoints.down('sm')]: {
            height: '90px',
          },
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {
            (hasDataLoaded) ?
            <img
              style={{
                objectFit: 'fill',
                borderRadius: '5px 5px 0px 0px',
                height: '100%',
                width: '100%',
              }}
              src={
                (user && userBackgroundImage) ?
                    `data:image/jpeg;base64,${userBackgroundImage}` : ''
              }
              alt={''}
            />:
            <Skeleton width="100%" height="100%" />
          }
        </Grid>
        <Grid
          item
          sx={{
            backgroundColor:
                alpha((theme.palette.mode === 'dark') ?
                theme.palette.grey[900] :
                theme.palette.grey[50], 0.3),
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
              onClick={handleAvatarDialog}
              component={Button}
              sx={{
                px: 0,
                py: 0,
                mr: 3,
                width: '70px', height: '70px',
                [theme.breakpoints.down('md')]: {
                  mr: 1,
                },
                verticalAlign: 'middle',
                alignItems: 'center',
                borderRadius: '50%',
                borderStyle: 'solid',
                borderWidth: '5px',
                borderColor: (theme.palette.mode === 'dark') ?
                        theme.palette.grey[800] : theme.palette.grey[100],
                backgroundColor: (theme.palette.mode === 'dark') ?
                        theme.palette.grey[800] : theme.palette.grey[100],
              }}
            >
              {
                (hasDataLoaded) ?
                  <UserProfileIcon sizeChange={true} user={user} /> :
                  <Skeleton variant="circular" width="100%" height="100%" />
              }
            </Box>
            {
                (hasDataLoaded) ?
                    <Typography variant='h5' color='inherit'>
                      {(user) ? user.username : 'No user with such name'}
                    </Typography> :
                    <Skeleton width="20%" height="10%" />
            }
            <Box sx={{
              display: 'flex',
              flexGrow: 1,
            }} />

            {
            (hasDataLoaded && username === auth.user.username)?
              <>
              </>:
              <Tooltip title={(isUserInsterested) ? 'Interested' : 'Interest'}>
                <LoadingButton
                  onClick={handleInterest}
                  endIcon={(isUserInsterested) ?
                      <CheckOutlinedIcon /> :
                      <InterestsOutlinedIcon />
                  }
                  loading={updatingInterest}
                  loadingPosition="end"
                  variant={(isUserInsterested) ? 'outlined' : 'contained'}
                >
                  {(isUserInsterested) ? 'Interested' : 'Interest'}
                </LoadingButton>
              </Tooltip>
            }
          </Box>
          <Box
            component='div'
            sx={{
              mt: 2,
              mx: 4,
              minHeight: '48px',
            }}
          >
            {
                (hasDataLoaded) ?
                    <DynamicTypography type={'bio'} user={user} /> :
                    <Skeleton width="20%" height="10%" />
            }
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
                (theme.palette.mode === 'dark') ?
                    alpha(theme.palette.common.white, 0.1) :
                    alpha(theme.palette.common.white, 0.5),
              py: 1,
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
      </Grid >
      <PostCardGroup cardlist={[1, 2, 3]}/>
      <ViewMediaDialog
        open={showMediaDialog}
        handleClose={handleAvatarDialog}
        user={user}
      />
    </Container>
  );
};

UserPage.propTypes = {
  username: PropTypes.string.isRequired,
};

export default UserPage;
