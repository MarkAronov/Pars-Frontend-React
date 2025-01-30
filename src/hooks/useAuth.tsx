import axios, { type AxiosRequestConfig } from "axios";
import PropTypes from "prop-types";
// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";

import {
	AuthContext,
	type DispatchTypes,
	type UserType,
} from "context/AuthContext";
import { useAsync } from "./useAsync";

const useProvideAuth = (): {
	userToken: string | null;
	user: UserType | null;
	setData: (user: UserType | null, token?: string | null) => void;
	dispatch: (action: DispatchTypes) => Promise<any>;
} => {
	const [userToken, setUserToken] = useState<string | null>(
		localStorage.getItem("token"),
	);
	const [user, setUser] = useState<any>(null);
	const setData = (user: UserType | null, token = userToken) => {
		setUserToken(token!);
		setUser(user!);
		if (token!) {
			localStorage.setItem("token", token!);
		} else {
			localStorage.removeItem("token");
		}
	};

	const axiosConfig = (
		method: AxiosRequestConfig["method"],
		url: AxiosRequestConfig["url"],
		data?: AxiosRequestConfig["data"],
		headers: AxiosRequestConfig["headers"] = {},
		responseType?: AxiosRequestConfig["responseType"],
	) => {
		const config: AxiosRequestConfig = {
			method: method,
			maxBodyLength: Number.POSITIVE_INFINITY,
			url: `${process.env.REACT_APP_BACKEND_URL}${url}`,
			headers: {
				"Access-Control-Allow-Origin": "*",
				Authorization: `Bearer ${userToken}`,
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
				axiosConfig("post", "/users", action?.formData!, {
					"Content-Type": "multipart/form-data",
				}),
			);
			setData(signUpData.data.user, signUpData.data.token);
			return signUpData;
		},
		logIn: async (action) => {
			const loginData = await axios.request<any>(
				axiosConfig("post", "/users/login", action?.formData!),
			);
			setData(loginData.data.user, loginData.data.token);
			return loginData;
		},
		logOut: async () => {
			const loggedOutData = await axios.request<Request>(
				axiosConfig("post", "/users/logout"),
			);
			setData(null, null);
			return loggedOutData;
		},
		logOutAll: async () => {
			const loggedOutAllData = await axios.request<Request>(
				axiosConfig("post", "/users/logoutall"),
			);
			setData(null, null);
			return loggedOutAllData;
		},
		getSelf: async (action) => {
			const selfData = await axios.request<Request>(
				axiosConfig("get", "/users/self", action?.formData!),
			);
			return selfData;
		},
		getUsers: async (action) => {
			const usersData = await axios.request<Request>(
				axiosConfig("get", "/users", action?.formData!),
			);
			return usersData;
		},
		getUser: async (action) => {
			const userData = await axios.request<Request>(
				axiosConfig("get", `/users/u/${action.userName}`, action?.formData!),
			);
			return userData;
		},
		updatePassword: async (action) => {
			const updatePasswordData = await axios.request<any>(
				axiosConfig("patch", "/users/self/password", action?.formData!),
			);
			return updatePasswordData;
		},
		updateImportant: async (action) => {
			const importantData = await axios.request<any>(
				axiosConfig("patch", "/users/self/important", action?.formData!),
			);
			setData(importantData.data);
			return importantData;
		},
		updateRegular: async (action) => {
			const regularData = await axios.request<any>(
				axiosConfig("patch", "/users/self/regular", action?.formData!, {
					"Content-Type": "multipart/form-data",
				}),
			);
			setData(regularData.data);
			return regularData;
		},
		deleteSelf: async () => {
			const deletedSelf = await axios.request<Request>(
				axiosConfig("delete", "/users/self"),
			);
			setData(null, null);
			return deletedSelf;
		},
		deletePartial: async (action) => {
			const deletedPartialData = await axios.request<Request>(
				axiosConfig("delete", "/users/self/partial", action?.formData!),
			);
			return deletedPartialData;
		},
		createPost: async (action) => {
			const postData = await axios.request<any>(
				axiosConfig("post", "/posts", action?.formData!, {
					"Content-Type": "multipart/form-data",
				}),
			);
			return postData;
		},
		getPosts: async (action) => {
			const postData = await axios.request<Request>(
				axiosConfig("get", "/posts", action?.formData!),
			);
			return postData;
		},
		getPost: async (action) => {
			const postData = await axios.request<Request>(
				axiosConfig("get", `/posts/${action.userName}`, action?.formData!),
			);
			return postData;
		},
		updatePost: async (action) => {
			const updatedPostData = await axios.request<any>(
				axiosConfig("patch", `/posts`, action?.formData!, {
					"Content-Type": "multipart/form-data",
				}),
			);
			return updatedPostData;
		},
		deletePost: async (action) => {
			const deletedPostData = await axios.request<any>(
				axiosConfig("delete", `/posts/${action?.postID}`),
			);
			return deletedPostData;
		},
		getMedia: async (action) => {
			const mediaData = await axios.request<Request>(
				axiosConfig(
					"get",
					`/media/${action.mediaType}/${action.mediaFile}`,
					undefined,
					undefined,
					"arraybuffer",
				),
			);
			const mediaBuffer: string = mediaData.data as unknown as string;
			return Buffer.from(mediaBuffer).toString("base64");
		},
	};

	const dispatch = async (action: DispatchTypes) => {
		try {
			const actionHandler = actionHandlers[action.type];
			if (actionHandler) {
				return await actionHandler(action);
			}
		} catch (err: any) {
			if (err.response) {
				if (err.response.status === 401) {
					//  || err.response.status === 500
					setData(null, null);
					return null;
				}
				if (err.response.status === 404) {
					if (action.userName === user?.username) {
						setData(null, null);
					}
					return null;
				}
				return err.response;
			}
		}
	};

	const selfFinder = useAsync(dispatch, false, {
		type: "getSelf",
	});

	useEffect(() => {
		if (user === null && userToken) {
			if (selfFinder.status === "idle") selfFinder.execute();
			else if (selfFinder.status === "success") setUser(selfFinder.value?.data);
			else if (selfFinder.status === "error") setUser(null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, userToken, selfFinder]);

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
