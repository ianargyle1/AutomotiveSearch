// Bring in the vehicle search services
const ksl = require('../services/KSL');
const craigslist = require('../services/craigslist');
const autotrader = require('../services/autotrader');

function get_vehicles(req, res, next) {
  let vehicles = {};
  Promise.all([autotrader.get_vehicles(req.query), ksl.get_vehicles(req.query)]).then((data) => {
    data.forEach((vehicles_object) => vehicles = {...vehicles, ...vehicles_object});
    res.send(JSON.stringify(vehicles));
  });
}

module.exports = {
  get_vehicles
}