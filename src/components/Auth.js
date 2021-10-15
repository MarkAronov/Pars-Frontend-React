
import React, { useState, useContext, createContext } from "react";
import axios from 'axios'

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

    const signIn = async (userEmail, userPassword) => {
        try {
            const result = await axios.post('http://localhost:3000/users/login',
                {
                    email: userEmail,
                    password: userPassword
                }, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            })
            setUserToken(result.data.token);
            setUser(result.data.user)
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("user", JSON.stringify(result.data.user))
        }
        catch (err) {
            if (err.response) {
                return (err.response)
            }
        }
    }

    const signOut = () => {
        axios.post('http://localhost:3000/users/logout',
            {}, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + userToken,
            },
        }).then(function (res) {
            setUserToken(null);
            setUser(null);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }).catch(function (err) {
            console.log(err)
        })
    }

    return {
        userToken,
        user,
        signIn,
        signOut,
    }
}