/**
 * @file Contains the definition for navbar/header, uses App component.
 * @author Ian Argyle
 */

import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <Router>
    <Navbar />
    <div className="container-fluid">
      <Route exact path="/" component={HomePage} />
      <Route exact path="/search" component={SearchPage} />
    </div>
  </Router>,
  document.getElementById("root")
);
