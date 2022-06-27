import React from 'react';

import { Box, Link, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/**
 * The Footer component
 * @return {JSX.Element} returns a Footer component
 */
const Footer = React.memo(
  () => {
    const theme = useTheme();
    return (
      <Box
        component="footer"
        sx={{
          py: 2,
          px: 2,
          mt: 'auto',
          textAlign: 'center',
          backgroundColor:
            theme.palette.mode === 'dark'
              ? theme.palette.grey[800]
              : theme.palette.grey[300],
          align: 'center',
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="textSecondary">
            <Link color="inherit">{'About Us'}</Link>
            {'  '}
            {`© ${new Date().getFullYear()} Pars`}
          </Typography>
        </Container>
      </Box>
    );
  },
  (prevProps, nextProps) => true
);

Footer.displayName = 'Footer';
export default Footer;
