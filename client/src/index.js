/**
 * @file Contains the definition for navbar/header, uses App component.
 * @author Ian Argyle
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router} from 'react-router-dom'
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router>
    <Navbar />
    <div className="container-fluid">
      <Route exact path='/' component={HomePage}/>
      <Route exact path='/search' component={SearchPage}/>
    </div>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
