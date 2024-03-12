import React, { useState } from 'react';

import {
  Menu,
  MenuItem,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  Badge,
} from '@mui/material';
import { NotificationsNoneOutlined as NotificationsNoneOutlinedIcon } from '@mui/icons-material/';

/**
 * The NotificationsAppBar component
 * @return {JSX.Element} returns a NotificationsAppBar component
 */
const NotificationsAppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton onClick={handleClick} size="large">
          <Badge badgeContent={0} color="error">
            <NotificationsNoneOutlinedIcon />
          </Badge>
        </IconButton>
      </Tooltip>
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
            '&:before': {
              content: '""',
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
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        <MenuItem>
          <Typography>You have no new notifications.</Typography>
        </MenuItem>
        <Divider />
      </Menu>
    </>
  );
};

export default NotificationsAppBar;
