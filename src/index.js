import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "remixicon/fonts/remixicon.css";
import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from "react-router-dom";
import { StateProvider } from "./context/StateProvider";

import reducer from "./context/reducer";
import { initialState } from "./context/initialState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Router>
        <StateProvider initialState={initialState} reducer={reducer}>
          <App />
        </StateProvider>
      </Router>
    </HelmetProvider>
  </React.StrictMode>
);
