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

    const signin = (func) => {
        return (() => {
            setUser("user");
            localStorage.setItem("token", "set");
            func()
        })
    }

    const signout = (func) => {
        return (() => {
            setUser(null);
            localStorage.removeItem("token");
            func()
        })
    }

    return {
        user,
        signin,
        signout,
    }
}