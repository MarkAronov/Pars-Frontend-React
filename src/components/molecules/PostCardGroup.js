import React from 'react';
import PropTypes from 'prop-types';

import {Grid} from '@mui/material/';

import PostCard from '../atoms/PostCard';


/**
 * The PostCardGroup component, it groups postcards according to what's needed
 * @param {object} props object file that contains a postcards list
 * @return {JSX.Element} returns a PostCardGroup component
 */
const PostCardGroup = (props) => {
  const {cardlist} = props;

  return (
    <Grid container >
      {cardlist.map((value) => (
        <PostCard key={value} />
      ))}
    </Grid>
  );
};

PostCardGroup.propTypes = {
  cardlist: PropTypes.array,
};

export default PostCardGroup;
