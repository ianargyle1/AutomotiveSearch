/**
 * @file Contains the navbar component
 * @author Ian Argyle
 */

import React from "react";

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <div className="navbar-header">
            <a href="index.html" className="navbar-brand">
              <div className="brand-text brand-big visible text-uppercase">
                <strong className="text-primary">Auto</strong>
                <strong>Search</strong>
              </div>
              <div className="brand-text brand-sm">
                <strong className="text-primary">Auto</strong>
              </div>
            </a>
            <button className="sidebar-toggle">
              <i className="fa fa-long-arrow-left"></i>
            </button>
          </div>
          <div className="right-menu list-inline no-margin-bottom">
            <div className="list-inline-item">
              <a href="#">About</a>
            </div>
            <div className="list-inline-item">
              <a href="#">Contact</a>
            </div>
            <div className="list-inline-item">
              <a
                href="https://github.com/ianargyle1/AutomotiveSearch"
                target="_blank"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
