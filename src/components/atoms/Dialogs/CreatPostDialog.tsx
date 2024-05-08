import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';

/**
 * The FormDialog component
 * @param {object} props object file that contains all the needed props to
 *                       control the FormDialog
 * @return {JSX.Element} returns a FormDialog component
 */
const CreatPostDialog = (props) => {
  const [open, setOpen] = useState(props.postDialogState);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`To subscribe to this website, 
                please enter your email address here. We
                will send updates occasionally.`}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

CreatPostDialog.propTypes = {
  postDialogState: PropTypes.bool.isRequired,
};

export default CreatPostDialog;
