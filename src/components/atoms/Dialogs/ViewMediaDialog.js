import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {
  Box, Button, Dialog, DialogActions,
  DialogContent, DialogTitle,
} from '@mui/material';

import {useAuth} from '../../../hooks/useAuth';

/**
 * The ViewMediaDialog component
 * @param {object} props object file that contains all the needed props to
 *                       display the ViewMediaDialog
 * @return {JSX.Element} returns a ViewMediaDialog component
 */
const ViewMediaDialog = (props) => {
  const auth = useAuth();
  const {open, handleClose, user} = props;
  const [isUserSelf, setIsUserSelf] = useState(false);
  const [doesUserHaveAvatar, setDoesUserHaveAvatar] = useState(false);

  useEffect(() => {
    if (user) setIsUserSelf(auth.user.name === user.name);
  }, [user, isUserSelf, auth]);

  useEffect(() => {
    if (user && user.avatar) setDoesUserHaveAvatar(true);
  }, [user, doesUserHaveAvatar]);

  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      open={open && doesUserHaveAvatar}
      onClose={handleClose}
    >
      <DialogTitle>{
        (isUserSelf) ? 'Your Avatar' : ((user) ? `${user.name}'s Avatar` : '')}
      </DialogTitle>
      <DialogContent>
        <Box
          noValidate
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 'auto',
            width: 'fit-content',
          }}
        >
          <img
            style={{
              objectFit: 'fit',
              height: '100%',
              width: '100%',
            }}
            src={
                (user && user.avatar) ?
                    `data:image/jpeg;base64,${user.avatar}` : ''
            }
            alt={''}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        {(isUserSelf) ?
            <>
              <Button onClick={null}>Remove</Button>
              <Button onClick={null}>Upload</Button>
            </> :
            <></>
        }
        <Button onClick={handleClose}>{'Close'}</Button>
      </DialogActions>
    </Dialog>
  );
};


ViewMediaDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default ViewMediaDialog;
