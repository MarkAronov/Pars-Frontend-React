import React from 'react';
import { Avatar } from '@mui/material'
import pars from '../../pars.png'

export default function ParsLogo() {
    return (
        <Avatar
            sx={{
                height: '32px',
                width: '32px',
                boxShadow: '0 0 1em rgba(220,0,120,0.4)',
                borderRadius: '50%'
            }}
            src={pars}
            size="large"
        />
    )
}