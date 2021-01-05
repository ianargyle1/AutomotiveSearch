/**
 * @file Contains the deals component which shows deals near the user.
 * @author Ian Argyle
 */

import React from 'react';
import VehicleSmall from './VehicleSmall';

export default class Deals extends React.Component {

    state = {
        vehicles: [],
    }

  /**
   * Send an API request to get the vehicles with the appropriate
   * search parameters when the search form is submitted.
   * @param {object} e - form onSubmit event
   */
  componentWillMount = () => {
    fetch('http://localhost:3000/api/vehicles?zip=' + navigator.geolocation.postalCode)
        .then(response => response.json())
        .then(data => this.setState({ vehicles:Object.entries(data).slice(0, 8) }));
  }

  render() {
    return (
        <div>
            <h2>Deals near you</h2>
            <div className="row">
                {this.state.vehicles.map(item => {
                    return <VehicleSmall vehicle={{
                        title:item[1].makeYear + ' ' + item[1].make + ' ' + item[1].model + ' ' + item[1].trim, 
                        img:item[1].img,
                        mileage:item[1].mileage,
                        price:item[1].price,
                        undervalue:1000,
                        link:item[1].link
                    }}/>;
                })}
            </div>
        </div>
    );
  }
}