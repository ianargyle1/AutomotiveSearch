import logo from './logo.svg';
// import './App.css';
import React from 'react';

export default class App extends React.Component {
  render() {
    return (
      <div className='block search'>
        <div className="title"><strong className="d-block">Search</strong></div>
        <div className="block-body">
          <form>
            <div className="form-group">
              <label className="form-control-label">Make</label>
              <select name="account" class="form-control mb-3 mb-3">
                <option>Chevrolet</option>
                <option>Cadillac</option>
                <option>Ford</option>
                <option>Dodge</option>
              </select>
            </div>
            <div className="form-group">       
              <label className="form-control-label">Model</label>
              <input type="model" placeholder="Model" className="form-control"/>
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
