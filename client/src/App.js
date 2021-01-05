import logo from './logo.svg';
// import './App.css';
import React from 'react';

export default class App extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const params = [...data.entries()]
      .map(param => {
        return (param[1] != '') ? param[0] + '=' + param[1] : '';
      }).filter(Boolean).join('&');
    console.log(params);
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(data => console.log(data));
  }
  render() {
    return (
      <div className='block search'>
        <div className="title"><strong className="d-block">Search</strong></div>
        <div className="block-body">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-sm-6">
                <label className="form-control-label">Make</label>
                <select name="make" className="form-control mb-3">
                  <option>Chevrolet</option>
                  <option>dsfjjjjjgjskjdjfl</option>
                  <option>Cadillac</option>
                  <option>Ford</option>
                  <option>Dodge</option>
                </select>
                <label className="form-control-label">Model</label>
                <select name="model" className="form-control mb-3">
                  <option>Camaro</option>
                  <option>Corvette</option>
                  <option>Impala</option>
                  <option>Chevelle</option>
                </select>
                <label className="form-control-label">Location</label>
                <div className="form-group row">
                  <div className="col-sm-6">
                    <input name="zip" type="zip" placeholder="Zip code" className="form-control"/>
                  </div>
                  <div className="col-sm-6">
                    <select name="miles" className="form-control mb-3">
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
              <div className="col-sm-6">
              <label className="form-control-label">Year</label>
                <div className="form-group row">
                  <div className="col-sm-6">
                    <input name="yearFrom" type="text" placeholder="From" className="form-control"/>
                  </div>
                  <div className="col-sm-6">
                    <input name="yearTo" type="text" placeholder="To" className="form-control"/>
                  </div>
                </div>
                <label className="form-control-label">Mileage</label>
                <div className="form-group row">
                  <div className="col-sm-6">
                    <input name="mileageFrom" type="text" placeholder="From" className="form-control"/>
                  </div>
                  <div className="col-sm-6">
                    <input name="mileageTo" type="text" placeholder="To" className="form-control"/>
                  </div>
                </div>
                <label className="form-control-label">Price</label>
                <div className="form-group row">
                  <div className="col-sm-6">
                    <input name="priceFrom" type="text" placeholder="From" className="form-control"/>
                  </div>
                  <div className="col-sm-6">
                    <input name="priceTo" type="text" placeholder="To" className="form-control"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">       
              <input type="submit" value="Search" className="btn btn-primary"/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
