import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/slice/rootSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContextFilter from "./context/ContextFilter";
import 'core-js';
import './locales/index';

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ContextFilter>
      <App />
    </ContextFilter>
    <ToastContainer />
  </Provider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();
