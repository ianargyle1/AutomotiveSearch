/**
 * @file Logic for getting vehicle data via services
 * @author Ian Argyle
 */

const ksl = require('../services/KSL');
const craigslist = require('../services/craigslist');
const autotrader = require('../services/autotrader');

/**
 * Responsible for handeling get request to API with search parameters.
 * @param req - Request
 * @param res - Response
 * @param next - Calls next middleware, not used
 */
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