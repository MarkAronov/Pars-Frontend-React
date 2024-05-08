import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { Box, Typography, Button } from '@mui/material';

/**
 * The DynamicTypography component
 * @param {object} props object file that contains all the needed props to
 *                       diplay the DynamicTypography
 * @return {JSX.Element} returns a DynamicTypography component
 */
const DynamicTypography = (props) => {
  const { type, user } = props;
  const [expandInfo, setExpandInfo] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [numberOfLines, setNumberOfLines] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (type === 'bio') setNumberOfLines(2);
    else if (type === 'post') setNumberOfLines(4);
  }, [type, numberOfLines, user]);

  useLayoutEffect(() => {
    if (numberOfLines) {
      const currentRef: any = ref?.current;
      const lineNumber = Math.floor(
        parseInt(currentRef.scrollHeight) /
          (parseInt(currentRef.style.fontSize) * currentRef.style.lineHeight)
      );
      if (lineNumber > numberOfLines) {
        setShowButton(true);
      }
    }
  }, [ref, numberOfLines, user]);

  const handleMoreBio = () => {
    setExpandInfo(!expandInfo);
  };

  return (
    <div>
      <Typography component="div">
        <Box
          ref={ref}
          style={{
            fontSize: '16px',
            lineHeight: '1.5',
          }}
          sx={{
            mb: 1,
            display: expandInfo || !showButton ? '' : '-webkit-box',
            WebkitBoxOrient: expandInfo || !showButton ? '' : 'vertical',
            WebkitLineClamp: expandInfo || !showButton ? '' : numberOfLines,
            overflow: expandInfo || !showButton ? '' : 'hidden',
            textOverflow: expandInfo || !showButton ? '' : 'ellipsis',
            wordWrap: 'break-word',
          }}
        >
          {user && user.bio ? user.bio : `There's no bio for this user`}
        </Box>
      </Typography>
      {showButton && (
        <Box
          component="div"
          sx={{
            my: 2,
            flexDirection: 'column',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button onClick={handleMoreBio}>
            {expandInfo ? 'Show less' : 'Show more'}
          </Button>
        </Box>
      )}
    </div>
  );
};

DynamicTypography.propTypes = {
  type: PropTypes.string,
  user: PropTypes.object,
};

export default DynamicTypography;
