import React from 'react';

import { Button, IconButton, Stack } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

/**
 * The UploadButtons component
 * @return {JSX.Element} returns a UploadButtons component
 */
const UploadButtons = () => (
  <Stack direction="row" alignItems="center" spacing={2}>
    <label htmlFor="contained-button-file">
      <Input accept="image/*" id="contained-button-file" multiple type="file" />
      <Button variant="contained" component="span">
        {'Upload'}
      </Button>
    </label>
    <label htmlFor="icon-button-file">
      <Input accept="image/*" id="icon-button-file" type="file" />
      <IconButton color="primary" aria-label="upload picture" component="span">
        <PhotoCamera />
      </IconButton>
    </label>
  </Stack>
);

export default UploadButtons;
