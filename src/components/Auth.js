
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
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const signin = (token, usr) => {
        setUserToken(token);
        setUser(usr)
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(usr))
    }

    const signout = () => {
        setUserToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
    useEffect(() => {
    }, [userToken])

    return {
        userToken,
        user,
        signin,
        signout,
    }
}