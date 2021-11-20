import React from 'react';
import { Avatar } from '@mui/material'
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles'
import { useAuth } from '../Auth'

export default function UserProfileIcon(props) {
    const auth = useAuth()
    const theme = useTheme()

    return (
        <Avatar
            src={''}
            sx={{
                height: (props.sizeChange) ? '100%' : 'default',
                width: (props.sizeChange) ? '100%' : 'default',
                fontSize: '75vm',
                bgcolor: theme.palette.mode === 'dark' ?
                    alpha(theme.palette.common.white, 0.9) :
                    alpha(theme.palette.common.white, 0.5),
                
            }}
        >
            {
                (false) ?
                    '' :
                    (auth.user) ? auth.user.name[0] : ''
            }
        </Avatar>
    )
}