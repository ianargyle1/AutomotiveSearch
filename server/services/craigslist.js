/**
 * @file Contains definition for get vehicles function for Craigslist.
 * @author Ian Argyle
 */

const https = require('follow-redirects').https;
const querystring = require('querystring');
fs = require('fs');

/**
 * Returns a promise which is resolved with formatted vehicle data from Craigslist.
 * @param {object} search_params - JS object of search parameters.
 * @return {Promise} A promise which is resolved with a formatted JS object of vehicles from Craigslist
 * matching the search criteria.
 */
const get_vehicles = search_params => {
    return new Promise((resolve, reject) => {
        // Params string for the post data, will hold make, model, ect.
        let params = ((search_params.miles) ? 'search_distance=' + search_params.miles : '')
        + ((search_params.zip) ? '&postal=' + search_params.zip : '')
        + ((search_params.priceFrom) ? '&min_price=' + search_params.priceFrom : '')
        + ((search_params.priceTo) ? '&max_price=' + search_params.priceTo : '')
        + ((search_params.make) ? '&auto_make_model=' + search_params.make + ((search_params.model) ? '+' + search_params.model : '') : '')
        + ((search_params.yearFrom) ? '&min_auto_year=' + search_params.yearFrom : '')
        + ((search_params.yearTo) ? '&max_auto_year=' + search_params.yearTo : '')
        + ((search_params.mileageFrom) ? '&min_auto_miles=' + search_params.mileageFrom : '')
        + ((search_params.mileageTo) ? '&max_auto_miles=' + search_params.mileageTo : '');

        // This data will be sent in the request
        // var post_data = params;
        var post_data = querystring.stringify({
            'max_price' : search_params.priceTo,
            'min_price': search_params.priceFrom
        });

        var options = {
            'method': 'GET',
            'hostname': 'saltlakecity.craigslist.org',
            'path': '/search/cta?search_distance=100&postal=84040&min_price=100&max_price=100000&auto_make_model=chevrolet+camaro&min_auto_year=2010&max_auto_year=2022&min_auto_miles=1000&max_auto_miles=180000',
            'headers': {
                'User-Agent': 'PostmanRuntime/7.26.8'
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
                console.log(data);
                // let vehicles = JSON.parse(data).data.items.map(function(val){
                //     return {
                //         city: val.city,
                //         state: val.state,
                //         zip: val.zip,
                //         price: val.price,
                //         newUsed: val.newUsed,
                //         makeYear: val.makeYear,
                //         make: val.make,
                //         model: val.model,
                //         trim: val.trim,
                //         vin: val.vin,
                //         transmission: val.transmission,
                //         mileage: val.mileage,
                //         link: 'https://cars.ksl.com/listing/' + val.id,
                //         img: (val.photo) ? val.photo[0].id : '/undefined.jpg',
                //         postedTime: val.displayTime
                //     };
                // });

                // Resolve the promise with the final object of vehicles
                // resolve(vehicles);
                // resolve(JSON.parse(data));
                resolve(data);
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