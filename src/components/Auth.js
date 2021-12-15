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

    const setData = async (user, token) => {
        setUserToken(token);
        setUser(user)
        if (user && token) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user))
        }
        else {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    }

    const getAvatar = async (token, username) => {
        let avatarRequest
        try {
            avatarRequest = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/${username}/avatar`, {
                responseType: 'arraybuffer',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + token,
                },
            })
        } catch (err) {
            if (err.response) {
                console.log(err.response)
                if (err.response.status === 401) {
                    await setData(null, null)
                    return (null)
                }
                else if (err.response.status === 404) {
                    avatarRequest = null
                    return avatarRequest
                }
                else return (err.response)
            }
        }
        return Buffer.from(avatarRequest.data).toString('base64');
    }

    const signIn = async (userEmail, userPassword) => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`,
                {
                    email: userEmail,
                    password: userPassword
                }, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            })
            data.user.avatar = await getAvatar(data.token, data.user.name)
            await setData(data.user, data.token)
        }
        catch (err) {
            if (err.response) {
                console.log(err.response.data);
                if (err.response.status === 401) {
                    await setData(null, null)
                }
                else return (err.response)
            }
        }
    }

    const signUp = async (userName, userEmail, userPassword) => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users`,
                {
                    name: userName,
                    email: userEmail,
                    password: userPassword
                }, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            })
            await setData(data.user, data.token)
        }
        catch (err) {
            if (err.response) {
                console.log(err.response.data);
                if (err.response.status === 401) {
                    await setData(null, null)
                }
                else return (err.response)
            }
        }
    }

    const signOut = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/logout`,
                {}, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + userToken,
                },
            })
            await setData(null, null)
        }
        catch (err) {
            if (err.response) {
                console.log(err.response.data);
                if (err.response.status === 401) {
                    await setData(null, null)
                }
            }
        }
    }

    const findUser = async (userName) => {
        let result
        try {
            result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/${userName}`,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Authorization': 'Bearer ' + userToken,
                    },
                })
            result.data.user.avatar = URL.createObjectURL(
                await getAvatar(result.data.token, result.data.user.name)
            )
        }
        catch (err) {
            if (err.response) {
                console.log(err.response.data);
                if (err.response.status === 401) {
                    await setData(null, null)
                }
                else if (err.response.status === 404) {
                    return null
                }
                else return (err.response)
            }
        }
        return (result.data)
    }

    return {
        userToken,
        user,
        signIn,
        signUp,
        signOut,
        findUser,
    }
}