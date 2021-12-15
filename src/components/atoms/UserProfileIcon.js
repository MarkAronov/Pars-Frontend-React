import React from 'react';
import { Avatar } from '@mui/material'
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles'

export default function UserProfileIcon(props) {
    const { user } = props
    const theme = useTheme()

    let userNameLetter = '', userAvatar = ''
    if (user) {
        if (user.avatar) {
            userAvatar = `data:image/jpeg;base64,${user.avatar}`
        }
        else if (user.name) {
            userNameLetter = user.name[0]
        }
    }
    return (

        <Avatar
            src={userAvatar}
            sx={{
                height: (props.sizeChange) ? '100%' : 'default',
                width: (props.sizeChange) ? '100%' : 'default',
                fontSize: '75vm',
                bgcolor: theme.palette.mode === 'dark' ?
                    alpha(theme.palette.common.white, 0.9) :
                    alpha(theme.palette.common.white, 0.5),
            }}
        >
            {userNameLetter}
        </Avatar>
    )
}