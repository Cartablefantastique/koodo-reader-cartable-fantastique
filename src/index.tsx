import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/reset.css";
import "./assets/styles/global.css";
import "./assets/styles/style.css";
import { Provider } from "react-redux";
import "./i18n";
import store from "./store";
import Router from "./router/index";
import StyleUtil from "./utils/readUtils/styleUtil";
import { initSystemFont, initTheme } from "./utils/serviceUtils/launchUtil";
import * as serviceWorker from './serviceWorkerRegistration';

initTheme();
initSystemFont();

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById("root")
);

StyleUtil.applyTheme();

serviceWorker.register();
