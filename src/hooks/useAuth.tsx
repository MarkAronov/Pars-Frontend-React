// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios, { AxiosRequestConfig } from 'axios';

import { AuthContext, UserType, DispatchTypes } from 'context/AuthContext';
import { useAsync } from './useAsync';

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

  const axiosConfig = (
    method: AxiosRequestConfig['method'],
    url: AxiosRequestConfig['url'],
    data?: AxiosRequestConfig['data'],
    headers: AxiosRequestConfig['headers'] = {},
    responseType?: AxiosRequestConfig['responseType']
  ) => {
    const config: AxiosRequestConfig = {
      method: method,
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BACKEND_URL}${url}`,
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + userToken,
        ...headers,
      },
      responseType: responseType,
      data: data,
    };
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
      const signUpData = await axios.request<any>(
        axiosConfig('post', `/users`, action?.formData!, {
          'Content-Type': 'multipart/form-data',
        })
      );
      setData(signUpData.data.user, signUpData.data.token);
      return;
    },
    logIn: async (action) => {
      const loginData = await axios.request<any>(
        axiosConfig('post', `/users/login`, action?.formData!)
      );
      setData(loginData.data.user, loginData.data.token);
      return { user: loginData.data.user, token: loginData.data.token };
    },
    logOut: async () => {
      await axios.request<Request>(axiosConfig('post', `/users/logout`));
      setData(null, null);
      return;
    },
    logOutAll: async () => {
      await axios.request<Request>(axiosConfig('post', `/users/logoutall`));
      setData(null, null);
      return;
    },
    getSelf: async (action) => {
      const selfData = await axios.request<Request>(
        axiosConfig('get', `/users/self`, action?.formData!)
      );
      return selfData.data;
    },
    getUser: async (action) => {
      const userData = await axios.request<Request>(
        axiosConfig('get', `/users/u/${action.userName}`, action?.formData!)
      );
      return userData.data;
    },
    getUsers: async (action) => {
      const usersData = await axios.request<Request>(
        axiosConfig('get', `/users`, action?.formData!)
      );
      return usersData.data;
    },
    updatePassword: async (action) => {
      await axios.request<any>(
        axiosConfig('post', `/users/self/password`, action?.formData!)
      );
      return;
    },
    updateImportant: async (action) => {
      const importantData = await axios.request<any>(
        axiosConfig('post', `/users/self/important`, action?.formData!)
      );
      setData(importantData.data);
      return;
    },
    updateRegular: async (action) => {
      const regularData = await axios.request<any>(
        axiosConfig('post', `/users/self/regular`, action?.formData!, {
          'Content-Type': 'multipart/form-data',
        })
      );
      setData(regularData.data);
      return;
    },
    deleteSelf: async () => {
      await axios.request<Request>(axiosConfig('delete', `/users/self`));
      setData(null, null);
      return;
    },
    deletePartial: async (action) => {
      await axios.request<Request>(
        axiosConfig('delete', `/users/self/partial`, action?.formData!)
      );
      setData(null, null);
      return;
    },
  };

  const dispatch = async (action: DispatchTypes) => {
    try {
      //   case 'getUserProfileMedia':
      //     const userMedia = await axios.get<any>(
      //       `${process.env.REACT_APP_BACKEND_URL}/users/
      //     ${action.username}/${action.mediaType}`,
      //       axiosConfig({}, 'arraybuffer')
      //     );
      //     return Buffer.from(userMedia.data).toString('base64');

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

  const selfFinder = useAsync(dispatch, false, {
    type: 'getSelf',
  });

  useEffect(() => {
    if (user === null && userToken) {
      if (selfFinder.status === 'idle') selfFinder.execute();
      else if (selfFinder.status === 'success') setUser(selfFinder.value);
      else if (selfFinder.status === 'error') setUser(null);
    }
    return () => setUser(selfFinder.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, userToken]);

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
