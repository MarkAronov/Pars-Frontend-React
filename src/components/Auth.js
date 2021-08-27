
import React, { useState, useContext, createContext } from "react";

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
    const [user, setUser] = useState(null);

    const signin = () => {
        return (() => {
            setUser("user");
            console.log("done")
            localStorage.setItem("token", "set");
        })
    }

    const signout = () => {
        return (() => {
            setUser(null);
            localStorage.removeItem("token");
        })
    }

    return {
        user,
        signin,
        signout,
    }
}