/**
 * @file Contains the deals component which shows deals near the user.
 * @author Ian Argyle
 */

import React from "react";
import VehicleSmall from "./VehicleSmall";
import { getVehicles } from "../services/getVehicles";
import { sortVehicles } from "../services/sortVehicles";
import Cookies from "js-cookie";

export default class Deals extends React.Component {
  state = {
    vehicles: [],
  };

  /**
   * Send an API request to get the vehicles with the appropriate
   * search parameters when the search form is submitted.
   * @param {object} e - form onSubmit event
   */
  componentWillMount = () => {
    let zip = Cookies.get("autosearch_zip");
    getVehicles({ zip: zip ? zip : "90017", titleType: "Clean" }).then(
      (data) => {
        this.setState({
          vehicles: sortVehicles(data, "undervalue", true).slice(0, 8),
        });
      }
    );
  };

  render() {
    return (
      <div>
        <h2>Deals near you</h2>
        <div className="row">
          {this.state.vehicles.length > 0 ? (
            this.state.vehicles.map((item) => {
              return (
                <VehicleSmall
                  vehicle={{
                    title:
                      item[1].makeYear +
                      " " +
                      item[1].make +
                      " " +
                      item[1].model +
                      (item[1].trim ? " " + item[1].trim : ""),
                    img: item[1].img,
                    mileage: item[1].mileage,
                    price: item[1].price,
                    undervalue: item[1].undervalue,
                    link: item[1].link,
                  }}
                />
              );
            })
          ) : (
            <div style={{ width: "100%" }}>
              <h4 className="text-center">Loading...</h4>
            </div>
          )}
        </div>
      </div>
    );
  }
}
