import React, { useContext, createContext, useState } from 'react';
import PropTypes from 'prop-types';

const useProvideGlobalProps = () => {
  const [props, setProps] = useState({});

  return { props, setProps };
};

const gloablPropsContext = createContext();

export const ProvideGlobalProps = ({ children }) => {
  const globalProps = useProvideGlobalProps();

  return (
    <gloablPropsContext.Provider value={globalProps}>
      {children}
    </gloablPropsContext.Provider>
  );
};

ProvideGlobalProps.propTypes = {
  children: PropTypes.object.isRequired,
};

export const useGlobalProps = () => useContext(gloablPropsContext);
