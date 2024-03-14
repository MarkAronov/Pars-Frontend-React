import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Avatar } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { UserType } from 'context/AuthContext';

/**
 * The UserTabs component
 * @param {object} props object file that contains all the needed props to
 *                       control the UserTabs
 * @return {JSX.Element} returns a UserTabs component
 */
const UserProfile = (props: {
  user: UserType | null;
  sizeChange: boolean;
}): JSX.Element => {
  const { user, sizeChange } = props;
  const theme = useTheme();
  let userAvatar: any;
  let userNameLetter: any;

  if (user) {
    userAvatar = user.avatar
      ? `${process.env.REACT_APP_BACKEND_URL}/media/avatars/${user.avatar}#` +
        Date.now()
      : null;
    userNameLetter = user.displayName[0];
  } else {
    userAvatar = null;
    userNameLetter = null;
  }

  return (
    <Avatar
      src={userAvatar}
      sx={{
        height: sizeChange ? '100%' : 'default',
        width: sizeChange ? '100%' : 'default',
        fontSize: '75vm',
        bgcolor:
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.common.white, 0.9)
            : alpha(theme.palette.common.black, 0.5),
      }}
    >
      {userNameLetter}
    </Avatar>
  );
};

UserProfile.propTypes = {
  user: PropTypes.object,
  sizeChange: PropTypes.bool,
};

const UserProfileIcon = memo(
  UserProfile,
  (prevProps, nextProps) => prevProps?.user?.avatar === nextProps?.user?.avatar
);
UserProfileIcon.displayName = 'User Profile Icon';

export default UserProfileIcon;
