import * as React from 'react';
import { Grid } from '@mui/material/';
import PostCard from '../atoms/PostCard';

const cards = [1, 2, 3,];

export default function PostCardGroup(props) {
    return (
        <Grid container >
            {cards.map((card) => (
                <PostCard key={card} />
            ))}
        </Grid>
    );
}