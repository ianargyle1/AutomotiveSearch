/**
 * @file Contains definition for get vehicles function for Autotrader.
 * @author Ian Argyle
 */

const https = require('follow-redirects').https;
const querystring = require('querystring');
const fs = require('fs');

/**
 * Returns a promise which is resolved with formatted vehicle data from Autotrader.
 * @param {object} search_params - JS object of search parameters.
 * @return {Promise} A promise which is resolved with a formatted JS object of vehicles from Autotrader
 * matching the search criteria.
 */
const get_vehicles = search_params => {
    return new Promise((resolve, reject) => {

        // Load the autotrader filters json file to lookup make and model codes in  the future
        var lookup = JSON.parse(fs.readFileSync('./services/autotrader_lookup.json', 'utf8'));

        let params = {
            'zip': search_params.zip,
            'makeCodeList': (search_params.make) ? lookup[search_params.make.toLowerCase()].value : '', // Lookup the correct format
            'modelCodeList': (search_params.make) ? lookup[search_params.make.toLowerCase()].makes[search_params.model.toLowerCase()] : '', // Lookup the correct format
            'startYear': search_params.yearFrom, // Min is 1981, max is 2021
            'endYear': search_params.yearTo, // Min is 1981, max is 2021
            'minPrice': search_params.priceFrom,
            'maxPrice': search_params.priceTo,
            'maxMileage': search_params.mileageTo, // 0 for any
            'searchRadius': search_params.miles, // 0 for any distance
            'sellerTypes': search_params.sellerTypes, // d or p for dealer or private
            'numRecords': '20000',
            'firstRecord': '0',
        }

        // Remove the undefined parameters from params
        Object.keys(params).forEach(key => params[key] === undefined ? delete params[key] : {});

        // An object of options to indicate where to send the request
        var options = {
            'method': 'GET',
            'hostname': 'www.autotrader.com',
            'path': '/rest/searchresults/base?' + querystring.stringify(params),
            'headers': {
                'User-Agent': 'PostmanRuntime/7.26.8',
                'Accept': 'application/json',
            },
            'maxRedirects': 20
        };

        let req = https.request(options, resp => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Parse and return the result.
            resp.on('end', () => {
                let vehicles = {};
                JSON.parse(data).listings.map(function(val){
                    vehicles[val.vin.replace(/\s/g,'').toUpperCase()] = {
                        zip: val.zip,
                        price: val.pricingDetail.salePrice,
                        newUsed: val.type,
                        makeYear: val.year,
                        make: val.make,
                        model: val.model,
                        trim: val.trim,
                        transmission: (val.specifications) ? val.specifications.transmission.value : 'Not listed',
                        mileage: (val.specifications) ? parseInt(val.specifications.mileage.value.replace(',', '')) : 'Not listed',
                        link: 'https://www.autotrader.com/cars-for-sale/vehicledetails.xhtml?listingId=' + val.id,
                        img: (val.images) ? val.images.sources[val.images.primary].src : '/undefined.jpg',
                        postedTime: 'val.displayTime'
                    }
                });

                // Resolve the promise with the final object of vehicles
                resolve(vehicles);
            });

        }).on("error", (err) => {
            reject(err.message);
        });
        req.end();
    });
}

module.exports = {
    get_vehicles
}