import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';

import { Box, Typography, Button } from '@mui/material';

export default function DynamicTypography(props) {
    const { type, user } = props;
    const [expandInfo, setExpandInfo] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [numberOfLines, setNumberOfLines] = useState(0);
    const ref = useRef(null);


    useEffect(() => {
        if (type === 'bio') setNumberOfLines(2);
        else if (type === "post") setNumberOfLines(4);
    }, [type, numberOfLines, user]);

    useLayoutEffect(() => {
        if (numberOfLines) {
            const lineNumber =
                Math.floor(
                    parseInt(ref.current.scrollHeight) /
                    (parseInt(ref.current.style.fontSize) * ref.current.style.lineHeight));
            // console.log(
            //     lineNumber, numberOfLines, ref.current.scrollHeight,
            //     ref.current.style.fontSize, ref.current.style.lineHeight
            // );
            if (lineNumber > numberOfLines) {
                setShowButton(true);
            }
        }
    }, [ref, numberOfLines, user]);

    const handleMoreBio = () => {
        setExpandInfo(!expandInfo);
    };

    return (
        <div >
            <Typography component="div">
                <Box
                    ref={ref}
                    style={{
                        fontSize: '16px',
                        lineHeight: '1.5',
                    }}
                    sx={{
                        mb: 1,
                        display: (expandInfo || !showButton) ? '' : '-webkit-box',
                        WebkitBoxOrient: (expandInfo || !showButton) ? '' : 'vertical',
                        WebkitLineClamp: (expandInfo || !showButton) ? '' : numberOfLines,
                        overflow: (expandInfo || !showButton) ? '' : 'hidden',
                        textOverflow: (expandInfo || !showButton) ? '' : 'ellipsis',
                        wordWrap: 'break-word',
                    }}
                >
                    {(user && user.bio) ? user.bio : `There's no bio for this user`}
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
    );
}
