import React, {useState, useContext, createContext} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const authContext = createContext();

export const ProvideAuth = ({children}) => {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
};

ProvideAuth.propTypes = {
  children: PropTypes.object.isRequired,
};


export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [userToken, setUserToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));


  const setData = async (user, token) => {
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

  const getUserProfileMedia = async (token, username, mediaType) => {
    let userMedia;
    try {
      userMedia = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/users/${username}/${mediaType}`,
          {
            responseType: 'arraybuffer',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Authorization': 'Bearer ' + token,
            },
          });
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          await setData(null, null);
          return (null);
        } else if (err.response.status === 404) {
          return null;
        } else return (err.response);
      }
    }
    return Buffer.from(userMedia.data).toString('base64');
  };


  const deleteUserProfileMedia = async (mediaType) => {
    try {
      await axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/users/me/${mediaType}`,
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Authorization': 'Bearer ' + userToken,
            },
          });
      if (mediaType === 'avatar') {
        user.avatar = null;
        setData(user, userToken);
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          await setData(null, null);
        } else return (err.response);
      }
    }
  };

  const setUserProfileMedia = async (mediaType, mediaFile) => {
    let userMedia;
    try {
      const formData = new FormData();
      formData.append(mediaType, mediaFile);
      userMedia = await axios.post(`
      ${process.env.REACT_APP_BACKEND_URL}/users/me/${mediaType}`,
      formData,
      {
        responseType: 'arraybuffer',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Bearer ' + userToken,
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          await setData(null, null);
        } else return (err.response);
      }
    }
    return Buffer.from(userMedia.data).toString('base64');
  };

  const signIn = async (userEmail, userPassword) => {
    try {
      const {data} = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          {
            email: userEmail,
            password: userPassword,
          }, {
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
          });

      data.user.avatar = await getUserProfileMedia(
          data.token, data.user.username, 'avatar',
      );
      data.user.backgroundImage = await getUserProfileMedia(
          data.token, data.user.username, 'backgroundImage',
      );
      await setData(data.user, data.token);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          return (Object.keys(err.response.data)[0]);
        }
        if (err.response.status === 401) {
          await setData(null, null);
        } else return (err.response);
      }
    }
  };

  const signUp = async (userName, userEmail, userPassword) => {
    try {
      const {data} = await axios.post(`
      ${process.env.REACT_APP_BACKEND_URL}/users`,
      {
        username: userName,
        email: userEmail,
        password: userPassword,
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
      await setData(data.user, data.token);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          return (err.response.data);
        }
        if (err.response.status === 401) {
          await setData(null, null);
        } else return (err.response);
      }
    }
  };

  const signOut = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/logout`,
          {}, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Authorization': 'Bearer ' + userToken,
            },
          });
      await setData(null, null);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          await setData(null, null);
        } else return (err.response);
      }
    }
  };

  // findType used to set what components do we
  // want from the user at a given moment
  const findUser = async (userName, findType) => {
    let result;
    try {
      result = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/users/${userName}`,
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Authorization': 'Bearer ' + userToken,
            },
          });
      result.data.user.avatar =
                await getUserProfileMedia(
                    result.data.token,
                    result.data.user.username,
                    'avatar',
                );
      result.data.user.backgroundImage =
                await getUserProfileMedia(
                    result.data.token,
                    result.data.user.username,
                    'backgroundImage',
                );
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          await setData(null, null);
        } else if (err.response.status === 404) {
          return null;
        } else return (err.response);
      }
    }
    return (result.data);
  };

  return {
    userToken,
    user,
    getUserProfileMedia,
    setUserProfileMedia,
    deleteUserProfileMedia,
    signIn,
    signUp,
    signOut,
    findUser,
    setData,
  };
};
