import React from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import {
    Tooltip, IconButton, Box, InputBase, Button
} from '@mui/material/';
import {
    Search as SearchIcon,
    ArrowBack as ArrowBackIcon,
} from '@mui/icons-material/'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '3px',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: '35%',
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    borderRadius: '3px 0px 0px 3px',
    '&:hover': {
        backgroundColor:
            theme.palette.mode === 'dark' ?
                alpha(theme.palette.common.white, 0.25) :
                alpha(theme.palette.common.white, 0.5),
    },
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 0, 1, 0),
        paddingLeft: `calc(0.5em + ${theme.spacing(0.5)})`,
        transition: theme.transitions.create('width'),
        '&:focus': {
            borderRadius: '3px 0px 0px 3px',
            backgroundColor:
                theme.palette.mode === 'dark' ?
                    alpha(theme.palette.common.white, 0.25) :
                    alpha(theme.palette.common.white, 0.5),
        },
    },
    width: 'calc(100% - 70px)',
}));

const SearchButton = styled(Button)(({ theme }) => ({
    borderRadius: ' 0px 3px 3px 0px',
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
    const theme = useTheme()

    const handleMobileSearch = () => {
        props.setMoblieSearchBar(!props.moblieSearchBar)
    };
    
    return (
        <>
            <Box sx={{
                flex: 1,
                display: (props.moblieSearchBar) ? 'flex' : 'none',
                [theme.breakpoints.up('sm')]: {
                    display: { xs: 'flex', sm: 'none' }
                }
            }}>
                <IconButton
                    size="large"
                    onClick={handleMobileSearch}
                    color="inherit"
                >
                    <ArrowBackIcon />
                </IconButton>
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
                        <SearchIcon />
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
                        <SearchIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        </>
    );
}