/**
 * @file Contains the small version of the vehicle component. Includes price, mileage, and campare to price
 * @author Ian Argyle
 */

import React from "react";
import UndervalBox from "./UndervalBox";

export default class VehicleSmall extends React.Component {
  /**
   * Open the vehicle in a new tab.
   */
  openLink = () => {
    const win = window.open(this.props.vehicle.link, "_blank");
    if (win != null) {
      win.focus();
    }
  };
  render() {
    return (
      <div className="col-sm-3">
        <div className="block vehicle-small" onClick={this.openLink}>
          <img src={this.props.vehicle.img} className="img-fluid" />
          <div className="mt-1">
            <h3>{this.props.vehicle.title}</h3>
          </div>
          <span>
            ${this.props.vehicle.price.toLocaleString()}
            <UndervalBox
              undervalue={this.props.vehicle.undervalue}
              price={this.props.vehicle.price}
            />
          </span>
          <div className="mt-1">
            {this.props.vehicle.mileage.toLocaleString()} Miles
          </div>
        </div>
      </div>
    );
  }
}
