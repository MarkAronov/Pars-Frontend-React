// eslint-disable-next-line no-unused-vars
import React, { useContext, createContext, useState, useReducer } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// const useProvideAuthReducer = async (state, action) => {
//   const setData = (user, token) => {
//     state.token = token;
//     state.user = user;
//     if (user && token) {
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(user));
//     } else {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//     }
//   };

//   try {
//     switch (action.type) {
//       case 'setData':
//         setData(action.user, action.token);
//         return { ...state };
//       case 'getUserProfileMedia':
//         const userMedia = await axios.get(
//           `${process.env.REACT_APP_BACKEND_URL}/users/
//           ${action.username}/${action.mediaType}`,
//           {
//             responseType: 'arraybuffer',
//             headers: {
//               'Access-Control-Allow-Origin': '*',
//             },
//           }
//         );
//         return {
//           ...state,
//           results: Buffer.from(userMedia.data).toString('base64'),
//         };
//       case 'deleteUserProfileMedia':
//         await axios.delete(
//           `${process.env.REACT_APP_BACKEND_URL}/users/me/${action.mediaType}`,
//           {
//             headers: {
//               'Access-Control-Allow-Origin': '*',
//               Authorization: 'Bearer ' + state.userToken,
//             },
//           }
//         );
//         state.user[action.mediaType] = null;
//         setData(state.user, state.userToken);
//         return { ...state, user: state.user, userToken: state.userToken };
//       case 'setUserProfileMedia':
//         const formData = new FormData();
//         formData.append(action.mediaType, action.mediaFile);
//         const { userProfileMediaData } = await axios.post(
//           `${process.env.REACT_APP_BACKEND_URL}/users/me/${action.mediaType}`,
//           formData,
//           {
//             headers: {
//               'Access-Control-Allow-Origin': '*',
//               Authorization: 'Bearer ' + state.userToken,
//               'Content-Type': 'multipart/form-data',
//             },
//           }
//         );
//         return { ...state, results: userProfileMediaData };
//       case 'setUserProfileData':
//         const { UserProfileData } = await axios.post(
//           `${process.env.REACT_APP_BACKEND_URL}/users/me/${action.type}`,
//           action.params,
//           {
//             headers: {
//               'Access-Control-Allow-Origin': '*',
//               Authorization: 'Bearer ' + state.userToken,
//               'Content-Type': 'multipart/form-data',
//             },
//           }
//         );
//         return { ...state, results: UserProfileData };
//       case 'signIn':
//         const signInData = await axios.post(
//           `${process.env.REACT_APP_BACKEND_URL}/users/login`,
//           {
//             email: action.email,
//             password: action.password,
//           },
//           {
//             headers: {
//               'Access-Control-Allow-Origin': '*',
//             },
//           }
//         );
//         await setData(signInData.data.user, signInData.data.token);
//         return {
//           ...state,
//           user: signInData.user,
//           userToken: signInData.userToken,
//         };
//       case 'signOut':
//         await axios.post(
//           `${process.env.REACT_APP_BACKEND_URL}/users/logout`,
//           {},
//           {
//             headers: {
//               'Access-Control-Allow-Origin': '*',
//               Authorization: 'Bearer ' + state.userToken,
//             },
//           }
//         );
//         await setData(null, null);
//         return { ...state, user: null, userToken: null };
//       case 'signUp':
//         const { signUpData } = await axios.post(
//           `${process.env.REACT_APP_BACKEND_URL}/users`,
//           {
//             username: action.userName,
//             email: action.userEmail,
//             password: action.userPassword,
//           },
//           {
//             headers: {
//               'Access-Control-Allow-Origin': '*',
//             },
//           }
//         );
//         await setData(signUpData.user, signUpData.token);
//         return {
//           ...state,
//           user: signUpData.user,
//           userToken: signUpData.userToken,
//         };
//       // findType used to set what components do we
//       // want from the user at a given moment
//       case 'findUser':
//         const result = await axios.get(
//           `${process.env.REACT_APP_BACKEND_URL}/users/${action.userName}`,
//           {
//             headers: {
//               'Access-Control-Allow-Origin': '*',
//             },
//           }
//         );
//         return { ...state, results: result.data };
//       default:
//         return;
//     }
//   } catch (err) {
//     if (err.response) {
//       if (err.response.status === 400) {
//         return { ...state, errors: err.response.data };
//       } else if (err.response.status === 401 || err.response.status === 500) {
//         await setData(null, null);
//         return { ...state, errors: err.response.status };
//       } else if (err.response.status === 404) {
//         if (action.userName === state.user.username) {
//           await setData(null, null);
//         }
//         return { ...state, errors: err.response.status };
//       } else {
//         return { ...state, errors: err.response };
//       }
//     }
//   }
// };

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
          setData(user, userToken);
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
          console.log(userProfileMediaData);
          return userProfileMediaData.data;
        case 'setUserProfileData':
          const UserProfileData = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/users/me/${action.type}`,
            action.params,
            {
              headers: {
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + userToken,
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          return UserProfileData.data;
        case 'signIn':
          const signInData = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/users/login`,
            {
              email: action.email,
              password: action.password,
            },
            {
              headers: {
                'Access-Control-Allow-Origin': '*',
              },
            }
          );
          await setData(signInData.data.user, signInData.data.token);
          return;
        case 'signOut':
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
          await setData(null, null);
          return;
        case 'signUp':
          const signUpData = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/users`,
            {
              username: action.username,
              email: action.email,
              password: action.password,
            },
            {
              headers: {
                'Access-Control-Allow-Origin': '*',
              },
            }
          );
          await setData(signUpData.data.user, signUpData.data.token);
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
          await setData(null, null);
          return null;
        } else if (err.response.status === 404) {
          if (action.userName === user.username) {
            await setData(null, null);
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
  // const [state, dispatch] = useReducer(useProvideAuthReducer, {
  //   userToken: localStorage.getItem('token'),
  //   user: JSON.parse(localStorage.getItem('user')),
  //   results: null,
  //   errors: null,
  // });
  // const { user, userToken, results, errors } = state;
  // console.log(user, userToken);
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

ProvideAuth.propTypes = {
  children: PropTypes.object.isRequired,
};

export const useAuth = () => useContext(authContext);
