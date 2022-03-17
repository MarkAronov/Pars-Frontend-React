import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  FormControl,
  Typography,
  InputLabel,
  Input,
  InputAdornment,
  FormHelperText,
  IconButton,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material/';

const TextInput = (props) => {
  const {
    id,
    label,
    value,
    handleChange,
    error,
    errorTextList,
    disabled,
    multiline = false,
  } = props;
  const [show, setShow] = useState(!id.includes('password'));

  const handleClickShow = () => {
    setShow(!show);
  };

  const handleMouseDown = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl
      id={`${id}Form`}
      fullWidth
      variant="filled"
      error={error}
      disabled={disabled}
      margin="dense"
    >
      <InputLabel variant="standard" htmlFor={id}>{`${label}`}</InputLabel>
      <Input
        id={id}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={handleChange}
        multiline={multiline}
        endAdornment={
          id.includes('password') ? (
            <InputAdornment position="end">
              <IconButton
                id="show"
                onClick={handleClickShow}
                onMouseDown={handleMouseDown}
                edge="end"
              >
                {show ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ) : (
            ''
          )
        }
      />
      {error ? (
        <FormHelperText
          error={true}
          id="component-helper-text"
          sx={{
            alignItems: 'center',
          }}
        >
          {errorTextList.map((error, i) => (
            <Typography component={'span'} key={i} sx={{ display: 'block' }}>
              {error}
            </Typography>
          ))}
        </FormHelperText>
      ) : (
        ''
      )}
    </FormControl>
  );
};

TextInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  errorTextList: PropTypes.array,
  handleChange: PropTypes.func,
  value: PropTypes.string,
};

export default TextInput;
