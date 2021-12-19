import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuth } from '../Auth'

export default function ViewMediaDialog(props) {
    const auth = useAuth()
    const { open, handleClose, user } = props
    let isUserSelf
    if (user) isUserSelf = (auth.user.name === user.name)
    return (
        <Dialog
            fullWidth={true}
            maxWidth="sm"
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>{isUserSelf ? 'Your Avatar' : (user) ? `${user.name}'s Avatar` : ''}</DialogTitle>
            <DialogContent>
                <Box
                    noValidate
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        m: 'auto',
                        width: 'fit-content',
                    }}
                >
                    <img
                        style={{
                            objectFit: 'fit',
                            height: '100%',
                            width: '100%',
                        }}
                        src={(user && user.avatar)? `data:image/jpeg;base64,${user.avatar}` : ''}
                        alt={''}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                {(isUserSelf) ?
                    <>
                        <Button onClick={null}>Edit</Button>
                        <Button onClick={null}>Remove</Button>
                        <Button onClick={null}>Change</Button>
                    </> :
                    <></>
                }
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
