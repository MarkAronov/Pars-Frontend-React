import React from 'react';
import Header from '../molecules/Header';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    header: {
        position: 'sticky',
        
    },
}))

export default function MainPage() {
    const classes = useStyles();

    return (
        <>
            <Header className={classes.header} />
            
        </>
    );
}
