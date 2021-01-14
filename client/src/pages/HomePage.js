/**
 * @file Contains the home page
 * @author Ian Argyle
 */

import React from "react";
import SearchBox from "../components/SearchBox";
import Deals from "../components/Deals";

export default class HomePage extends React.Component {
  render() {
    return (
      <section>
        <div className="center-head">
          <h3>
            Search KSL Cars and Autotrader simultaniously (more coming soon)
          </h3>
        </div>
        <div className="d-flex justify-content-center">
          <SearchBox />
        </div>
        <Deals />
      </section>
    );
  }
}
