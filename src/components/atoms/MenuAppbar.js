import React from 'react';
import {
    Menu, MenuItem, Avatar, Divider, ListItemIcon,
    IconButton, Tooltip, Typography
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles'
import {
    PersonAddOutlined as PersonAddOutlinedIcon,
    SettingsOutlined as SettingsOutlinedIcon,
    LogoutOutlined as LogoutOutlinedIcon,
} from '@mui/icons-material'
import { useAuth } from '../Auth'
import { Link as RouterLink } from 'react-router-dom';

export default function MenuAppbar() {
    const theme = useTheme()
    const auth = useAuth()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSignOut = async () => {
        await auth.signOut()
    };
    const MenuItemLink = (props) => {
        const { icon, text, to } = props;

        const renderLink = React.useMemo(
            () =>
                React.forwardRef(function Link(itemProps, ref) {
                    return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
                }),
            [to],
        );

        return (
            <MenuItem component={renderLink}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                {text}
            </MenuItem>
        );
    }

    return (
        <>
            <Tooltip title="Account settings">
                <IconButton onClick={handleClick}  >
                    <Avatar sx={{
                        width: 32,
                        height: 32,
                        bgcolor: alpha(theme.palette.common.white, 1)
                        // bgcolor: theme.palette.mode === 'dark' ?
                        //     alpha(theme.palette.common.white, 1) :
                        //     alpha(theme.palette.common.white, 0.5),
                    }}
                    >
                        <Typography
                            sx={{
                                color: alpha(theme.palette.common.black, 1)
                            }}
                        >
                            {(auth.user) ? auth.user.name[0] : ''}
                        </Typography>
                    </Avatar>
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
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
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
                <MenuItemLink
                    to={(auth.user) ? `/user/${auth.user.name}` : ''}
                    icon={
                        <Avatar >
                            {(auth.user) ? auth.user.name[0] : ''}
                        </Avatar>
                    }
                    text={(auth.user) ? auth.user.name : ''}
                />
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <PersonAddOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <SettingsOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleSignOut}>
                    <ListItemIcon>
                        <LogoutOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}
