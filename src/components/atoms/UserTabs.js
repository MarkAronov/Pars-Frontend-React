import React from 'react';

import { styled } from '@mui/material/styles';
import { Tabs, Tab } from '@mui/material/';

const StyledTabs = styled((props) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
))(
    ({ theme }) => ({
        '& .MuiTabs-indicator': {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'transparent',
        },
        '& .MuiTabs-indicatorSpan': {
            maxWidth: 40,
            width: '100%',
            backgroundColor: theme.palette.primary.main,
        },
    })
);

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        '&.Mui-selected': {
            color: '#fff',
        },
        '&.Mui-focusVisible': {
            backgroundColor: 'rgba(100, 95, 228, 0.32)',
        },
    }),
);

export default function UserTabs(props) {
    const { tabValue, setTabValue, tabList } = props;

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <StyledTabs
            value={tabValue}
            onChange={handleChange}
            scrollButtons="auto"
            centered
        >
            {tabList.map(value => {
                return (
                    <StyledTab label={value} key={value} />
                );
            })}
        </StyledTabs>
    );
}
