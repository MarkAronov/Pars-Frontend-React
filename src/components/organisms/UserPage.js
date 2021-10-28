import React from 'react';
import { Grid, Box, Paper, Typography } from '@mui/material'
import { useAuth } from '../Auth'

export default function UserPage(props) {
    const auth = useAuth()
    const { user } = props
    return (
        <Paper
            sx={{
                position: 'relative',
                backgroundColor: 'grey.800',
                color: '#fff',
                mt: 4,
                mb: 4,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(${(user) ? auth.user.wallpaper : ""})`,
            }}
        >
            {/* Increase the priority of the hero background image */}
            {<img style={{ display: 'none' }} src={props.image} alt={props.imageText} />}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,.3)',
                }}
            />
            <Grid container>
                <Grid item md={6}>
                    <Box
                        sx={{
                            position: 'relative',
                            p: { xs: 3, md: 6 },
                            pr: { md: 0 },
                        }}
                    >
                        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                            {(user) ? user.name : "No user with such name"}
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                            {(user) ? user.name : "No user with such name"}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}
