import React from 'react';

import { Avatar } from '@mui/material';

/**
 * The ParsLogo component
 * @param {any} props
 * @return {JSX.Element} returns a ParsLogo component
 */
const ParsLogo = (props: any): JSX.Element => (
  <Avatar
    sx={{
      height: '32px',
      width: '32px',
      boxShadow: '0 0 1em rgba(220,0,120,0.4)',
      borderRadius: '50%',
    }}
    src="/logo512.png"
    sizes="large"
  />
);

export default ParsLogo;
