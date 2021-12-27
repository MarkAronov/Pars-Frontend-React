import React from 'react';

import { Avatar } from '@mui/material';

export default function ParsLogo() {
    return (
        <Avatar
            sx={{
                height: '32px',
                width: '32px',
                boxShadow: '0 0 1em rgba(220,0,120,0.4)',
                borderRadius: '50%'
            }}
            src='/logo512.png'
            size='large'
        />
    );
}