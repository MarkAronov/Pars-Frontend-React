import React from 'react'
import { Link, Container, Typography } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    footer: {
        padding: theme.spacing(2, 1),
        marginTop: 'auto',
        textAlign: 'center',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
    },
}))

export default function Footer() {
    const classes = useStyles()
    return (
        <footer className={classes.footer}>
            <Container maxWidth="sm">
                <Typography variant='body2' color='textSecondary' className={classes.text}>
                    <Link color='inherit' to="/about">
                        {'About Us '}
                    </Link>
                    {' '}
                    {`© ${new Date().getFullYear()} Pars`}
                </Typography>
            </Container>
        </footer>
    )
}
