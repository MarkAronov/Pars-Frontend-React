import React, { useState, useMemo, forwardRef } from 'react';
import PropTypes from 'prop-types';

import {
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  IconButton,
} from '@mui/material';
import {
  // eslint-disable-next-line
  PersonAddOutlined as PersonAddOutlinedIcon,
  SettingsOutlined as SettingsOutlinedIcon,
  LogoutOutlined as LogoutOutlinedIcon,
  LoginOutlined as LoginOutlinedIcon,
  CreateOutlined as CreateOutlinedIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

import { useAuth } from '../../../hooks/useAuth';
import UserProfileIcon from '../CustomIcons/UserProfileIcon';

/**
 * The MenuAppBar component
 * @return {JSX.Element} returns a MenuAppBar component
 */
const MenuAppBar = (): JSX.Element => {
  const auth = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = async () => {
    await auth?.dispatch({
      type: 'logOut',
    });
  };

  const MenuItemLink = (props: { icon: any; text: any; to: any }) => {
    const { icon, text, to } = props;

    const renderLink = useMemo(() => {
      const Link = (itemProps: any, ref: any) => (
        <RouterLink {...itemProps} to={to} ref={ref} role={undefined} />
      );
      return forwardRef(Link);
    }, [to]);

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
      <IconButton
        onClick={handleClick}
        sx={{
          height: '48px',
          width: '48px',
          padding: '12px',
        }}
      >
        <UserProfileIcon sizeChange={false} user={auth?.user!} />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: "''",
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
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {auth && auth.user
          ? [
              <MenuItemLink
                to={`/user/u/${auth.user.username}`}
                icon={<UserProfileIcon sizeChange={false} user={auth.user} />}
                text={auth.user.username}
                key="UserProfileIcon"
              />,
              <Divider key="Divider 1" />,
              <MenuItemLink
                to={`/settings`}
                icon={<SettingsOutlinedIcon />}
                text={'Settings'}
                key="SettingsOutlinedIcon"
              />,
              <MenuItem onClick={handleLogOut} key="LogoutOutlinedIcon">
                <ListItemIcon>
                  <LogoutOutlinedIcon fontSize="small" />
                </ListItemIcon>
                {`Log Out`}
              </MenuItem>,
            ]
          : [
              <MenuItemLink
                to={`/login`}
                icon={<LoginOutlinedIcon />}
                text={'Log In'}
                key="LoginOutlinedIcon"
              />,
              <MenuItemLink
                to={`/signup`}
                icon={<CreateOutlinedIcon />}
                text={'Sign Up'}
                key="CreateOutlinedIcon"
              />,
            ]}
      </Menu>
    </>
  );
};

export default MenuAppBar;
