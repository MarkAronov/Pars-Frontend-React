import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Grid, Box, Paper, Typography, useMediaQuery } from '@mui/material';
import {
  Search as SearchIcon,
  People as PeopleIcon,
  Chat as ChatIcon,
  PlayCircle as PlayCircleIcon,
} from '@mui/icons-material/';
import { useTheme } from '@mui/material/styles';

import Footer from '../../molecules/Footer';
import ParsLogo from '../../atoms/CustomIcons/ParsLogo';

/**
 * The app's login/signup page for new visitors
 * @param {object} props object file that contains a signup or a
 *                       login component
 * @return {JSX.Element} returns a start page
 */
const StartPage = React.memo((props) => {
  const theme = useTheme();
  const widthChange = useMediaQuery(theme.breakpoints.up('xs'));
  useEffect(
    () => () => {
      // This is the cleanup function
    },
    []
  );

  return (
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <Grid
        container
        direction="row"
        sx={{
          flex: 1,
          flexDirection: widthChange ? 'row-reverse' : 'column',
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          sx={{
            backgroundColor:
              theme.palette.mode === 'dark'
                ? theme.palette.grey[900]
                : theme.palette.grey[50],
            alignItems: 'center',
            display: widthChange ? 'flex' : '',
            justifyContent: 'center',
          }}
          elevation={6}
          square
          component={Paper}
        >
          <Box
            sx={{
              marginLeft: 'auto',
              marginRight: 'auto',
              width: {
                xs: '70%',
                sm: '60%',
                md: '60%',
                lg: '55%',
              },
              my: 6,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <ParsLogo
              sx={{
                margin: theme.spacing(5, 1),
              }}
            />
            <Typography component="h1" variant="h5">
              See what’s going on at our party right now!
            </Typography>

            <Typography component="h1" variant="h6">
              Join the information superhighway party NOW!
            </Typography>

            <Grid
              container
              spacing={3}
              sx={{
                margin: theme.spacing(2, 0, 8),
              }}
            >
              {props.page}
            </Grid>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          sx={{
            backgroundColor:
              theme.palette.mode === 'dark'
                ? theme.palette.grey[900]
                : theme.palette.grey[50],
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Grid
            component={'span'}
            sx={{
              margin: theme.spacing(4, 3),
              flexDirection: 'column',
              verticalAlign: 'middle',
              display: 'block',
            }}
          >
            {[
              [<SearchIcon key={1} />, <>Follow your interests</>],
              [<PeopleIcon key={2} />, <>Make some friends</>],
              [<ChatIcon key={3} />, <>Join the conversation</>],
              [<PlayCircleIcon key={4} />, <>Create original content</>],
            ].map((value, index) => (
              <Grid
                key={index}
                container
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                  py: 1.5,
                  px: 1.5,
                }}
              >
                <Grid item>{value[0]}</Grid>
                <Grid item>
                  <Typography variant="h6">{value[1]}</Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </Grid>
  );
});

StartPage.propTypes = {
  page: PropTypes.object.isRequired,
};
StartPage.displayName = 'Start Page';

export default StartPage;
