import React from 'react';
import {Button, Grid} from '@material-ui/core/';
import { makeStyles, useTheme } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    pbsize: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const PButton = () => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        mode: 'none',
    });
    const handleClickChnageSign = (event) => {
        setValues({ ...values, mode: event.currentTarget.id });
    };

    const handleMouseDownSign = (event) => {
        event.preventDefault();
    };

    return (
            <Button
                id='signIn'
                type="button"
                fullWidth
                variant="contained"
                onClick={handleClickChnageSign}
                onMouseDown={handleMouseDownSign}
                className={classes.pbsize}
            >
                Sign In
            </Button>
    )
}

export default PButton