import React from 'react'
import { Box, Link, Container, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

export default function Footer() {
    const theme = useTheme()
    return (
        <Box
            component="footer"
            align="center"
            sx={{
                py: 2,
                px: 2,
                mt: 'auto',
                textAlign: 'center',
                backgroundColor:
                    theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
            }}
        >
            <Container maxWidth="sm">
                <Typography variant='body2' color='textSecondary'>
                    <Link color='inherit'>
                        {'About Us'}
                    </Link>
                    {'  '}
                    {`© ${new Date().getFullYear()} Pars`}
                </Typography>
            </Container>
        </Box>
        // <footer
        //     sx={{
        //         py: 3,
        //         px: 2,
        //         mt: 'auto',
        //         backgroundColor:
        //             theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
        //     }}
        // >
        //     <Container maxWidth="sm">
        //        
        //     </Container>
        // </footer>
    )
}
