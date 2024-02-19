// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { AuthContext, UserType, DispatchTypes } from 'context/AuthContext';

const useProvideAuth = (): {
  userToken: string | null;
  user: UserType | null;
  setData: (user: UserType | null, token?: string | null) => void;
  dispatch: (action: DispatchTypes) => Promise<any>;
} => {
  const [userToken, setUserToken] = useState<string | null>(
    localStorage.getItem('token')
  );
  const [user, setUser] = useState<any>(
    userToken ? dispatch('getUserData') : null
  );

  const setData = (user: UserType | null, token = userToken) => {
    setUserToken(token!);
    setUser(user!);
    if (user! && token!) {
      localStorage.setItem('token', token!);
    } else {
      localStorage.removeItem('token');
    }
  };

  const dispatch = async (action: DispatchTypes) => {
    try {
      switch (action.type) {
        case 'setData':
          setData(action.user!, action.token!);
          return;
        case 'getUserProfileMedia':
          const userMedia = await axios.get<any>(
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
          user![action.mediaType!] = null;
          setData(user);
          return;
        case 'setUserProfileMedia':
          const userProfileMediaData = await axios.post<any>(
            `${process.env.REACT_APP_BACKEND_URL}/users/me/${action.mediaType}`,
            action?.formData!,
            {
              headers: {
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + userToken,
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          return userProfileMediaData.data;
        case 'getUserData':
          const getUserData = await axios.patch<any>(
            `${process.env.REACT_APP_BACKEND_URL}/users/me/${action.updateType}`,
            action.params,
            {
              headers: {
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + userToken,
              },
            }
          );
          setData(getUserData.data);
          return;
        case 'updateUserData':
          const UserProfileData = await axios.patch<any>(
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
          console.log(action?.formData!);
          const loginData = await axios.post<any>(
            `${process.env.REACT_APP_BACKEND_URL}/users/login`,
            action?.formData!,
            {
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'multipart/form-data',
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
          const signUpData = await axios.post<any>(
            `${process.env.REACT_APP_BACKEND_URL}/users`,
            action?.formData!,
            {
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          setData(signUpData.data.user, signUpData.data.token);
          return;
        case 'find':
          return null;
        default:
          return;
      }
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 400) {
          return err.response.data;
        } else if (err.response.status === 401 || err.response.status === 500) {
          setData(null, null);
          return null;
        } else if (err.response.status === 404) {
          if (action.userName === user?.username) {
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

export const ProvideAuth = ({ children }) => {
  const auth: any = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

ProvideAuth.propTypes = {
  children: PropTypes.object.isRequired,
};

export const useAuth = () => useContext(AuthContext);
