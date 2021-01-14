/**
 * @file Logic for getting vehicle data via services
 * @author Ian Argyle
 */

const https = require("https");
const ksl = require("../services/KSL");
const craigslist = require("../services/craigslist");
const autotrader = require("../services/autotrader");

/**
 * Responsible for handling asynchronous get request to API with search parameters.
 * @param req - Request
 * @param res - Response
 * @param next - Calls next middleware, not used
 */
function get_vehicles(req, res, next) {
  let vehicles = {};
  // Send the requests
  Promise.all([
    autotrader.get_vehicles(req.query),
    ksl.get_vehicles(req.query),
  ]).then((data) => {
    // Combine the data into vehicles
    data.forEach(
      (vehicles_object) => (vehicles = { ...vehicles, ...vehicles_object })
    );
    let vins = Object.keys(vehicles);
    // Get all the trims so we can submit them with the api requests for prices
    let trim_promises = [];
    vins.forEach((vin) => trim_promises.push(get_trim(vin)));
    // Send the trim API requests, wait for response
    Promise.all(trim_promises).then((data) => {
      value_promises = [];
      // Push the data into an array so we can send requests via Promise.all
      data.forEach((trim) => {
        if (trim.trimOptions) {
          value_promises.push(
            get_price({
              vin: trim.vin,
              zip: req.query.zip
                ? req.query.zip
                : vehicles[trim.vin].zip
                ? vehicles[trim.vin].zip
                : "90017",
              condition: "GOOD",
              odometer: vehicles[trim.vin].mileage
                ? vehicles[trim.vin].mileage
                : trim.mileage,
              trimOptions: trim.trimOptions,
            })
          );
        } else {
          delete vehicles[trim.vin];
        }
      });
      // Send the requests to get the market value prices, wait for response
      Promise.all(value_promises).then((data) => {
        data.forEach((price) => {
          if (price.price) {
            vehicles[price.vin].undervalue =
              (vehicles[price.vin].sellerType === "Dealership"
                ? price.price.consumerRetailPrice
                : price.price.fsboPrice) - vehicles[price.vin].price;
          }
        });
        res.send(vehicles);
      });
    });
  });
}

/**
 * Get the trim information for a specific vehicle
 * @param {string} vin
 */
function get_trim(vin) {
  return new Promise((resolve, reject) => {
    var options = {
      method: "GET",
      hostname: "consumerapi.carfax.com",
      path: "/hbv/cow/trims/" + vin,
      headers: {
        "User-Agent": "PostmanRuntime/7.26.8",
        Accept: "application/json",
      },
    };

    let req = https
      .request(options, (resp) => {
        let data = "";

        // A chunk of data has been recieved.
        resp.on("data", (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Parse and return the result.
        resp.on("end", () => {
          // Resolve the promise with the final object of trims
          try {
            let trim = JSON.parse(data);
            resolve({
              trimOptions: {
                subtrim: trim.trimOptions[0].subtrim,
                trim: trim.trimOptions[0].trim,
                trimDisplay: trim.trimOptions[0].trimDisplay,
                trimDefault: false,
                options: trim.trimOptions[0].options.filter((option) => {
                  return option.componentDefault === true;
                }),
              },
              mileage: trim.odometer,
              vin: vin,
            });
          } catch (e) {
            resolve({
              trimOtions: false,
              vin: vin,
            });
          }
        });
      })
      .on("error", (err) => {
        reject(err.message);
      });
    req.end();
  });
}

/**
 * Get the fair market value for a specific vehicle.
 * @param {object} vehicle
 */
function get_price(vehicle) {
  return new Promise((resolve, reject) => {
    var options = {
      method: "POST",
      hostname: "consumerapi.carfax.com",
      path: "/hbv/cow/prices",
      headers: {
        "User-Agent": "PostmanRuntime/7.26.8",
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      maxRedirects: 20,
    };

    let req = https
      .request(options, (resp) => {
        let data = "";

        // A chunk of data has been recieved.
        resp.on("data", (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Parse and return the result.
        resp.on("end", () => {
          // Resolve the promise with the final retail price
          try {
            resolve({ price: JSON.parse(data).vehiclePrice, vin: vehicle.vin });
          } catch {
            resolve({ price: false, vin: vehicle.vin });
          }
        });
      })
      .on("error", (err) => {
        reject(err.message);
      });
    req.write(JSON.stringify(vehicle));
    req.end();
  });
}

module.exports = {
  get_vehicles,
};
