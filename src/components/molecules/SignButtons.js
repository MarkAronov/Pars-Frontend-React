import React from 'react'
import { Button, Grid } from '@mui/material'
import { Link } from "react-router-dom"

export default function SignButtons() {
    return (
        <>
            <Grid item xs={12} sm={12} >
                <Button
                    id='signin'
                    type="button"
                    fullWidth
                    variant="contained"
                    component={Link}
                    to="/signin"
                >
                    Sign In
                </Button>
            </Grid>
            <Grid item xs={12} sm={12} >
                <Button
                    id='signup'
                    type="button"
                    fullWidth
                    variant="outlined"
                    component={Link}
                    to="/signup"
                >
                    Sign Up
                </Button>
            </Grid>
        </>
    )
}
