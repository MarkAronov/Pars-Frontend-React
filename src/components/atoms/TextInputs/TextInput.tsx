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

const TextInputPre = (props: {
  id: string;
  label: string;
  value: string;
  handleChange: any;
  error: boolean;
  errorTextList: string[];
  disabled: boolean;
  multiline?: boolean;
}) => {
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
            <Typography
              component={'span'}
              key={error}
              sx={{ display: 'block' }}
            >
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

TextInputPre.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  errorTextList: PropTypes.array,
  handleChange: PropTypes.func,
  value: PropTypes.string,
};
TextInputPre.displayName = 'TextInputPre';

const TextInput = React.memo(
  TextInputPre,
  (prev, curr) => prev.value === curr.value && prev.error === curr.error
);

TextInput.displayName = 'TextInput';

export default TextInput;
