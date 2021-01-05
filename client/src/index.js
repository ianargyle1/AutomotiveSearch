/**
 * @file Contains the definition for navbar/header, uses App component.
 * @author Ian Argyle
 */

import React from 'react';
import ReactDOM from 'react-dom';
import SearchBox from './components/SearchBox';
import Deals from './components/Deals';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <div className="navbar-header">
            <a href="index.html" className="navbar-brand">
              <div className="brand-text brand-big visible text-uppercase">
                <strong className="text-primary">Auto</strong>
                <strong>Search {this.props.location.search}</strong>
              </div>
              <div className="brand-text brand-sm">
                <strong className="text-primary">Auto</strong>
              </div>
            </a>
          <button className="sidebar-toggle"><i className="fa fa-long-arrow-left"></i></button>
        </div>
        <div className="right-menu list-inline no-margin-bottom">    
          <div className="list-inline-item">
            <a href="#">
              About
            </a>
          </div>
          <div className="list-inline-item">
            <a href="#">
              Contact
            </a>
          </div>
          <div className="list-inline-item">
            <a href="https://github.com/ianargyle1/AutomotiveSearch" target="_blank">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </nav>
    <section>
      <div className="container-fluid">
        <div className="d-flex justify-content-center">
          <SearchBox />
        </div>
        <Deals />
      </div>
    </section>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
