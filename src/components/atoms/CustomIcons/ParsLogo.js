import React from 'react';

import { Avatar } from '@mui/material';

/**
 * The ParsLogo component
 * @return {JSX.Element} returns a ParsLogo component
 */
const ParsLogo = () => (
  <Avatar
    sx={{
      height: '32px',
      width: '32px',
      boxShadow: '0 0 1em rgba(220,0,120,0.4)',
      borderRadius: '50%',
    }}
    src="/logo512.png"
    size="large"
  />
);

export default ParsLogo;
