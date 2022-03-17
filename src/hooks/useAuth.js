// eslint-disable-next-line no-unused-vars
import React, { useContext, createContext, useState, useReducer } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const useProvideAuth = () => {
  const [userToken, setUserToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const setData = (user, token = userToken) => {
    setUserToken(token);
    setUser(user);
    if (user && token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  const dispatch = async (action) => {
    try {
      switch (action.type) {
        case 'setData':
          setData(action.user, action.token);
          return;
        case 'getUserProfileMedia':
          const userMedia = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/users/
          ${action.username}/${action.mediaType}`,
            {
              responseType: 'arraybuffer',
              headers: {
                'Access-Control-Allow-Origin': '*',
              },
            }
          );
          return Buffer.from(userMedia.data).toString('base64');
        case 'deleteUserProfileMedia':
          await axios.delete(
            `${process.env.REACT_APP_BACKEND_URL}/users/me/${action.mediaType}`,
            {
              headers: {
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + userToken,
              },
            }
          );
          user[action.mediaType] = null;
          setData(user);
          return;
        case 'setUserProfileMedia':
          const formData = new FormData();
          formData.append(action.mediaType, action.mediaFile);
          const userProfileMediaData = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/users/me/${action.mediaType}`,
            formData,
            {
              headers: {
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + userToken,
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          return userProfileMediaData.data;
        case 'updateUserData':
          const UserProfileData = await axios.patch(
            `${process.env.REACT_APP_BACKEND_URL}/users/me/${action.updateType}`,
            action.params,
            {
              headers: {
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + userToken,
              },
            }
          );
          setData(UserProfileData.data);
          return;
        case 'login':
          const loginData = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/users/login`,
            action.params,
            {
              headers: {
                'Access-Control-Allow-Origin': '*',
              },
            }
          );
          setData(loginData.data.user, loginData.data.token);
          return;
        case 'logout':
          await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/users/logout`,
            {},
            {
              headers: {
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + userToken,
              },
            }
          );
          setData(null, null);
          return;
        case 'signUp':
          const signUpData = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/users`,
            action.params,
            {
              headers: {
                'Access-Control-Allow-Origin': '*',
              },
            }
          );
          setData(signUpData.data.user, signUpData.data.token);
          return;
        // findType used to set what components do we
        // want from the user at a given moment
        case 'findUser':
          const foundUser = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/users/${action.username}`,
            {
              headers: {
                'Access-Control-Allow-Origin': '*',
              },
            }
          );
          return foundUser.data;
        default:
          return;
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          return err.response.data;
        } else if (err.response.status === 401 || err.response.status === 500) {
          setData(null, null);
          return null;
        } else if (err.response.status === 404) {
          if (action.userName === user.username) {
            setData(null, null);
          }
          return null;
        } else {
          return err.response;
        }
      }
    }
  };

  return { userToken, user, setData, dispatch };
};

const authContext = createContext();

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

ProvideAuth.propTypes = {
  children: PropTypes.object.isRequired,
};

export const useAuth = () => useContext(authContext);
