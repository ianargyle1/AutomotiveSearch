const https = require('https');
const { callbackify } = require('util');

const get_vehicles = search_params => {
    return new Promise((resolve, reject) => {
        // Params array for the post data, will hold make, model, ect.
        let params = ["perPage","96","page","1"];

        // Add parameters to params if they exists
        if (search_params.make) { params = params.concat(["make", search_params.make]); }
        if (search_params.model) { params = params.concat(["model", search_params.model]); }
        if (search_params.yearFrom) { params = params.concat(["yearFrom", search_params.yearFrom]); }
        if (search_params.yearTo) { params = params.concat(["yearTo", search_params.yearTo]); }
        if (search_params.mileageFrom) { params = params.concat(["mileageFrom", search_params.mileageFrom]); }
        if (search_params.mileageTo) { params = params.concat(["mileageTo", search_params.mileageTo]); }
        if (search_params.priceFrom) { params = params.concat(["priceFrom", search_params.priceFrom]); }
        if (search_params.priceTo) { params = params.concat(["mileageFrom", search_params.priceTo]); }
        if (search_params.zip) { params = params.concat(["zip", search_params.zip]); }
        if (search_params.miles) { params = params.concat(["miles", search_params.miles]); }
        if (search_params.newUsed) { params = params.concat(["newUsed", search_params.newUsed]); }

        // Build the post string from an object
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
                let vehicles = JSON.parse(data).data.items.map(function(val){
                    return {
                        city: val.city,
                        state: val.state,
                        zip: val.zip,
                        price: val.price,
                        newUsed: val.newUsed,
                        makeYear: val.makeYear,
                        make: val.make,
                        model: val.model,
                        trim: val.trim,
                        vin: val.vin,
                        transmission: val.transmission,
                        mileage: val.mileage,
                        link: 'https://cars.ksl.com/listing/' + val.id,
                        img: (val.photo) ? val.photo[0].id : '/undefined.jpg',
                        postedTime: val.displayTime
                    };
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