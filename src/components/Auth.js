
import React, { useEffect, useState, useContext, createContext } from "react";

const authContext = createContext();

export const ProvideAuth = ({ children }) => {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

export const useAuth = () => {

    return useContext(authContext);
};

const useProvideAuth = () => {
    const [userToken, setUserToken] = useState();

    const signin = () => {
        return (() => {
            setUserToken("user");
        })
    }

    const signout = () => {
        return (() => {
            setUserToken(null);
        })
    }


    return {
        userToken,
        signin,
        signout,
    }
}