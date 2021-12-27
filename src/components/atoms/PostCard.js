import React from 'react';

import {
    Card, CardHeader, CardMedia, CardContent,
    CardActions, Avatar, IconButton, Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function RecipeReviewCard(props) {
    const theme = useTheme();

    return (
        <Card sx={{
            my: 3,
            mx: 2,
            maxWidth: 450,
            backgroundColor:
                theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        }}>
            <CardMedia
                component="img"
                height="194"
                image="https://picsum.photos/200/300"
                alt="Paella dish"
            />
            <CardHeader
                avatar={
                    <Avatar >
                        R
                    </Avatar>
                }
                action={
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton>
                    <FavoriteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
