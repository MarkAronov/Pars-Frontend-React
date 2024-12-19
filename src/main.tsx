import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import ThemeEngine from "./components/organisms/ThemeEngine";
import store from "./redux/store";
import './index.css'

const rootElement = document.getElementById("root");
if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<Provider store={store}>
				<ThemeEngine />
			</Provider>
		</StrictMode>,
	);
}
