import axios from 'axios';

export const SET_USER = 'SET_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const UPDATE_USER = 'UPDATE_USER';

// Action creators
export const setUser = (user, token) => {
  localStorage.setItem('token', token);
  return { type: SET_USER, payload: { user, token } };
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  return { type: LOGOUT_USER };
};

export const updateUser = (user) => {
  return { type: UPDATE_USER, payload: user };
};

// Async actions
export const loginUser = (formData) => async (dispatch) => {
  const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, formData);
  dispatch(setUser(response.data.user, response.data.token));
};

export const signUpUser = (formData) => async (dispatch) => {
  const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users`, formData);
  dispatch(setUser(response.data.user, response.data.token));
};

export const logOutUser = () => async (dispatch) => {
  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/logout`);
  dispatch(logoutUser());
};

export const logOutAllUsers = () => async (dispatch) => {
  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/logoutall`);
  dispatch(logoutUser());
};

export const getSelf = () => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/self`);
  dispatch(setUser(response.data.user, response.data.token));
};

export const updateUserPassword = (formData) => async (dispatch) => {
  const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/users/self/password`, formData);
  dispatch(updateUser(response.data.user));
};

export const updateUserImportant = (formData) => async (dispatch) => {
  const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/users/self/important`, formData);
  dispatch(updateUser(response.data.user));
};

export const updateUserRegular = (formData) => async (dispatch) => {
  const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/users/self/regular`, formData);
  dispatch(updateUser(response.data.user));
};

export const deleteUserSelf = () => async (dispatch) => {
  await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/users/self`);
  dispatch(logoutUser());
};

export const createPost = (formData) => async () => {
  const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/posts`, formData);
  return response.data;
};

export const getPosts = () => async () => {
  const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/posts`);
  return response.data;
};

export const getPost = (userName) => async () => {
  const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/posts/${userName}`);
  return response.data;
};

export const updatePost = (formData) => async () => {
  const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/posts`, formData);
  return response.data;
};

export const deletePost = (postID) => async () => {
  const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/posts/${postID}`);
  return response.data;
};