import React, { useLayoutEffect, useState, useRef } from 'react';
import { Grid, Box, Paper, Typography, Container, Button } from '@mui/material'
import { useTheme, alpha } from '@mui/material/styles'
import ParsTabs from '../atoms/UserTabs'
import UserProfileIcon from '../atoms/UserProfileIcon'
import {
    CheckOutlined as CheckOutlinedIcon,
    InterestsOutlined as InterestsOutlinedIcon
} from '@mui/icons-material/';
import LoadingButton from '@mui/lab/LoadingButton';
import PostCardGroup from '../molecules/PostCardGroup'
import back from '../../back.jpg'

export default function UserPage(props) {
    const { user } = props
    const [tabValue, setTabValue] = useState(0);
    const [expandInfo, setExpandInfo] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [isUserInsterested, setIsUserInsterested] = useState(false);
    const [updatingInterest, setUpdatingInterest] = useState(false);

    const handleInterest = async () => {
        setUpdatingInterest(true)
        await new Promise(resolve => {
            setTimeout(resolve, 2000)
        })
        setUpdatingInterest(false)
        if (!updatingInterest) {
            setIsUserInsterested(!isUserInsterested)
        }
    }

    const theme = useTheme()
    const ref = useRef(null);

    useLayoutEffect(() => {
        const lineNumber =
            Math.floor(
                parseInt(ref.current.offsetHeight) /
                (parseInt(ref.current.style.fontSize) * ref.current.style.lineHeight))
        if (lineNumber > 2) {
            setShowButton(true);
        }
    }, [ref]);

    const handleMoreBio = () => {
        setExpandInfo(!expandInfo)
    }

    const BioText = () => {
        return (
            <div>
                <Typography component="div">
                    <Box
                        ref={ref}
                        style={{
                            fontSize: '16px',
                            lineHeight: '1.5'
                        }}
                        sx={{
                            display: (expandInfo || !showButton) ? '' : '-webkit-box',
                            WebkitBoxOrient: (expandInfo || !showButton) ? '' : 'vertical',
                            WebkitLineClamp: (expandInfo || !showButton) ? '' : 2,
                            overflow: (expandInfo || !showButton) ? '' : 'hidden',
                            textOverflow: (expandInfo || !showButton) ? '' : 'ellipsis',
                        }}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut a
                    </Box>
                </Typography>
                {showButton && (
                    <Box
                        component='div'
                        sx={{
                            my: 2,
                            flexDirection: 'column',
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Button onClick={handleMoreBio}>
                            {(expandInfo) ? 'Show less' : 'Show more'}
                        </Button>
                    </Box>
                )}
            </div>
        )
    }

    return (
        <Container>
            <Grid
                container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '5px',
                    position: 'relative',
                    backgroundColor:
                        theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],

                }}
                component={Paper}
            >
                <Grid item sx={{
                    height: '120px',
                    [theme.breakpoints.down('sm')]: {
                        height: '90px',
                    },
                }}>
                    <img
                        style={{
                            objectFit: 'fit',
                            borderRadius: '5px 5px 0px 0px',
                            height: '100%',
                            width: '100%',
                        }}
                        src={back}
                        alt={''}
                    />
                </Grid>
                <Grid
                    item
                    sx={{
                        backgroundColor:
                            alpha(theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50], 0.3),
                        borderRadius: '0px 0px 5px 5px ',
                        height: '60%',
                    }}
                    square
                    component={Box}
                    elevation={6}
                >
                    <Box
                        direction="row"
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            position: 'relative',
                            alignItems: 'center',
                            flex: 1,
                            borderRadius: '0px 0px 7px 7px ',
                            mx: 2,
                            my: 2,
                            [theme.breakpoints.down('sm')]: {
                                mx: 1,
                                my: 1,
                            },
                        }}
                    >
                        <Box
                            sx={{
                                mr: 3,
                                width: '70px', height: '70px',
                                [theme.breakpoints.down('md')]: {
                                    mr: 1,
                                    width: '50px', height: '50px',
                                },
                                verticalAlign: 'middle',
                                alignItems: 'center',
                                borderRadius: '50%',
                                borderStyle: 'solid',
                                borderWidth: '5px',
                                borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100],
                                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100],
                            }}
                        >
                            <UserProfileIcon sizeChange={true} />
                        </Box>
                        <Typography variant={theme.breakpoints.down('md') ? 'h6' : 'h5'} color='inherit'>
                            {(user) ? user.name : 'No user with such name'}
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            flexGrow: 1,
                        }} />
                        <LoadingButton
                            onClick={handleInterest}
                            endIcon={(isUserInsterested) ? <CheckOutlinedIcon /> : <InterestsOutlinedIcon />}
                            loading={updatingInterest}
                            loadingPosition="end"
                            variant={(isUserInsterested) ? "outlined" : "contained"}
                        >
                            {(isUserInsterested) ? 'Interested' : 'Interest'}
                        </LoadingButton>
                    </Box>
                    <Box
                        component='div'
                        sx={{
                            mt: 2,
                            mx: 4,
                            minHeight: '48px',
                        }}
                    >
                        <BioText />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            borderTopStyle: 'solid',
                            top: '20%',
                            borderTopWidth: '2px',
                            borderColor:
                                theme.palette.mode === 'dark' ?
                                    alpha(theme.palette.common.white, 0.1) :
                                    alpha(theme.palette.common.white, 0.5),
                            py: 1,
                            width: 'auto',
                        }}
                    >
                        <ParsTabs tabValue={tabValue} setTabValue={setTabValue} tabList={["Posts", "Favorites", "More Info"]} />
                    </Box>
                </Grid>
            </Grid >
            <PostCardGroup/>
        </Container>
    );
}


