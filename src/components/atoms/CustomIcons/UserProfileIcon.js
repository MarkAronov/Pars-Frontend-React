import React from 'react';
import PropTypes from 'prop-types';

import {Avatar} from '@mui/material';
import {alpha, useTheme} from '@mui/material/styles';

/**
 * The UserTabs component
 * @param {object} props object file that contains all the needed props to
 *                       control the UserTabs
 * @return {JSX.Element} returns a UserTabs component
 */
const UserProfileIcon = (props) => {
  const {user} = props;
  const theme = useTheme();
  let userAvatar;
  let userNameLetter;

  if (user !== null) {
    // eslint-disable-next-line max-len
    userAvatar = `${process.env.REACT_APP_BACKEND_URL}/users/${user.username}/avatar?` + Date.now();
    userNameLetter = user.displayName[0];
  } else {
    userAvatar = null;
    userNameLetter = null;
  }

  return (
    <Avatar
      src={userAvatar}
      sx={{
        height: (props.sizeChange) ? '100%' : 'default',
        width: (props.sizeChange) ? '100%' : 'default',
        fontSize: '75vm',
        bgcolor: (theme.palette.mode === 'dark') ?
                      alpha(theme.palette.common.white, 0.9) :
                      alpha(theme.palette.common.white, 0.5),
      }}
    >
      {userNameLetter}
    </Avatar>
  );
};

UserProfileIcon.propTypes = {
  user: PropTypes.object,
  sizeChange: PropTypes.bool,
};

export default UserProfileIcon;
