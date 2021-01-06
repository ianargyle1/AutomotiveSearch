/**
 * @file Contains definition for get vehicles function for KSL Cars.
 * @author Ian Argyle
 */

const https = require('https');

/**
 * Returns a promise which is resolved with formatted vehicle data from KSL Cars.
 * @param {object} search_params - JS object of search parameters.
 * @return {Promise} A promise which is resolved with a formatted JS object of vehicles from KSL
 * matching the search criteria.
 */
const get_vehicles = search_params => {
    return new Promise((resolve, reject) => {
        // Params array for the post data, will hold make, model, ect.
        let params = {
            perPage: "96",
            page: "1",
            make: search_params.make,
            model: search_params.model,
            yearFrom: search_params.yearFrom,
            yearTo: search_params.yearTo,
            mileageFrom: search_params.mileageFrom,
            mileageTo: search_params.mileageTo,
            priceFrom: search_params.priceFrom,
            priceTo: search_params.priceTo,
            zip: search_params.zip,
            miles: search_params.miles,
            newUsed: search_params.newUsed,
            body: search_params.body
        }

        // Remove the undefined parameters from params
        Object.keys(params).forEach(key => params[key] === undefined ? delete params[key] : {});

        // Build the post string from an object, KSL API needs the body to be in exactly this format to function
        var post_data = JSON.stringify({
            "endpoint":"/classifieds/cars/search/searchByUrlParams",
            "options": {
                "method":"POST",
                "headers":{
                    "Content-Type":"application/json",
                    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"
                },
                "body":params
            }
        });

        // An object of options to indicate where to post to
        var post_options = {
            host: 'cars.ksl.com',
            path: '/nextjs-api/proxy?',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        let req = https.request(post_options, resp => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Parse and return the result.
            resp.on('end', () => {
                let vehicles = {};
                JSON.parse(data).data.items.map(function(val){
                    vehicles[val.vin.replace(/\s/g,'').toUpperCase()] = {
                        city: val.city,
                        state: val.state,
                        zip: val.zip,
                        price: val.price,
                        newUsed: val.newUsed,
                        makeYear: val.makeYear,
                        make: val.make,
                        model: val.model,
                        trim: val.trim,
                        transmission: val.transmission,
                        mileage: parseInt(val.mileage),
                        link: 'https://cars.ksl.com/listing/' + val.id,
                        img: (val.photo) ? JSON.parse(val.photo[0]).id : '/undefined.jpg',
                        postedTime: val.displayTime,
                        sellerType: val.sellerType
                    }
                });

                // Resolve the promise with the final object of vehicles
                resolve(vehicles);
                // resolve(JSON.parse(data));
            });

        }).on("error", (err) => {
            reject(err.message);
        });
        req.write(post_data);
        req.end();      
    });
}

module.exports = {
    get_vehicles
}