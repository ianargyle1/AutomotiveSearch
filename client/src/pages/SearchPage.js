/**
 * @file Contains the search page
 * @author Ian Argyle
 */

import React from "react";
import { getVehicles } from "../services/getVehicles";
import VehicleSmall from "../components/VehicleSmall";
import { sortVehicles } from "../services/sortVehicles";

export default class SearchPage extends React.Component {
  state = {
    vehicles: [],
  };
  componentWillMount = () => {
    getVehicles(this.props.location.state.searchParams).then((vehicles) =>
      this.setState({ vehicles: sortVehicles(vehicles, "undervalue", true) })
    );
  };
  resort = (e) => {
    let lookup = {
      unvervalue_dec: { by: "undervalue", dec: true },
      unvervalue_asc: { by: "undervalue", dec: false },
      price_dec: { by: "price", dec: true },
      price_asc: { by: "price", dec: false },
      year_dec: { by: "makeYear", dec: true },
      year_asc: { by: "makeYear", dec: false },
      mileage_dec: { by: "mileage", dec: true },
      mileage_asc: { by: "mileage", dec: false },
    };
    if (lookup[e.target.value]) {
      this.setState({
        vehicles: sortVehicles(
          Object.fromEntries(this.state.vehicles),
          lookup[e.target.value].by,
          lookup[e.target.value].dec
        ),
      });
    }
  };
  renderVehicles = () => {
    return <p>help</p>;
  };
  render() {
    return (
      <div>
        <div className="block search-head">
          <div className="title">
            <strong className="d-block">Search</strong>
          </div>
          <div className="block-body">
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-sm-3">
                  <label className="form-control-label">Make</label>
                  <select
                    name="make"
                    className="form-control"
                    value={
                      this.props.location.state.searchParams.make
                        ? this.props.location.state.searchParams.make
                        : "Any"
                    }
                  >
                    <option>Chevrolet</option>
                    <option>dsfjjjjjgjskjdjfl</option>
                    <option>Cadillac</option>
                    <option>Ford</option>
                    <option>Dodge</option>
                  </select>
                </div>
                <div className="col-sm-3">
                  <label className="form-control-label">Model</label>
                  <select
                    name="model"
                    className="form-control"
                    value={
                      this.props.location.state.searchParams.model
                        ? this.props.location.state.searchParams.model
                        : "Any"
                    }
                  >
                    <option>Camaro</option>
                    <option>Corvette</option>
                    <option>Impala</option>
                    <option>Chevelle</option>
                  </select>
                </div>
                <div className="col-sm-3">
                  <label className="form-control-label">Location</label>
                  <div className="form-group row">
                    <div className="col-sm-6">
                      <input
                        name="zip"
                        type="zip"
                        placeholder="Zip code"
                        value={
                          this.props.location.state.searchParams.zip
                            ? this.props.location.state.searchParams.zip
                            : ""
                        }
                        className="form-control"
                      />
                    </div>
                    <div className="col-sm-6">
                      <select
                        name="miles"
                        className="form-control"
                        value={
                          this.props.location.state.searchParams.miles
                            ? this.props.location.state.searchParams.miles
                            : ""
                        }
                      >
                        <option value="50">50 Miles</option>
                        <option value="100">100 Miles</option>
                        <option value="200">200 Miles</option>
                        <option value="300">300 Miles</option>
                        <option value="400">400 Miles</option>
                        <option value="12450">500+ Miles</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <label className="form-control-label">Year</label>
                  <div className="form-group row">
                    <div className="col-sm-6">
                      <input
                        name="yearFrom"
                        type="text"
                        placeholder="From"
                        className="form-control"
                        value={
                          this.props.location.state.searchParams.yearFrom
                            ? this.props.location.state.searchParams.yearFrom
                            : ""
                        }
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        name="yearTo"
                        type="text"
                        placeholder="To"
                        className="form-control"
                        value={
                          this.props.location.state.searchParams.yearTo
                            ? this.props.location.state.searchParams.yearTo
                            : ""
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <label className="form-control-label">Mileage</label>
                  <div className="form-group row">
                    <div className="col-sm-6">
                      <input
                        name="mileageFrom"
                        type="text"
                        placeholder="From"
                        className="form-control"
                        value={
                          this.props.location.state.searchParams.mileageFrom
                            ? this.props.location.state.searchParams.mileageFrom
                            : ""
                        }
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        name="mileageTo"
                        type="text"
                        placeholder="To"
                        className="form-control"
                        value={
                          this.props.location.state.searchParams.mileageTo
                            ? this.props.location.state.searchParams.mileageTo
                            : ""
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <label className="form-control-label">Price</label>
                  <div className="form-group row">
                    <div className="col-sm-6">
                      <input
                        name="priceFrom"
                        type="text"
                        placeholder="From"
                        className="form-control"
                        value={
                          this.props.location.state.searchParams.priceFrom
                            ? this.props.location.state.searchParams.priceFrom
                            : ""
                        }
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        name="priceTo"
                        type="text"
                        placeholder="To"
                        className="form-control"
                        value={
                          this.props.location.state.searchParams.priceTo
                            ? this.props.location.state.searchParams.priceTo
                            : ""
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <label className="form-control-label">Sort</label>
                  <select
                    name="sort"
                    className="form-control"
                    onChange={this.resort}
                  >
                    <option value="unvervalue_dec">Best Deals First</option>
                    <option value="unvervalue_asc">Best Deals Last</option>
                    <option value="price_dec">Price (High to Low)</option>
                    <option value="price_asc">Price (Low to High)</option>
                    <option value="year_dec">Year (Newest First)</option>
                    <option value="year_asc">Year (Oldest First)</option>
                    <option value="mileage_dec">Mileage (High to Low)</option>
                    <option value="mileage_asc">Mileage (Low to High)</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Search"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
        </div>
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
