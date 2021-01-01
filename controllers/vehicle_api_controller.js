// Bring in the vehicle search services
const ksl = require('../services/KSL');
const craigslist = require('../services/craigslist');

function get_vehicles(req, res, next) {
  let vehicles = {};
  Promise.all([ksl.get_vehicles(req.query), craigslist.get_vehicles(req.query)]).then((data) => {
    // console.log(data);
    data.forEach((vehicles_object) => vehicles = {...vehicles, ...vehicles_object});
    res.send(JSON.stringify(vehicles));
  });
}

module.exports = {
  get_vehicles
}