
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
    const [userToken, setUserToken] = useState(localStorage.getItem("token"));

    const signin = () => {
        setUserToken("set");
        localStorage.setItem("token", "set");
    }

    const signout = () => {
        setUserToken(null);
        localStorage.removeItem("token");
    }
    useEffect(() => {
    }, [userToken])

    return {
        userToken,
        signin,
        signout,
    }
}