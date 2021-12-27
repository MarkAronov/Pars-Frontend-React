import React from 'react';
import {
    Tooltip, IconButton, Box, InputBase, Button
} from '@mui/material/';
import {
    SearchOutlined as SearchOutlinedIcon,
    ArrowBackOutlined as ArrowBackOutlinedIcon,
} from '@mui/icons-material/';
import { styled, alpha, useTheme } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
    borderRadius: '5px',


    borderColor:
        theme.palette.mode === 'dark' ?
            alpha(theme.palette.common.white, 0.1) :
            alpha(theme.palette.common.white, 0.5),
    position: 'relative',
    backgroundColor:
        theme.palette.mode === 'dark' ?
            alpha(theme.palette.common.white, 0.1) :
            alpha(theme.palette.common.white, 0.5),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: '35%',
    },
    '&:focus-within': {
        borderRadius: '5px',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: 'white',
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    borderRadius: '5px 0px 0px 5px ',
    transition: '0.3s',
    '&:hover': {
        backgroundColor:
            theme.palette.mode === 'dark' ?
                alpha(theme.palette.common.white, 0.25) :
                alpha(theme.palette.grey[700], 0.5),
    },
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 0, 1, 0),
        paddingLeft: `calc(0.5em + ${theme.spacing(0.5)})`,
        transition: theme.transitions.create('width'),
    },
    width: 'calc(100% - 70px)',
}));

const SearchButton = styled(Button)(({ theme }) => ({
    borderRadius: ' 0px 5px 5px 0px',
    width: '70px',
    height: '100%',
    position: 'absolute',

    color: theme.palette.mode === 'dark' ?
        alpha(theme.palette.common.white, 1) :
        alpha(theme.palette.common.white, 0.5),
    '&:hover': {
        backgroundColor:
            theme.palette.mode === 'dark' ?
                alpha(theme.palette.common.white, 0.25) :
                alpha(theme.palette.common.white, 0.5),
    },
}));

export default function SearchBar(props) {
    const theme = useTheme();

    const handleMobileSearch = () => {
        props.setMoblieSearchBar(!props.moblieSearchBar);
    };

    return (
        <>
            <Box sx={{
                flex: 1,
                display: (props.moblieSearchBar) ? 'flex' : 'none',
                [theme.breakpoints.up('sm')]: {
                    display: { xs: 'flex', sm: 'none' }
                },
                mr: 1,
            }}>
                <Tooltip title="Back">
                    <IconButton
                        size="large"
                        onClick={handleMobileSearch}
                        color="inherit"
                    >
                        <ArrowBackOutlinedIcon />
                    </IconButton>

                </Tooltip>
            </Box>
            <Search
                sx={{
                    display: {
                        xs: (props.moblieSearchBar) ? 'initial' : 'none',
                        sm: 'initial'
                    }
                }}
            >
                <StyledInputBase
                    placeholder="Search"
                />
                <Tooltip title="Search">
                    <SearchButton >
                        <SearchOutlinedIcon />
                    </SearchButton>
                </Tooltip>
            </Search>
            <Box sx={{ display: { xs: (props.moblieSearchBar) ? 'none' : 'flex', sm: 'none' } }}>
                <Tooltip title="Search">
                    <IconButton
                        size="large"
                        onClick={handleMobileSearch}
                        color="inherit"
                    >
                        <SearchOutlinedIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        </>
    );
}