import React from 'react';
import { Grid, Box, Paper, Typography, Tabs, Tab } from '@mui/material'
import { useTheme, alpha } from '@mui/material/styles'
import UserProfileIcon from '../atoms/UserProfileIcon'
import back from '../../back.jpg'


export default function UserPage(props) {
    const { user } = props
    const [tabValue, setTabValue] = React.useState(0);
    const theme = useTheme()

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const BioText = () => {
        return (
            <div style={{ width: 200, whiteSpace: 'nowrap' }}>

                <Box
                    component="div"
                    sx={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                    }}
                >
                    <Typography color='inherit'>
                        {(user) ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut a' : 'No user with such name'}
                    </Typography>
                </Box>
            </div>
        )
    }

    return (
        <Grid
            container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '15px',
                position: 'relative',
                backgroundColor:
                    theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
                height: '400px',
                [theme.breakpoints.down('sm')]: {
                    height: '300px',
                },
            }}
            component={Paper}
        >
            <Grid item sx={{
                height: '40%',
            }}>
                <img
                    style={{
                        objectFit: 'fit',
                        borderRadius: '15px 15px 0px 0px',
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
                    borderRadius: '0px 0px 15px 15px ',
                    height: '60%',
                    // boxShadow: '0px -10px 50px -2px black'

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
                        mx: 3,
                        my: 3,
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
                    <Typography variant='h5' color='inherit'>
                        {(user) ? user.name : 'No user with such name'}
                    </Typography>
                </Box>
                <Box
                    component='div'
                    sx={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        my: 2,
                        mx: 4,
                        display: 'block',
                        flexDirection: 'column',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'pre-line',
                        overflow: 'hidden',
                        minHeight: '48px',
                    }}
                >
                    <BioText />
                </Box>
                <Box>
                    <Tabs
                        value={tabValue}
                        onChange={handleChange}
                        scrollButtons="auto"
                        centered
                    >
                        {["Favorites", "Posts", "More Info"].map(value => {
                            return (
                                <Tab
                                    label={value}
                                    key={value}
                                    sx={{
                                        borderRadios: '50%',
                                    }}
                                />
                            )
                        })}
                    </Tabs>
                </Box>
            </Grid>
        </Grid >
    );
}


