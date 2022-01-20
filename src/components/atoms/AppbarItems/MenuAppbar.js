import React from 'react';
import PropTypes from 'prop-types';

import {
  Menu, MenuItem, Divider, ListItemIcon,
  IconButton,
} from '@mui/material';
import {
  // eslint-disable-next-line
    PersonAddOutlined as PersonAddOutlinedIcon,
  SettingsOutlined as SettingsOutlinedIcon,
  LogoutOutlined as LogoutOutlinedIcon,
} from '@mui/icons-material';
import {Link as RouterLink} from 'react-router-dom';

import {useAuth} from '../../../hooks/useAuth';
import UserProfileIcon from '../CustomIcons/UserProfileIcon';

/**
 * The MenuAppbar component
 * @return {JSX.Element} returns a MenuAppbar component
 */
const MenuAppbar = () => {
  const auth = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    await auth.signOut();
  };


  const MenuItemLink = (props) => {
    const {icon, text, to} = props;

    const renderLink = React.useMemo(
        () =>
          React.forwardRef(function Link(itemProps, ref) {
            return (
              <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />
            );
          }),
        [to],
    );


    return (
      <MenuItem component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        {text}
      </MenuItem>
    );
  };

  MenuItemLink.propTypes = {
    icon: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  };

  return (
    <>
      <IconButton onClick={handleClick}
        sx={{
          height: '48px',
          width: '48px',
          padding: '12px',
        }}
      >
        <UserProfileIcon sizeChange={false} user={auth.user} />
      </IconButton>
      <Menu
        id='long-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            'filter': 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            'mt': 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '\'\'',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      >
        <MenuItemLink
          to={(auth.user) ? `/user/${auth.user.username}` : ''}
          icon={<UserProfileIcon sizeChange={false} user={auth.user} />}
          text={(auth.user) ? auth.user.username : ''}
        />
        <Divider />
        {/* <MenuItem>
                    <ListItemIcon>
                        <PersonAddOutlinedIcon fontSize='small' />
                    </ListItemIcon>
                    Add another account
                </MenuItem> */}
        <MenuItem>
          <ListItemIcon>
            <SettingsOutlinedIcon fontSize='small' />
          </ListItemIcon>
                    Settings
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <LogoutOutlinedIcon fontSize='small' />
          </ListItemIcon>
                    Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuAppbar;
