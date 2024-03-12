// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios, { AxiosRequestConfig } from 'axios';

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
  const [user, setUser] = useState<any>(null);

  const setData = (user: UserType | null, token = userToken) => {
    setUserToken(token!);
    setUser(user!);
    if (token!) {
      localStorage.setItem('token', token!);
    } else {
      localStorage.removeItem('token');
    }
  };

  const msgConfig = (
    headers: Record<string, string> = {},
    responseType?: string | null,
    params?: any | null
  ) => {
    const config: AxiosRequestConfig = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + userToken,
        ...headers,
      },
    };

    if (responseType) {
      config.responseType = responseType as AxiosRequestConfig['responseType'];
    }

    if (params) {
      config.params = params as AxiosRequestConfig['params'];
    }

    return config;
  };

  const actionHandlers: Record<
    string,
    (action: DispatchTypes) => Promise<any> | void
  > = {
    setData: (action) => {
      setData(action.user!, action.token!);
      return;
    },
    signUp: async (action) => {
      const signUpData = await axios.post<any>(
        `${process.env.REACT_APP_BACKEND_URL}/users`,
        action?.formData!,
        msgConfig({ 'Content-Type': 'multipart/form-data' })
      );
      setData(signUpData.data.user, signUpData.data.token);
      return;
    },
    logIn: async (action) => {
      const loginData = await axios.post<any>(
        `${process.env.REACT_APP_BACKEND_URL}/users/login`,
        action?.formData!,
        msgConfig()
      );
      setData(loginData.data.user, loginData.data.token);
      return { user: loginData.data.user, token: loginData.data.token };
    },
    logOut: async () => {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/logout`,
        {},
        msgConfig()
      );
      setData(null, null);
      return;
    },
    getSelf: async (action) => {
      const selfData = await axios.get<any>(
        `${process.env.REACT_APP_BACKEND_URL}/users/self`,
        msgConfig({}, null, action?.formData!)
      );
      return selfData.data;
    },
    getUser: async (action) => {
      const selfData = await axios.get<any>(
        `${process.env.REACT_APP_BACKEND_URL}/users/u/${action.userName}`,
        msgConfig({}, null, action?.formData!)
      );
      return selfData.data;
    },
  };

  const dispatch = async (action: DispatchTypes) => {
    try {
      //   case 'getUserProfileMedia':
      //     const userMedia = await axios.get<any>(
      //       `${process.env.REACT_APP_BACKEND_URL}/users/
      //     ${action.username}/${action.mediaType}`,
      //       msgConfig({}, 'arraybuffer')
      //     );
      //     return Buffer.from(userMedia.data).toString('base64');
      //   case 'deleteUserProfileMedia':
      //     await axios.delete(
      //       `${process.env.REACT_APP_BACKEND_URL}/users/me/${action.mediaType}`,
      //       msgConfig()
      //     );
      //     user![action.mediaType!] = null;
      //     setData(user);
      //     return;
      //   case 'setUserProfileMedia':
      //     const userProfileMediaData = await axios.post<any>(
      //       `${process.env.REACT_APP_BACKEND_URL}/users/me/${action.mediaType}`,
      //       action?.formData!,
      //       msgConfig({ 'Content-Type': 'multipart/form-data' })
      //     );
      //     return userProfileMediaData.data;
      //   case 'getUserData':
      //     const getUserData = await axios.patch<any>(
      //       `${process.env.REACT_APP_BACKEND_URL}/users/me/${action.updateType}`,
      //       action.params,
      //       msgConfig()
      //     );
      //     setData(getUserData.data);
      //     return getUserData.data;
      //   case 'updateUserData':
      //     const UserProfileData = await axios.patch<any>(
      //       `${process.env.REACT_APP_BACKEND_URL}/users/me/${action.updateType}`,
      //       action.params,
      //       msgConfig()
      //     );
      //     setData(UserProfileData.data);
      //     return UserProfileData.data;

      const actionHandler = actionHandlers[action.type];
      if (actionHandler) {
        return await actionHandler(action);
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
