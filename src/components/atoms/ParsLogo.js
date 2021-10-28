import React from 'react';
import { IconButton, Avatar } from '@mui/material'
import pars from '../../pars.png'

export default function ParsLogo() {
    return (
        <IconButton
            size="small"
        >
            <Avatar
                sx={{
                    boxShadow: '0 0 1em rgba(220,0,120,0.4)',
                    borderRadius: '50%'
                }}
                src={pars}
            />
        </IconButton>
    )
}