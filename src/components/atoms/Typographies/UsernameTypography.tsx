import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@mui/material/';
import { styled, alpha } from '@mui/material/styles';

const Username = styled(Typography)(({ theme }) => ({
  borderRadius: '5px',
  borderColor:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.1)
      : alpha(theme.palette.common.white, 0.5),
  position: 'relative',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.1)
      : alpha(theme.palette.common.white, 0.5),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '35%',
  },
  '&:focus-within': {
    borderRadius: '5px',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'white',
  },
}));

const UsernameTypography = (props) => (
  <Username variant="h3">{`${props.str}`}</Username>
);

UsernameTypography.propTypes = {
  str: PropTypes.string,
};

export default UsernameTypography;
