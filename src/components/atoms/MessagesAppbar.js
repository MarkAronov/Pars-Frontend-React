import React from 'react';
import {
    Menu, MenuItem, Divider,
    IconButton, Tooltip, Typography, Badge,
} from '@mui/material';
import {
    Mail as MailIcon,
} from '@mui/icons-material'

export default function MessagesAppbar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Tooltip title="Messages">
                <IconButton
                    size="large"
                    color="inherit"
                    onClick={handleClick}
                >
                    <Badge badgeContent={0} color="error">
                        <MailIcon />
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
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <Typography>
                        You have no new messages.
                    </Typography>
                </MenuItem>
                <Divider />

            </Menu>
        </>
    );
}
