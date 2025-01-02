import React from "react";
import {
	BrowserRouter,
	Redirect,
	Route,
	Switch,
	useParams,
} from "react-router-dom";

import ContainerPage from "./ContainerPage";

import AboutPage from "./Pages/AboutPage";
import ErrorPage from "./Pages/ErrorPage";
import ExplorePage from "./Pages/ExplorePage";
import HomePage from "./Pages/HomePage";
import InterestsPage from "./Pages/InterestsPage";
import SettingsPage from "./Pages/SettingsPage";
import StartPage from "./Pages/StartPage";
import UserPage from "./Pages/UserPage";

import Login from "@/molecules/Login";
import SignUp from "@/molecules/SignUp";
import StartButtons from "@/molecules/StartButtons";

import { useAuth } from "@/@/hooks/useAuth";

/**
 * Routing function, used for routing the app according to a given url
 * @return {JSX.Element} the specific page
 */
const PageRouter = () => {
	const auth = useAuth();

	const UserRoute = () => {
		const { username } = useParams<{ username: string }>();
		return <UserPage username={username} />;
	};

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/">
					{auth?.userToken ? <Redirect to="/home" /> : <Redirect to="/start" />}
				</Route>
				<Route path="/about">
					<AboutPage />
				</Route>
				<Route path="/home">
					<ContainerPage page={<HomePage />} />
				</Route>
				<Route path="/explore">
					{auth?.userToken ? (
						<ContainerPage page={<ExplorePage />} />
					) : (
						<Redirect to="/start" />
					)}
				</Route>
				<Route path="/interests">
					{auth?.userToken ? (
						<ContainerPage page={<InterestsPage />} />
					) : (
						<Redirect to="/start" />
					)}
				</Route>
				<Route path="/settings">
					{auth?.userToken ? (
						<ContainerPage page={<SettingsPage />} />
					) : (
						<Redirect to="/start" />
					)}
				</Route>
				<Route path="/user/u/:username">
					<ContainerPage page={<UserRoute />} />
				</Route>
				<Route path="/start">
					{auth?.userToken ? (
						<Redirect to="/home" />
					) : (
						<StartPage page={<StartButtons />} />
					)}
				</Route>
				<Route path="/signup">
					{auth?.userToken ? (
						<Redirect to="/home" />
					) : (
						<StartPage page={<SignUp />} />
					)}
				</Route>
				<Route path="/login">
					{auth?.userToken ? (
						<Redirect to="/home" />
					) : (
						<StartPage page={<Login />} />
					)}
				</Route>
				<Route path="*">
					<ErrorPage />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default PageRouter;
