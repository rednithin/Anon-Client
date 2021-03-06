import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { Router } from "react-router-dom";
import { RouterStore, syncHistoryWithStore } from "mobx-react-router";
import createBrowserHistory from "history/createBrowserHistory";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./models/store";

import("normalize.css/normalize.css");
import("@blueprintjs/icons/lib/css/blueprint-icons.css");
import("@blueprintjs/core/lib/css/blueprint.css");

const browserHistory = createBrowserHistory();
const routing = new RouterStore();

const stores = {
  store,
  routing
};

const history = syncHistoryWithStore(browserHistory, routing);

ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
