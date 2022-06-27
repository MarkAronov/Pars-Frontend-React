import React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import { Tabs, Tab } from '@mui/material/';

const StyledTabs = styled<any>((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))(({ theme }) => ({
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
}));

const StyledTab = styled<any>((props) => <Tab disableRipple {...props} />)(
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
  })
);

/**
 * The UserTabs component
 * @param {object} props object file that contains all the needed props to
 *                       control the UserTabs
 * @return {JSX.Element} returns a UserTabs component
 */
const UserTabs = (props) => {
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
      {tabList.map((value) => (
        <StyledTab label={value} key={value} />
      ))}
    </StyledTabs>
  );
};

UserTabs.propTypes = {
  tabValue: PropTypes.number.isRequired,
  setTabValue: PropTypes.func.isRequired,
  tabList: PropTypes.array.isRequired,
};

export default UserTabs;
