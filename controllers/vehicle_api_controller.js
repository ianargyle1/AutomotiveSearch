// Bring in the vehicle search services
const ksl = require('../services/KSL');

function get_vehicles(req, res, next) {
  let data = {};
  ksl.get_vehicles({ make: req.params.make, model: req.params.model });

  //more service calls

  res.json(data);
}

module.exports = {
  get_vehicles
}