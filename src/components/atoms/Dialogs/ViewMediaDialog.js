/* eslint-disable no-unused-vars */
import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';

import {
  Box, Button, Dialog, DialogActions,
  DialogContent, DialogTitle, styled,
} from '@mui/material';

import {useAuth} from '../../../hooks/useAuth';

const Input = styled('input')({
  display: 'none',
});


/**
 * The ViewMediaDialog component
 * @param {object} props object file that contains all the needed props to
 *                       display the ViewMediaDialog
 * @return {JSX.Element} returns a ViewMediaDialog component
 */
const ViewMediaDialog = (props) => {
  const auth = useAuth();
  const {open, handleClose, user, mediaType} = props;
  const [isUserSelf, setIsUserSelf] = useState(false);
  const [imageToDisplay, setImageToDisplay] = useState(null);
  const [doesUserHaveMedia, setDoesUserHaveMedia] = useState(false);
  const hiddenFileInput = useRef(null);
  const mediaTypeFormal = new Map([
    ['avatar', 'Avatar'],
    ['backgroundImage', 'Background Image'],
  ]);

  useEffect(() => {
    if (user) {
      setIsUserSelf(auth.user.username === user.username);
      setImageToDisplay(user[mediaType]);
      setDoesUserHaveMedia((user !== undefined));
    }
  }, [user, auth, mediaType]);

  console.log(imageToDisplay);

  const handleRemove = async () => {
    const results = await auth.deleteUserProfileMedia(mediaType);
    if (results !== undefined) {
      // console.log(results);
    }
  };

  const handleFileClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleFile = async (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];
    console.log(file);
    await reader.readAsDataURL(file);
    setImageToDisplay(reader.result );
  };

  const uploadFile = async (file) =>{
    const results = await auth.setUserProfileMedia(mediaType, file);
    if (results !== undefined) {
      user[mediaType] = results;
      await auth.setData(user, auth.userToken);
    }
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      open={open && doesUserHaveMedia}
      onClose={handleClose}
      sx={{
      }}
    >
      <DialogTitle
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.00)',
        }}
      >
        {(isUserSelf) ?
          `Your ${mediaTypeFormal.get(mediaType)}` :
          (
            (user) ?
            `${user.username}'s ${mediaTypeFormal.get(mediaType)}` :
            ``
          )
        }
      </DialogTitle>
      <DialogContent>
        <Box
          noValidate
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: 'fit-content',
            color: 'rgba(255, 255, 255, 0.00)',
          }}
        >
          <img
            style={{
              objectFit: 'fill',
              maxHeight: '100%',
              maxWidth: '100%',
            }}
            src={
                (user) ?
                    `data:image/jpeg;base64,${imageToDisplay}` : ''
            }
            alt={''}
          />
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.00)',
        }}
      >
        {(isUserSelf) ?
            <>
              <Button onClick={handleRemove}>{`Remove`}</Button>
              <label htmlFor="contained-button-file">
                <Button
                  component="span"
                  onClick={handleFileClick}
                >
                  {`Upload`}
                </Button>
                <Input
                  ref={hiddenFileInput}
                  accept="image/*"
                  id="contained-button-file"
                  multiple type="file"
                  onChange={handleFile}
                />
              </label>
            </> :
            <></>
        }
        <Button onClick={handleClose}>{'Close'}</Button>
      </DialogActions>
    </Dialog>
  );
};


ViewMediaDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  user: PropTypes.object,
  mediaType: PropTypes.string,
};

export default ViewMediaDialog;
