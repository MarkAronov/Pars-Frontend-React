/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Button,
  Dialog,
  Paper,
  styled,
  Backdrop,
  Snackbar,
  Alert,
} from '@mui/material';

import { useAuth } from '../../../hooks/useAuth';

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
  const { open, handleClose, user, mediaType } = props;
  const [imageToDisplay, setImageToDisplay] = useState(null);
  const [mediaFile, setMediaFile] = useState(null);
  const [isUserSelf, setIsUserSelf] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const [doesUserHaveMedia, setDoesUserHaveMedia] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const hiddenFileInput = useRef(null);

  useEffect(() => {
    if (user) {
      setIsUserSelf(
        auth?.user !== null && auth?.user?.username === user?.username
      );
      setDoesUserHaveMedia(user[mediaType] !== undefined);
      // eslint-disable-next-line max-len
      setImageToDisplay(
        `${process.env.REACT_APP_BACKEND_URL}/users/${user.username}/${mediaType}#` +
          new Date().getTime()
      );
      if (!open) {
        setSelectedImage(false);
        setMediaFile(null);
        setLoading(false);
      }
    }
    return () => setIsUserSelf(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isUserSelf, mediaType, open]);

  const handleSnackbarClose = (event) => {
    event.stopPropagation();
    setSnackbarOpen(false);
  };

  const handleRemove = async (event) => {
    event.stopPropagation();
    setLoading(true);
    const results = await auth.dispatch({
      type: 'deleteUserProfileMedia',
      mediaType,
    });
    if (results !== undefined) {
    }
    setSnackbarOpen(true);
    setLoading(false);
  };

  const handleFileClick = () => {
    hiddenFileInput.current.click();
  };

  const handleFile = async (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];
    setMediaFile(file);
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageToDisplay(reader.result);
      setSelectedImage(true);
    };
  };

  const handleUploadFile = async (event) => {
    event.stopPropagation();
    setLoading(true);
    const results = await auth.dispatch({
      type: 'setUserProfileMedia',
      mediaType,
      mediaFile,
    });
    if (results !== undefined) {
      setSelectedImage(false);
      setSnackbarOpen(true);
      user[mediaType] = results;
      await auth.setData(user, auth.userToken);
    }
    setLoading(false);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      open={open && doesUserHaveMedia}
      onClose={handleClose}
      sx={{}}
    >
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: 'flex',
          flexDirection: 'column',
        }}
        open={open}
        onClick={handleClose}
      >
        <img
          style={{
            objectFit: 'cover',
            maxHeight: '75%',
            maxWidth: '75%',
          }}
          src={user ? imageToDisplay : ''}
          alt={''}
          loading="lazy"
        />
        <Box
          component={Paper}
          sx={{
            mt: 4,
          }}
        >
          {isUserSelf ? (
            <>
              {selectedImage ? (
                <Button
                  disabled={loading}
                  onClick={handleUploadFile}
                  sx={{
                    borderRadius: '4px 0px 0px 4px',
                    px: 2,
                    py: 2,
                  }}
                >
                  {`Upload`}
                </Button>
              ) : (
                <Button
                  disabled={!user[mediaType] || loading}
                  onClick={handleRemove}
                  sx={{
                    borderRadius: '4px 0px 0px 4px',
                    px: 2,
                    py: 2,
                  }}
                >
                  {`Remove`}
                </Button>
              )}
              <label htmlFor="contained-button-file">
                <Button
                  disabled={loading}
                  component="span"
                  onClick={handleFileClick}
                  sx={{
                    borderRadius: '0px',
                    px: 2,
                    py: 2,
                  }}
                >
                  {`Change`}
                </Button>
                <Input
                  ref={hiddenFileInput}
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={handleFile}
                />
              </label>
            </>
          ) : (
            <></>
          )}
          <Button
            disabled={loading}
            onClick={handleClose}
            sx={{
              borderRadius: isUserSelf ? '0px 4px 4px 0px' : '4px',
              px: 2,
              py: 2,
            }}
          >
            {'Close'}
          </Button>
        </Box>
      </Backdrop>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        severity="success"
        open={snackbarOpen && open}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {`Successfully updated your image!`}
        </Alert>
      </Snackbar>
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
