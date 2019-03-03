import React from "react";
import ReactDOM from "react-dom";
import Gallery from "./Gallery";
import "./style.css";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<Gallery />, document.getElementById("root"));

serviceWorker.unregister();
