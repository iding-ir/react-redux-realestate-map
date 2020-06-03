import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "stylecraft/dist/stylecraft.css";
import "mapbox-gl/dist/mapbox-gl.css";

import store from "./stores";
import App from "./components/App";
import "./css/index.css";
import "./css/input-range.css";
import "./css/hacks.css";
import "./css/mapbox-hacks.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
