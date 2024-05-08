import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Skeleton,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  MoreVert as MoreVertIcon,
  CheckOutlined as CheckOutlinedIcon,
  InterestsOutlined as InterestsOutlinedIcon,
} from '@mui/icons-material/';
import {
  // eslint-disable-next-line
  EditOutlined as EditOutlinedIcon,
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  InsertPhotoOutlined as InsertPhotoOutlinedIcon,
} from '@mui/icons-material';

import UserProfileEditDialog from '../../atoms/Dialogs/UserProfileEditDialog';
import ViewMediaDialog from '../../atoms/Dialogs/ViewMediaDialog';

import { useAuth } from '../../../hooks/useAuth';

const ProfileButton = (props) => {
  const auth = useAuth();
  const { userLoaded, user, username } = props;
  const [updatingInterest, setUpdatingInterest] = useState(false);
  const [isUserInterested, setIsUserInsterested] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);

  const handleUserProfileDialog = () => {
    setShowProfileDialog(!showProfileDialog);
  };

  const handleInterest = async () => {
    setUpdatingInterest(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    setUpdatingInterest(false);
    setIsUserInsterested(!isUserInterested);
  };

  const ButtonType = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const openProfileMenu = Boolean(anchorEl);
    const [showMediaDialog, setShowMediaDialog] = useState(false);
    const [mediaDialogType, setMediaDialogType] = useState('');

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

    const handleProfileMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleProfileMenu = () => {
      setAnchorEl(null);
    };

    if (userLoaded) {
      if (user && auth?.user) {
        if (username === auth.user?.username) {
          return (
            <>
              <IconButton onClick={handleProfileMenuClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={openProfileMenu}
                onClose={handleProfileMenu}
                onClick={handleProfileMenu}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleUserProfileDialog}>
                  <ListItemIcon>
                    <EditOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  {`Edit user Info`}
                </MenuItem>
                <MenuItem onClick={handleUserAvatarDialog}>
                  <ListItemIcon>
                    <AccountCircleOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  {`Change Avatar`}
                </MenuItem>
                <MenuItem onClick={handleUserBackgroundDialog}>
                  <ListItemIcon>
                    <InsertPhotoOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  {`Change Background`}
                </MenuItem>
              </Menu>
              <UserProfileEditDialog
                open={showProfileDialog}
                handleClose={handleUserProfileDialog}
              />
              <ViewMediaDialog
                open={showMediaDialog}
                handleClose={handleUserMediaDialog}
                user={auth.user}
                mediaType={mediaDialogType}
              />
            </>
          );
        } else {
          return (
            <LoadingButton
              onClick={handleInterest}
              endIcon={
                isUserInterested ? (
                  <CheckOutlinedIcon />
                ) : (
                  <InterestsOutlinedIcon />
                )
              }
              disabled={!userLoaded}
              loading={updatingInterest}
              loadingPosition="end"
              variant={isUserInterested ? 'outlined' : 'contained'}
            >
              {isUserInterested ? 'Interested' : 'Interest'}
            </LoadingButton>
          );
        }
      } else {
        return <></>;
      }
    } else {
      return <Skeleton width="2%" height="50%" />;
    }
  };

  return <ButtonType />;
};

ProfileButton.propTypes = {
  userLoaded: PropTypes.bool,
  user: PropTypes.object,
  username: PropTypes.string,
};

export default ProfileButton;
