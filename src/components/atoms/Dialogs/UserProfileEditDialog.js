import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {
  Dialog, Snackbar, Alert, TextField,
  DialogTitle, DialogContent,
  DialogActions, Button, Typography,
} from '@mui/material';

import {useAuth} from '../../../hooks/useAuth';

/**
 * The UserProfileEditDialog component
 * @param {object} props object file that contains all the needed props to
 *                       display the UserProfileEditDialog
 * @return {JSX.Element} returns a UserProfileEditDialog component
 */
const UserProfileEditDialog = (props) => {
  const auth = useAuth();
  const {open, handleClose} = props;

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    displayName: auth.user.displayName,
    bio: auth.user.bio,
  });
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({
    displayName: false,
    bio: false,
  });
  // eslint-disable-next-line no-unused-vars
  const [erroredValues, setErroredValues] = useState({
    displayName: '',
    bio: '',
  });


  useEffect(() => {
    if (!open) {
      setLoading(false);
    }
  }, [auth.user, open]);


  const handleChange = (event) => {
    const {value, id} = event.target;
    setData((data) => ({...data, [id]: value}));
  };

  const handleSnackbarClose = (event) =>{
    event.stopPropagation();
    setSnackbarOpen(false);
  };


  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      scroll={'body'}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        {`User Info`}
      </DialogTitle>
      <DialogContent
        dividers={scroll === 'paper'}
      >

        <TextField
          error={errors.displayName}
          helperText={errors.displayName ?
            <Typography
              component={'span'}
              sx={{display: 'block'}}
            >
              {(erroredValues.displayName === data.displayName)?
                  `Display Name is already taken.`:
                  `Invalid Display Name.`
              }
            </Typography> :
            ''
          }
          value={data.displayName}
          variant="standard"
          fullWidth
          multiline
          id="displayName"
          label="Display Name"
          onChange={handleChange}
          disabled={loading}
        />
        <TextField
          error={errors.bio}
          helperText={errors.bio ?
            <Typography
              component={'span'}
              sx={{display: 'block'}}
            >
              {(erroredValues.bio === data.bio)?
                  `Bio is already taken.`:
                  `Bio Email.`
              }
            </Typography> :
            ''
          }
          value={data.bio}
          variant="standard"
          fullWidth
          multiline
          id="bio"
          label="Bio"
          onChange={handleChange}
          disabled={loading}
          sx={{
            mt: 2,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}>
          {`Cancel`}
        </Button>
        <Button
          onClick={handleClose}>
          {`Update`}
        </Button>
      </DialogActions>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        severity='success'
        open={snackbarOpen && open}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity='success'
        >
          {`Successfully updated your data!`}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};


UserProfileEditDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default UserProfileEditDialog;
